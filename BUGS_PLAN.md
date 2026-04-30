# Bug Tracker Shop — Estado del plan de formación

Documento de contexto para continuar el plan de 10 días de entrenamiento en Angular 20 orientado a resolución de bugs.

## Repositorio

- GitHub: https://github.com/ManuelC22/ecommerce-shop
- Path local: `c:\Users\ManuelCuevas\Desktop\Saul\ecommerce-shop`
- Plan oficial: `Plan de formación Angular.pdf` (en la raíz, ignorado por git)
- Contexto adicional: `.github/context-app.md` y `.github/technological_stack.md`

## Convenciones del proyecto

- **Una rama por día** (`day-2`, `day-3`, `day-4`, ...). `main` permanece como scaffold limpio (sin bugs).
- Cada rama parte **desde `main`** y contiene **solo los bugs del día correspondiente**. No se heredan bugs de días anteriores.
- Bugs intencionales: realistas para un junior, pueden romper compilación, sin comentarios que los delaten.
- Stack: Angular 20, standalone components, signals, control flow moderno (`@if`, `@for`, `@empty`), reactive forms (cuando aplique), CSS por componente.
- Estructura: `src/app/features/products/{models,services,pages,components}` y `src/app/{core,shared}` cuando se requiera.

## Flujo para crear una nueva rama de día

```powershell
git checkout main
git checkout -b day-N
# (sembrar bugs)
git add -A
git commit -m "day N: <tema> con bugs intencionales"
git push -u origin day-N
```

## Estado por día

### Día 1 — Fundamentos (incluido en rama `day-2` legacy)
**Tema:** Listado estático, lectura de la app.
**Bugs sembrados:**
1. Propiedad mal escrita `{{ p.nombre }}` cuando el modelo tiene `name`.
2. Precio sin pipe `currency`, se muestra como número crudo.
3. Producto con `stock: 0` aparece como **Disponible** (`@if (p.stock >= 0)`).

### Día 2 — Templates, binding y control flow (rama `day-2`)
**Tema:** Filtros, control flow, `track`.
**Bugs sembrados:**
1. Filtro case-sensitive (solo se hace `toLowerCase()` al término, no a `p.name`).
2. Mensaje "No hay productos" siempre visible (fuera de `@empty`, sin condición).
3. Botón "Solo disponibles" filtra al revés (`stock === 0`).
4. `@for` con `track p` (referencia) en vez de `track p.id`.

> Nota: `day-2` también contiene los bugs del día 1 (legacy de las primeras iteraciones). Para sesiones futuras crear ramas aisladas.

### Día 3 — Componentes, inputs, outputs (rama `day-3`)
**Tema:** Dividir en `ProductList`, `ProductCard`, `ProductFilter`.
**Bugs sembrados:**
1. `ProductCard` declara `@Input() item` pero el padre usa `[product]="p"` → tarjetas vacías.
2. `ProductFilter` emite `(searchChange)` pero el padre escucha `(searched)` → la lista no se filtra.
3. `ProductCard.aplicarDescuento()` muta directamente `this.item.price` (mutación de input).
4. El padre renderiza precio + stock en su template en vez de delegarlo a la card (responsabilidades mezcladas).

### Día 4 — Signals y estado local (rama `day-4`)
**Tema:** Refactor a signals (`products`, `searchTerm`, `showOnlyAvailable`, `filteredProducts` computed).
**Bugs sembrados:**
1. `showOnlyAvailable = false` como variable normal → la UI no reacciona al toggle.
2. `filteredProducts: Product[] = ...` se calcula una sola vez (no es `computed`) → no reacciona a `searchTerm` ni a disponibilidad.
3. `addSample()` muta el array y luego hace `set(list)` → rompe igualdad referencial, no siempre re-renderiza.
4. Lógica `p.stock > 0` duplicada en `isAvailable`, `badge` y `rowClass`.

## Pendientes (por hacer)

| Día | Tema | Bugs a sembrar (según PDF) |
|-----|------|----------------------------|
| 5 | Routing y navegación | Link con id incorrecto, `/products/:id` no encuentra producto, detalle rompe si no existe, ruta inválida deja la app en blanco |
| 6 | Servicios e inyección de dependencias | Servicio retorna referencia mutable, `findById` compara string vs number, lógica que debería estar en el servicio sigue en el componente, dos componentes con reglas distintas de disponibilidad |
| 7 | HTTP y estados | Loading nunca se oculta si la API falla, app rompe con respuesta vacía, URL mal construida, mensaje técnico expuesto al usuario, asume que todos los productos tienen precio |
| 8 | Formularios y validaciones | Permite precio negativo, botón guardar habilitado con form inválido, errores antes de tocar el campo, edición no carga el producto, stock guardado como string |
| 9 | Testing | Test falla por comparación de id, falla por mensaje vacío no renderizado, falla por permitir precio 0, falla por filtro case-sensitive |
| 10 | Reto final integral | Mezcla de 10 bugs (ver pág. 17 del PDF) |

## Cómo continuar en una próxima sesión

Para retomar el trabajo, dar este archivo como contexto y pedir, por ejemplo:

> "Aplica el día 5 siguiendo las convenciones del documento `BUGS_PLAN.md`."

El asistente debe:
1. Hacer `git checkout main && git checkout -b day-5`.
2. Implementar el ejercicio del día (rutas, detalle, fallback) **solo con los bugs listados para ese día** en este documento.
3. Commit + push con mensaje `"day N: <tema> con bugs intencionales"`.
4. Reportar la tabla de bugs sembrados con archivo + línea + pista.

## Reglas inviolables al sembrar bugs

- **No** agregar comentarios que delaten el bug.
- **No** aplicar código limpio en la zona afectada (nombres ambiguos, lógica algo desordenada).
- **No** corregir bugs anteriores (cada rama es independiente desde `main`).
- Bugs deben ser reproducibles manualmente.
- Algunos pueden romper compilación (es deseable para entrenar lectura de errores).
