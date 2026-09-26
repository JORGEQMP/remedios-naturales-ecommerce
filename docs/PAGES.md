# Listado de Paginas - BasicTechShop

## Paginas Publicas (Shop)

| Ruta | Descripcion | Autenticacion |
|------|-------------|---------------|
| `/` | Homepage - Hero, categorias, productos destacados | No |
| `/products` | Catalogo de productos con filtros | No |
| `/products/[id]` | Detalle de producto | No |
| `/cart` | Carrito de compras | No |
| `/login` | Inicio de sesion | Solo invitados |
| `/register` | Registro de usuario | Solo invitados |

## Paginas de Checkout

| Ruta | Descripcion | Autenticacion |
|------|-------------|---------------|
| `/checkout` | Proceso de checkout | Si |
| `/checkout/success` | Confirmacion de pago exitoso | Si |
| `/checkout/cancel` | Pago cancelado | Si |

## Paginas de Perfil de Usuario

| Ruta | Descripcion | Autenticacion |
|------|-------------|---------------|
| `/profile` | Informacion del perfil y estadisticas | Si |
| `/profile/orders` | Historial de pedidos | Si |
| `/profile/addresses` | Lista de direcciones | Si |
| `/profile/addresses/new` | Agregar nueva direccion | Si |
| `/profile/addresses/[id]/edit` | Editar direccion | Si |
| `/profile/favorites` | Productos favoritos | Si |
| `/profile/settings` | Configuracion de cuenta | Si |

## Paginas de Administracion

| Ruta | Descripcion | Autenticacion |
|------|-------------|---------------|
| `/admin` | Dashboard con estadisticas | Admin |
| `/admin/products` | Gestion de productos | Admin |
| `/admin/products/new` | Crear nuevo producto | Admin |
| `/admin/users` | Gestion de usuarios | Admin |
| `/admin/users/new` | Crear nuevo usuario | Admin |
| `/admin/payments` | Historial de pagos/ordenes | Admin |
| `/admin/settings` | Configuracion del sistema | Admin |

---

## API Routes

### Autenticacion

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth.js handlers |
| POST | `/api/auth/register` | Registro de usuario |

### Productos

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/products` | Listar productos (con filtros) |
| POST | `/api/products` | Crear producto |
| GET | `/api/products/[id]` | Obtener producto |
| PUT | `/api/products/[id]` | Actualizar producto |
| DELETE | `/api/products/[id]` | Eliminar producto |

### Categorias y Marcas

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/categories` | Listar categorias |
| GET | `/api/brands` | Listar marcas |

### Ordenes

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/orders` | Listar ordenes del usuario |
| POST | `/api/orders` | Crear orden |
| GET | `/api/orders/[id]` | Obtener orden |

### Direcciones

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/addresses` | Listar direcciones del usuario |
| POST | `/api/addresses` | Crear direccion |
| GET | `/api/addresses/[id]` | Obtener direccion |
| PUT | `/api/addresses/[id]` | Actualizar direccion |
| DELETE | `/api/addresses/[id]` | Eliminar direccion |

### Usuarios

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/users` | Listar usuarios (admin) |
| POST | `/api/users` | Crear usuario (admin) |

### Admin

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/admin/dashboard` | Estadisticas del dashboard |
| GET | `/api/admin/orders` | Listar todas las ordenes |

### Pagos (Stripe)

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | `/api/checkout` | Crear sesion de Stripe Checkout |
| POST | `/api/webhook/stripe` | Webhook de Stripe |

---

## Estructura de Layouts

```
src/app/
├── layout.tsx                    # Root layout (ThemeProvider, SessionProvider)
├── (shop)/                       # Grupo de rutas publicas
│   ├── layout.tsx               # Layout con TopBar, Header, Footer
│   ├── page.tsx                 # Homepage
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── profile/
│   │   └── layout.tsx           # Layout con sidebar de perfil
│   ├── login/
│   └── register/
└── (admin-panel)/               # Grupo de rutas admin
    └── admin/
        ├── layout.tsx           # Layout con AdminSidebar
        ├── page.tsx             # Dashboard
        ├── products/
        ├── users/
        ├── payments/
        └── settings/
```

## Proteccion de Rutas (Middleware)

- **Rutas protegidas** (`/profile/*`, `/checkout`): Requieren autenticacion
- **Rutas admin** (`/admin/*`): Requieren rol ADMIN
- **Rutas de invitados** (`/login`, `/register`): Solo accesibles sin autenticacion

---

## Resumen

| Categoria | Cantidad |
|-----------|----------|
| Paginas Publicas | 6 |
| Paginas Checkout | 3 |
| Paginas Perfil | 7 |
| Paginas Admin | 7 |
| **Total Paginas** | **23** |
| API Routes | 15 |
