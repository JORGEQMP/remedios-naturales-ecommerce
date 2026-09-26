# PRD: BasicTechShop

## 1. Resumen Ejecutivo

**BasicTechShop** es una plataforma e-commerce especializada en productos de computación (hardware, periféricos y componentes). El sistema permite a los usuarios navegar, filtrar y comprar productos, mientras que los administradores gestionan el inventario, usuarios y pedidos.

| Aspecto | Detalle |
|---------|---------|
| **Tipo** | E-commerce B2C |
| **Mercado** | Productos de computación |
| **Plataforma** | Web (responsive) |
| **Estado actual** | UI implementada con datos mock |

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL (planificado) |
| ORM | Prisma |
| UI Components | shadcn/ui (estilo "new-york") |
| Styling | Tailwind CSS v4 (OKLCH) |
| Iconos | Lucide React |
| Tema | next-themes (dark/light) |
| Estado global | Zustand |
| Formularios | react-hook-form + Zod |
| Auth | NextAuth.js |

---

## 3. Usuarios y Roles

| Rol | Descripción | Permisos clave |
|-----|-------------|----------------|
| **CUSTOMER** | Cliente final | Navegar, comprar, gestionar su perfil y direcciones |
| **MODERATOR** | Vendedor/Staff | Todo lo anterior + gestionar productos, categorías, marcas y ver todos los pedidos |
| **ADMIN** | Administrador | Todo lo anterior + gestionar usuarios y configuración del sistema |

---

## 4. Funcionalidades Principales

### 4.1 Tienda Pública
- **Homepage**: Hero banner, categorías destacadas, productos destacados, sección de marcas
- **Catálogo** (`/products`): Grid de productos con filtros (marca, precio, categoría), ordenamiento y vista grid/lista
- **Detalle de producto** (`/products/[id]`): Galería de imágenes, especificaciones, selector de cantidad, productos relacionados
- **Carrito** (`/cart`): Lista de items, cantidades editables, resumen con subtotal/envío/total
- **Checkout** (`/checkout`): Proceso en pasos (Datos → Envío → Pago → Confirmación)

### 4.2 Autenticación
- Registro de usuarios (email/password)
- Login con credenciales
- Protección de rutas por rol

### 4.3 Perfil de Usuario
- Información personal y estadísticas
- Historial de pedidos
- Gestión de direcciones (CRUD)
- Productos favoritos
- Configuración de cuenta

### 4.4 Panel de Administración
- **Dashboard**: Estadísticas de ventas, pedidos, usuarios
- **Productos**: CRUD completo con imágenes y especificaciones
- **Usuarios**: Gestión y asignación de roles
- **Pagos/Órdenes**: Historial y cambio de estados
- **Configuración**: Ajustes del sistema

---

## 5. Modelo de Datos

### Entidades Principales

```
User ──┬── Address (1:N)
       └── Order (1:N) ──── OrderItem (1:N) ──── Product
                                                    │
Category (1:N) ─────────────────────────────────────┤
Brand (1:N) ────────────────────────────────────────┘
```

### Estados de Pedido
```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
    └──────────────────────────────────────→ CANCELLED
```

### Métodos de Pago
- Tarjeta (CARD)
- Transferencia (TRANSFER)
- Billetera digital (WALLET)
- Contra entrega (CASH_ON_DELIVERY)

---

## 6. Estructura de Páginas

| Sección | Cantidad | Rutas ejemplo |
|---------|----------|---------------|
| Públicas | 6 | `/`, `/products`, `/products/[id]`, `/cart`, `/login`, `/register` |
| Checkout | 3 | `/checkout`, `/checkout/success`, `/checkout/cancel` |
| Perfil | 7 | `/profile`, `/profile/orders`, `/profile/addresses/*` |
| Admin | 7 | `/admin`, `/admin/products/*`, `/admin/users/*`, `/admin/payments` |
| **Total** | **23** | |

---

## 7. API Endpoints

| Recurso | Endpoints |
|---------|-----------|
| Auth | `POST /api/auth/register`, `GET/POST /api/auth/[...nextauth]` |
| Products | `GET/POST /api/products`, `GET/PUT/DELETE /api/products/[id]` |
| Categories | `GET /api/categories` |
| Brands | `GET /api/brands` |
| Orders | `GET/POST /api/orders`, `GET /api/orders/[id]` |
| Addresses | CRUD en `/api/addresses` |
| Users | `GET/POST /api/users` (admin) |
| Admin | `GET /api/admin/dashboard`, `GET /api/admin/orders` |
| Payments | `POST /api/checkout`, `POST /api/webhook/stripe` |

---

## 8. Categorías de Productos

- Computadoras/PCs
- Monitores
- Teclados
- Mouse
- Audífonos
- Almacenamiento
- Componentes (GPU, RAM, etc.)

### Marcas Soportadas
ASUS, MSI, Corsair, Logitech, Razer, HyperX, Kingston, Samsung, LG, Dell, NVIDIA, AMD

---

## 9. Requisitos No Funcionales

| Aspecto | Requisito |
|---------|-----------|
| **Responsive** | Mobile-first, soporte completo desktop/tablet/mobile |
| **Tema** | Soporte dark/light mode |
| **Accesibilidad** | Nivel básico (WCAG) |
| **SEO** | Server-side rendering con Next.js |
| **Performance** | Skeletons para loading states |

---

## 10. Exclusiones (No incluido)

- Sistema de cupones/descuentos
- Reseñas de productos
- Wishlist avanzada
- Multi-idioma
- Multi-moneda
- Integración con marketplaces externos

---

## 11. Fases de Implementación

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1. UI con datos mock | ✅ Completada | Layout, componentes, páginas con datos estáticos |
| 2. Backend (Prisma/PostgreSQL) | 🔄 En progreso | Modelo de datos, API routes |
| 3. Autenticación | Pendiente | NextAuth.js con credenciales |
| 4. Integración de pagos | Pendiente | Stripe Checkout |
| 5. Deploy y optimización | Pendiente | Vercel + PostgreSQL |
