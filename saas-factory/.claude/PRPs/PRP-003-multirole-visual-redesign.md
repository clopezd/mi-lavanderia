# PRP-003: Arquitectura Multi-Rol, Rediseño Visual Liquid Glass y API Externa

**Dueño:** Carlos Mario
**Fecha:** 2026-02-22
**Estado:** ACTUALIZADO — PENDIENTE APROBACIÓN
**Fase:** 3 de N

---

## 🔍 DIAGNÓSTICO REAL (Estado al 2026-02-22)

Tras inspección completa del repositorio, el estado real es:

### ✅ Ya implementado (archivos sin commit)
| Archivo | Estado | Notas |
|---------|--------|-------|
| `src/app/(main)/dashboard/page.tsx` | Refactorizado | Vista cliente con stats y glass cards |
| `src/app/(main)/admin/page.tsx` | Creado | Guard de rol + métricas + tabla |
| `src/features/logistics/types/index.ts` | Creado | `OrderStatus`, `OrderSource`, interfaces |
| `src/features/logistics/services/logisticsService.ts` | Actualizado | Todas las server actions |
| `src/features/logistics/components/OrderStatusBadge.tsx` | Creado | Glass badges por estado |
| `src/features/logistics/components/OrderStatusDropdown.tsx` | Creado | Dropdown inline cambio de estado |
| `src/features/logistics/components/ClientOrdersList.tsx` | Creado | Lista con glass cards |
| `src/features/logistics/components/AdminMetricsRow.tsx` | Creado | 4 métricas en grid |
| `src/features/logistics/components/OrdersTable.tsx` | Creado | Tabla admin con filtros |
| `src/app/api/external/orders/route.ts` | Creado | API key auth + Zod + insert |
| `supabase/migrations/20260221200000_add_ai_fields_to_orders.sql` | Archivo creado | ⚠️ NO aplicada al DB |

### ❌ Gaps Reales (Lo que falta)

| Problema | Impacto | Fix |
|----------|---------|-----|
| **DB migration no aplicada** | `source`/`raw_input` no existen en la tabla real | `apply_migration` via Supabase MCP |
| **`body` en globals.css usa fondo CLARO** | La app no tiene fondo oscuro globalmente | Cambiar `background-color` a degradado oscuro |
| **Sidebar usa `bg-primary-500` sólido** | No tiene efecto Liquid Glass | Rediseñar sidebar con glass tokens |
| **Scrollbar light-mode** | Scrollbar blanco sobre dark background | Actualizar `::-webkit-scrollbar` para dark |
| **"Nuevo Pedido" apunta a `/test-logistics`** | URL temporal, ruta impropia | Cambiar a `/orders/new` o mover el form |
| **Badge de rol "Abogado" en sidebar** | Terminología incorrecta para lavandería | Eliminar rol `lawyer`, mantener solo `admin`/`client` |

---

## 🎨 PRINCIPIOS VISUALES: Apple Liquid Glass

> Investigado de flyonui.com/blog/liquid-glass-effects-in-tailwind-css/
> Referencia visual: Apple visionOS, iOS 18 frosted glass

### Filosofía central
Los elementos flotan sobre el fondo. No son cajas sólidas de color — son **vidrio esmerilado que filtra el gradiente de fondo**. La profundidad se crea con blur, no con color.

### Las 5 capas del Liquid Glass

```
Capa 5: Contenido (texto, íconos) — contrast alto
Capa 4: Borde sutil (border-white/15) — define el cristal
Capa 3: Superficie glass (bg-white/8 + backdrop-blur-xl) — el vidrio
Capa 2: Gradiente de fondo (bg-gradient dark) — lo que se filtra
Capa 1: Color de página (fijo, oscuro) — base inamovible
```

### Design Tokens confirmados (globals.css ya los tiene)

```css
/* Aplicar fondo oscuro GLOBALMENTE */
body {
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  min-height: 100vh;
}

/* Scrollbar dark (reemplazar light) */
::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }

/* Glass classes para @layer components */
.glass-card {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.11);
  border-color: rgba(255, 255, 255, 0.22);
}
```

### Sidebar: de sólido a cristal

**Actual (problema):**
```html
<aside class="bg-primary-500 ...">  <!-- sólido azul oscuro -->
```

**Target (Liquid Glass):**
```html
<aside style="background: rgba(15,12,41,0.75); backdrop-filter: blur(24px);
              border-right: 1px solid rgba(255,255,255,0.08);">
```

El sidebar se vuelve un panel de cristal oscuro que deja pasar sutilmente el gradiente del fondo.

### Paleta de estados (ya implementada, solo verificar)

| Estado | Clases Tailwind | Visual |
|--------|----------------|--------|
| PENDIENTE | `bg-amber-500/20 border-amber-400/30 text-amber-300` | Ámbar glass |
| RECOGIDO | `bg-blue-500/20 border-blue-400/30 text-blue-300` | Azul glass |
| LAVANDO | `bg-cyan-500/20 border-cyan-400/30 text-cyan-300 animate-pulse` | Cian pulsante |
| LISTO | `bg-emerald-500/20 border-emerald-400/30 text-emerald-300` | Verde glass |
| ENTREGADO | `bg-white/10 border-white/20 text-white/55` | Gris opaco |

---

## 🏗️ ARQUITECTURA DE RUTAS (Confirmada)

### `/dashboard` → Vista exclusiva del CLIENTE
```
✅ Guard: si admin → redirect('/admin')
✅ Saludo personalizado
✅ Stats row (activos, listos, total)
✅ Botón "Nuevo Pedido" con glass cyan
✅ Lista de sus propios pedidos
✅ Empty state
⚠️ PENDIENTE: cambiar href de "/test-logistics" → ruta correcta
```

### `/admin` → Panel exclusivo del ADMIN
```
✅ Guard: si !admin → redirect('/dashboard')
✅ Header con fecha
✅ AdminMetricsRow (4 cards)
✅ OrdersTable con filtros y dropdown inline
✅ Badge "En vivo" con pulse
```

### Sidebar: Navegación por rol
```
Client:
  - /dashboard → "Mis Pedidos"
  - /orders/new → "Nuevo Pedido"   ← Cambiar de /test-logistics

Admin:
  - /admin → "Panel de Pedidos"
  - /admin/users → "Usuarios"
  - /admin/analytics → "Analytics"
```

---

## 🗄️ MIGRACIÓN DB (Pendiente aplicar)

El archivo `supabase/migrations/20260221200000_add_ai_fields_to_orders.sql` ya existe con:

```sql
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS source VARCHAR(20)
  DEFAULT 'web'
  CHECK (source IN ('web', 'whatsapp', 'voice'));

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS raw_input TEXT;
```

**Acción requerida:** Ejecutar via Supabase MCP `apply_migration`.

---

## 🔌 API EXTERNA (Ya implementada — revisar)

**Archivo:** `src/app/api/external/orders/route.ts` — YA EXISTE

Implementación actual:
- ✅ Autenticación por `X-API-Key` header vs `EXTERNAL_API_KEY` env var
- ✅ Validación Zod (`client_id` UUID, `collection_address`, `collection_date` ISO, `source` enum)
- ✅ Verifica que el `client_id` exista en `profiles`
- ✅ Inserta en `orders` con `status: 'PENDIENTE'`
- ✅ Retorna `201` con `{ success, order_id, status, source }`
- ✅ Retorna `401` con API key incorrecta
- ✅ Retorna `400` con datos inválidos

**Única acción:** Asegurar que `EXTERNAL_API_KEY` esté en `.env.local`.

---

## 📋 PLAN DE EJECUCIÓN ACTUALIZADO

### FASE 3.1 — Cimientos Visuales (globals.css + sidebar) — PRIORITARIO
**Archivos a modificar:**
1. `src/app/globals.css`
   - Cambiar `body { background-color: var(--color-background) }` → degradado oscuro dark
   - Cambiar scrollbar a dark-mode
   - Agregar `.glass-card`, `.glass-input`, `.glass-btn-cyan` en `@layer components`

2. `src/components/layout/sidebar.tsx`
   - Cambiar `bg-primary-500` sólido → glass oscuro (`rgba(15,12,41,0.80) backdrop-blur`)
   - Actualizar estilos hover de nav items
   - Eliminar badge/rol `lawyer` (mantener solo `admin`/`client`)
   - Cambiar link "Nuevo Pedido" de `/test-logistics` → `/orders/new`
   - Actualizar scrollbar de la sidebar

### FASE 3.2 — Aplicar Migración DB
**Acción:** Ejecutar `apply_migration` via Supabase MCP con el SQL de `source` + `raw_input`.

### FASE 3.3 — Verificación Visual (Playwright)
**Acción:** Navegar a `/dashboard` y `/admin` para capturar screenshot y verificar el glass effect.

### FASE 3.4 — Variable de Entorno API
**Acción:** Verificar que `.env.local` tenga `EXTERNAL_API_KEY`.

---

## ✅ CRITERIOS DE ACEPTACIÓN

### Visual
- [ ] Fondo oscuro degradado en TODA la app (body, no solo layout inline)
- [ ] Sidebar translúcido (glass + backdrop-blur), no sólido
- [ ] Cards con glass effect visible sobre el fondo oscuro
- [ ] Scrollbar dark-mode (no el scrollbar blanco)
- [ ] Badges de estado con colores glass diferenciados

### Funcional - Cliente (/dashboard)
- [ ] Solo ve sus propios pedidos (lógica ya implementada)
- [ ] Botón "Nuevo Pedido" prominente en cyan
- [ ] Estados con badge de color correcto
- [ ] Empty state si no tiene pedidos

### Funcional - Admin (/admin)
- [ ] Redirect si no es admin (ya implementado)
- [ ] Ve TODOS los pedidos con nombre del cliente
- [ ] Puede cambiar estado inline
- [ ] Métricas del día

### DB & API
- [ ] Columnas `source` y `raw_input` existen en `orders` (DB real, no solo migration file)
- [ ] `POST /api/external/orders` retorna 201 con X-API-Key correcta
- [ ] `POST /api/external/orders` retorna 401 sin key

---

## ⚠️ DECISIONES CONFIRMADAS

1. **Dark mode permanente** — No hay toggle, siempre oscuro
2. **Sidebar glass** — Translúcido, no sólido
3. **Roles:** Solo `admin` y `client` — eliminar `lawyer` del badge
4. **API auth:** Header `X-API-Key` — simple para integración WhatsApp/Voz
5. **No romper auth** — Sistema de Supabase Auth intacto

---

## 🚧 FUERA DE SCOPE

- Integración real con WhatsApp
- Notificaciones push
- Subida de fotos
- Pagos
- Analytics con gráficas
- Animaciones SVG con `feTurbulence` (demasiado costoso para esta fase)

---

*PRP actualizado el 2026-02-22. Refleja estado real del repositorio. Pendiente aprobación.*
