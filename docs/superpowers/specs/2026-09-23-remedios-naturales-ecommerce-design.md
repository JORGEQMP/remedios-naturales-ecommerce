# Remedios Naturales — E-commerce: Pagos, Admin/Carga Masiva, SEO, Tracking, Despliegue

## Contexto

Partimos del repo clonado `fazt/ecommerce-basictech` (Next.js 16 App Router,
TypeScript, Prisma/PostgreSQL, NextAuth v5, Zustand, Tailwind/shadcn), hoy en
`docs/PRD.md` / `docs/PLAN.md` documentado como tienda de tecnología, que
reorientamos a una tienda de remedios naturales. El repo ya trae:

- Stripe funcionando (checkout + webhook con verificación de firma).
- Panel admin protegido por rol `ADMIN` vía `middleware.ts`, con CRUD de
  productos uno por uno.
- Metadata estática global, sin JSON-LD, sin sitemap, sin tracking.

Regla fija del proyecto (`CLAUDE.md`): sin Server Actions, todo vía Route
Handlers; Zustand para estado global; react-hook-form + zod para formularios;
sin modales para creación de datos, páginas dedicadas.

Este spec cubre 5 áreas nuevas/reemplazadas, decididas con el usuario:

1. Pasarela de pago: **Mercado Pago Checkout Pro** (reemplaza Stripe).
2. Panel admin: carga masiva de productos por Excel/CSV.
3. SEO técnico: metadata dinámica, JSON-LD, sitemap/robots, URLs por slug.
4. Tracking: GTM + dataLayer + eventos GA4/Pixel (view_item, add_to_cart,
   begin_checkout, purchase).
5. Despliegue: **Vercel + Neon** (en vez de Firebase).

## Decisiones ya tomadas con el usuario

- Mercado Pago sobre Stripe (mejor conversión en Perú: Yape, PagoEfectivo,
  cuotas sin tarjeta). Se elimina el código Stripe.
- Migrar `/products/[id]` → `/products/[slug]` para SEO.
- Tracking con placeholders (`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`,
  `NEXT_PUBLIC_META_PIXEL_ID`) — el usuario no tiene aún las cuentas/IDs
  reales (mismo caso que otros proyectos suyos en curso).
- Despliegue en Vercel + Neon en vez de Firebase: Firebase App Hosting
  exige plan Blaze (tarjeta registrada) y no ofrece Postgres administrado
  (solo Firestore, NoSQL, no sirve para este schema relacional). Vercel es
  el creador de Next.js, tiene capa gratuita sin tarjeta para este tamaño
  de proyecto, y Neon ofrece Postgres gratis sin tarjeta — cero fricción
  con el Prisma ya existente.
- El código vive en GitHub (`remedios-naturales-ecommerce`, cuenta del
  usuario) en vez de solo en disco local: el entorno de trabajo actual
  reinicia su disco entre sesiones, así que el repo remoto es la única
  copia persistente y además es requisito de Vercel para desplegar.

## 1. Pasarela de pago — Mercado Pago Checkout Pro

**Se elimina:** `src/lib/stripe.ts`, dependencias `stripe` y
`@stripe/stripe-js`, `src/app/api/webhook/stripe/route.ts`.

**Se crea/modifica:**

- `src/lib/mercadopago.ts`: cliente del SDK oficial `mercadopago` (v2),
  inicializado con `MP_ACCESS_TOKEN`.
- `src/app/api/checkout/route.ts`: en vez de crear una Stripe Session, crea
  la `Order` en estado `PENDING` en la BD **primero** (con un `orderNumber`
  generado ahí mismo), luego crea una `Preference` de Mercado Pago con
  `external_reference = orderNumber`, `items`, `back_urls` (success /
  failure / pending apuntando a `/checkout/success`, `/checkout/cancel`,
  `/checkout/pending`) y `auto_return: "approved"`. Devuelve la
  `init_point` para redirigir al comprador.
  - Motivo de crear la Order antes del pago (no en el webhook): la IPN de
    Mercado Pago puede demorar; el comprador puede llegar a `/checkout/success`
    antes de que el webhook procese. Con la Order ya creada en `PENDING`,
    la página de éxito puede mostrar el pedido de inmediato y el webhook solo
    actualiza su estado.
- `src/app/api/webhook/mercadopago/route.ts` (Route Handler, nuevo): recibe
  la notificación IPN/webhook de MP. Nunca confía en el payload crudo: usa
  el `data.id` recibido para volver a consultar el pago vía la API de MP
  (`payment.get`) y confirma el estado real. Cuando el header `x-signature`
  está presente, valida también el HMAC contra `MP_WEBHOOK_SECRET`.
  Actualiza `Order.status`:
  - `approved` → `PROCESSING`, descuenta stock (solo si la orden seguía en
    `PENDING`, chequeo de idempotencia para no descontar dos veces si MP
    reenvía la notificación).
  - `rejected` → `CANCELLED`.
  - `pending` / `in_process` → sin cambios (se queda `PENDING`).
- Prisma: migración que renombra `stripeSessionId` → `externalPaymentId`
  (String?) en `Order`, y agrega `mpPreferenceId` (String?) para poder
  reconciliar antes de tener el pago confirmado.
- `src/app/(shop)/checkout/success/page.tsx`, `cancel/page.tsx`: se agrega
  `pending/page.tsx`. Todas pasan a leer la Order por `external_reference`
  (query param) en vez de `session_id` de Stripe.

**Variables de entorno nuevas:** `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`,
`NEXT_PUBLIC_MP_PUBLIC_KEY` (no se usa Payment Brick en esta fase, pero se
deja preparado por si luego se quiere checkout embebido en vez de redirect).

## 2. Panel admin — carga masiva de productos (Excel/CSV)

**Se agrega al schema:** campo `sku` (String, `@unique`) en `Product` —
hoy no existe y es necesario para identificar filas en la carga masiva
(también sirve para catálogo en general).

**Se crea:**

- `src/app/(admin-panel)/admin/products/import/page.tsx`: página dedicada
  (no modal, regla del proyecto), protegida por el middleware existente
  (ya cubre todo `/admin/*`). Input de archivo `.xlsx`/`.csv`, botón
  "Procesar archivo", tabla de preview con estado por fila (válida / error)
  antes de confirmar el envío, y botón "Confirmar importación".
- `src/lib/bulk-import.ts`: parseo con la librería `xlsx` (SheetJS) —
  cubre `.xlsx` y `.csv` con la misma API (`XLSX.read` + `sheet_to_json`),
  evitando sumar `papaparse` como dependencia redundante. Corre en el
  cliente para dar preview inmediato sin round-trip al servidor solo para
  validar formato.
- Esquema Zod `bulkProductRowSchema` con columnas esperadas:
  `sku, nombre, precio, stock, categoria, marca, descripcion` (español,
  coincide con lo que un usuario de negocio llenaría en Excel). Cada fila
  se valida independientemente; errores de tipo/formato se listan por fila
  sin bloquear el resto.
- `POST /api/admin/products/bulk-import` (Route Handler nuevo, protegido —
  reutiliza `auth()` + chequeo de rol `ADMIN`, igual patrón que el resto de
  endpoints admin). Recibe el array ya validado en el cliente. Resuelve
  `categoria`/`marca` por slug o nombre exacto contra las tablas existentes;
  si no existe, la fila falla con mensaje explícito (no se crean categorías/
  marcas nuevas automáticamente, para evitar duplicados por typos).
  Inserta con `Promise.allSettled` sobre `prisma.product.create` fila por
  fila dentro de un bloque que seguimos aunque alguna falle (no
  `createMany`, porque no permite reportar qué fila específica fue la que
  falló y por qué). Devuelve
  `{ creados: number, fallidos: [{ fila, sku, error }] }`.

## 3. SEO técnico

- **Migración de rutas:** `src/app/(shop)/products/[id]/` →
  `src/app/(shop)/products/[slug]/`. La página pasa de `"use client"` con
  fetch en `useEffect` a **Server Component** con `generateMetadata()`
  (esto además corrige que hoy Google nunca ve el contenido renderizado en
  servidor). Todos los enlaces internos que arman `/products/${id}` pasan a
  usar `slug` (`ProductCard`, admin, related products, etc.).
- `generateMetadata()` dinámico: `title`, `description` (recortada de
  `product.description`), Open Graph (`og:title`, `og:description`,
  `og:image` con la primera imagen del producto, `og:type: "product"`).
- Mismo patrón de metadata dinámica en `/products` filtrado por categoría.
- `src/components/products/ProductJsonLd.tsx`: inyecta
  `<script type="application/ld+json">` con schema.org `Product` (`name`,
  `image`, `description`, `sku`, `offers` con `price`, `priceCurrency: "PEN"`,
  `availability` derivado de `stock > 0`).
- `src/app/sitemap.ts` (convención nativa de Next.js — no XML manual):
  genera entradas para productos activos, categorías y páginas estáticas
  clave, leyendo de Prisma en build/request time.
- `src/app/robots.ts`: permite todo excepto `/admin`, `/profile`,
  `/checkout`, `/api`.

## 4. Tracking (GTM, GA4, Meta Pixel)

- `src/app/layout.tsx`: script de GTM en `<head>` + `<noscript>` de GTM al
  inicio de `<body>`, condicionado a que `NEXT_PUBLIC_GTM_ID` esté seteado
  (si está vacío/placeholder, no inyecta nada, para no romper en local sin
  cuenta configurada).
- `src/lib/gtm.ts`: helper `pushToDataLayer(event: string, payload: object)`
  que hace `window.dataLayer.push(...)` con guard de `typeof window`.
- Eventos y dónde se disparan:
  - `view_item`: `src/components/products/ProductViewTracker.tsx` (client
    component pequeño, se monta dentro del Server Component de producto),
    dispara una vez en `useEffect` con `item_id`, `item_name`, `price`,
    `item_category`.
  - `add_to_cart`: dentro de la acción `addItem` de
    `src/stores/cart-store.ts` (Zustand) — se dispara ahí y no en cada
    botón individual, para cubrir todos los puntos de entrada al carrito
    sin duplicar lógica.
  - `begin_checkout`: en `src/app/(shop)/checkout/page.tsx`, justo antes del
    `fetch` a `/api/checkout` (no al montar la página, para que solo se
    dispare si el usuario efectivamente confirma la compra).
  - `purchase`: en `/checkout/success/page.tsx` (ahora Server Component que
    ya lee la Order por `external_reference`, ver sección 1) — arma
    `transaction_id` (orderNumber), `value` (total), `currency: "PEN"`,
    `items` (array desde `OrderItem`). Guard con `sessionStorage` para no
    re-disparar `purchase` si el usuario refresca la página de éxito.

**Variables de entorno nuevas:** `NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_GA4_ID` (si se decide cargar GA4 vía gtag.js en paralelo a
GTM), `NEXT_PUBLIC_META_PIXEL_ID` — todas opcionales/placeholder por ahora.

## 5. Despliegue — Vercel + Neon

- **Repositorio:** GitHub `remedios-naturales-ecommerce` en la cuenta del
  usuario. Es la copia persistente de referencia; el entorno de trabajo
  local de esta sesión no conserva archivos entre sesiones, así que todo
  avance se empuja ahí antes de darlo por hecho.
- **Base de datos:** Neon (Postgres serverless, capa gratuita sin tarjeta).
  Se crea un proyecto Neon, se toma su `DATABASE_URL` (con `?sslmode=require`)
  y se usa tal cual en `DATABASE_URL` — Prisma con `@prisma/adapter-pg` ya
  soporta Postgres estándar sin cambios de código.
- **Hosting:** Vercel, importando el repo de GitHub directamente (build
  command y output ya son los defaults de Next.js, sin configuración
  adicional). Variables de entorno a configurar en Vercel (Production +
  Preview):
  `DATABASE_URL`, `AUTH_SECRET`, `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`,
  `NEXT_PUBLIC_MP_PUBLIC_KEY`, `CLOUDINARY_*` (ya existentes en el repo),
  `NEXT_PUBLIC_APP_URL` (URL de producción de Vercel), y los placeholders
  de tracking de la sección 4.
- **Migraciones:** `npx prisma migrate deploy` corre como parte del build
  en Vercel (se agrega al `build` script de `package.json`:
  `prisma migrate deploy && next build`), apuntando a la misma
  `DATABASE_URL` de Neon.
- **Webhook de Mercado Pago:** una vez desplegado, se configura la URL del
  webhook en el panel de Mercado Pago apuntando a
  `https://<dominio-vercel>/api/webhook/mercadopago` (no se puede probar
  end-to-end en local sin exponer el puerto, ej. con `ngrok`, si se quiere
  probar antes de desplegar).

## Dependencias

**Se agregan:**
- `mercadopago` (^2.x) — SDK oficial de Mercado Pago, uso en servidor.
- `xlsx` (^0.18) — parseo de `.xlsx`/`.csv` en el cliente.

**Se eliminan:**
- `stripe`
- `@stripe/stripe-js`

## Fuera de alcance de este spec

- Rebranding de copy/contenido (nombres de categorías, textos de marca,
  imágenes) de "BasicTechShop" a la marca real de remedios naturales — es
  un cambio de contenido, no de arquitectura; se hace aparte una vez el
  usuario confirme nombre de marca, categorías y catálogo real.
- Checkout embebido (Payment Brick) — se deja la clave pública preparada
  pero se implementa redirect a `init_point` por ser la integración más
  simple y confiable para la primera versión.
- Conciliación contable / notas de crédito / reembolsos vía Mercado Pago.
- Dominio propio / DNS — se despliega primero sobre el dominio `*.vercel.app`
  gratuito; conectar un dominio propio es un paso aparte, posterior.
