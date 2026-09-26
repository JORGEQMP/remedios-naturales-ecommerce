# Modelo de Datos - BasicTechShop

## Resumen de Requisitos

- **Registro**: Auto-registro + Admin puede crear cuentas
- **Auth**: Email/Password
- **Inventario**: Simple (solo cantidad en stock por producto)
- **Pedidos**: Basico (crear, historial, estados simples)
- **Cupones**: No
- **Resenas**: No
- **Wishlist**: No
- **Roles**: Admin, Moderador/Vendedor, Cliente

---

## Diagrama de Relaciones

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │   Product   │       │  Category   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ email       │       │ name        │◄──────│ name        │
│ password    │       │ slug        │       │ slug        │
│ name        │       │ description │       │ icon        │
│ phone       │       │ price       │       │ createdAt   │
│ role        │       │ comparePrice│       └─────────────┘
│ status      │       │ stock       │
│ createdAt   │       │ images[]    │       ┌─────────────┐
└──────┬──────┘       │ specs       │       │   Brand     │
       │              │ isNew       │       ├─────────────┤
       │              │ isFeatured  │       │ id          │
       │              │ isActive    │◄──────│ name        │
       │              │ categoryId  │       │ slug        │
       │              │ brandId     │       │ logo        │
       │              │ createdAt   │       │ createdAt   │
       │              └─────────────┘       └─────────────┘
       │
       │
       ▼
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Address   │       │    Order    │       │ OrderItem   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ userId      │◄──────│ orderNumber │       │ orderId     │
│ label       │       │ userId      │───────│ productId   │
│ name        │       │ addressId   │       │ name        │
│ phone       │       │ status      │       │ price       │
│ address     │       │ subtotal    │       │ quantity    │
│ city        │       │ shipping    │       │ total       │
│ state       │       │ total       │       └─────────────┘
│ zipCode     │       │ paymentMethod│
│ isDefault   │       │ notes       │
│ createdAt   │       │ createdAt   │
└─────────────┘       └─────────────┘
```

## Descripcion de Modelos

### User (Usuarios)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| email | String | Email unico para login |
| password | String | Hash de contrasena (bcrypt) |
| name | String | Nombre completo |
| phone | String? | Telefono (opcional) |
| avatar | String? | URL de imagen de perfil |
| role | Enum | ADMIN, MODERATOR, CUSTOMER |
| status | Enum | ACTIVE, INACTIVE, SUSPENDED |

### Category (Categorias)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| name | String | Nombre (ej: "Monitores") |
| slug | String | URL-friendly (ej: "monitores") |
| icon | String? | Nombre del icono lucide |

### Brand (Marcas)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| name | String | Nombre (ej: "ASUS") |
| slug | String | URL-friendly (ej: "asus") |
| logo | String? | URL del logo |

### Product (Productos)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| name | String | Nombre del producto |
| slug | String | URL-friendly unico |
| description | String? | Descripcion detallada |
| price | Decimal | Precio actual |
| comparePrice | Decimal? | Precio anterior (para mostrar descuento) |
| stock | Int | Cantidad en inventario |
| images | String[] | Array de URLs de imagenes |
| specs | Json? | Especificaciones tecnicas (key-value) |
| isNew | Boolean | Marcar como nuevo |
| isFeatured | Boolean | Producto destacado |
| isActive | Boolean | Visible en tienda |

### Address (Direcciones)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| label | String | Etiqueta (Casa, Oficina) |
| name | String | Nombre del destinatario |
| phone | String | Telefono de contacto |
| address | String | Direccion completa |
| city | String | Ciudad |
| state | String | Departamento/Estado |
| zipCode | String | Codigo postal |
| isDefault | Boolean | Direccion predeterminada |

### Order (Pedidos)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| orderNumber | String | Numero visible (ORD-2024-001) |
| status | Enum | Estado del pedido |
| subtotal | Decimal | Suma de items |
| shipping | Decimal | Costo de envio |
| total | Decimal | Total final |
| paymentMethod | Enum | Metodo de pago usado |
| notes | String? | Notas adicionales |

### OrderItem (Items del Pedido)
| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | cuid | Identificador unico |
| name | String | Nombre del producto (snapshot) |
| price | Decimal | Precio al momento de compra |
| quantity | Int | Cantidad |
| total | Decimal | price x quantity |

---

## Roles y Permisos

| Accion | CUSTOMER | MODERATOR | ADMIN |
|--------|----------|-----------|-------|
| Ver productos | ✅ | ✅ | ✅ |
| Crear pedidos | ✅ | ✅ | ✅ |
| Ver sus pedidos | ✅ | ✅ | ✅ |
| Gestionar direcciones propias | ✅ | ✅ | ✅ |
| Ver todos los pedidos | ❌ | ✅ | ✅ |
| Crear/editar productos | ❌ | ✅ | ✅ |
| Crear/editar categorias | ❌ | ✅ | ✅ |
| Crear/editar marcas | ❌ | ✅ | ✅ |
| Cambiar estado de pedidos | ❌ | ✅ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ |
| Ver estadisticas | ❌ | ✅ | ✅ |
| Configuracion del sistema | ❌ | ❌ | ✅ |

---

## Estados de Pedido

```
PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
    ↓         ↓            ↓           ↓
    └─────────┴────────────┴───────────┴──→ CANCELLED
```

| Estado | Descripcion |
|--------|-------------|
| PENDING | Pedido creado, esperando confirmacion de pago |
| CONFIRMED | Pago confirmado |
| PROCESSING | En preparacion |
| SHIPPED | Enviado (en camino) |
| DELIVERED | Entregado |
| CANCELLED | Cancelado |

---

## Estructura de API Routes

```
src/app/api/
├── auth/
│   ├── register/route.ts
│   └── login/route.ts
├── users/
│   └── route.ts
├── categories/
│   └── route.ts
├── brands/
│   └── route.ts
├── products/
│   └── route.ts
├── addresses/
│   └── route.ts
└── orders/
    └── route.ts
```
