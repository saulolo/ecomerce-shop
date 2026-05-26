# 📚 DAY 6 - Servicios, Inyección de Dependencias y Lógica reutilizable

## 📖 Tabla de Contenidos

1. [¿Qué es un Servicio?](#1-que-es-un-servicio)
2. [Inyección de dependencias (Dependency Injection)](#2-inyección-de-dependencias-dependency-injection)
3. [Separación entre lógica de componente y lógica de negocio](#3-separación-entre-lógica-de-componente-y-lógica-de-negocio)
4. [Servicios para acceso a datos](#4-servicios-para-acceso-a-datos)
5. [Servicios para reglas de negocio](#5-servicios-para-reglas-de-negocio)
6. [Errores comunes en servicios](#6-errores-comunes-en-servicios)
7. [Resumen Visual](#resumen-visual)
8. [Referencias y Recursos](#referencias-y-recursos)
---

## Teoría

### 1. Que es un Servicio?.
Un servicio es una clase reutilizable diseñada para encapsular lógica o funcionalidad que debe ser compartida 
entre diferentes partes de la aplicación. Se utiliza principalmente para:
- Separar lógica de negocio del componente.
- Compartir datos y métodos entre componentes.
- Facilitar pruebas unitarias al desacoplar funcionalidades.
- Gestionar recursos externos como APIs o almacenamiento local.

Angular proporciona el mecanismo de inyección de dependencias (DI) para gestionar servicios, lo que 
garantiza que siempre se trabaje con una única instancia compartida (Patrón Singleton) a menos que 
se configure de otra manera.

![servicios](./docs/images/12_%20servicio.png)  
*Figura 1: Servicio en Angular  
*Fuente: [gustavodohara.com](https://www.freecodecamp.org/espanol/news/rxjs-como-sacarle-provecho-a-angular/)*

---

### 2. Inyección de dependencias (Dependency Injection)
Es un patrón de diseño donde las dependencias (servicios u objetos que una clase necesita para funcionar) 
se proporcionan de forma automática en vez de crearlas manualmente dentro de la clase.  
En Angular, la inyección de dependencias es fundamental:
- El framework se encarga de crear instancias y “inyectarlas” donde se necesiten.
- Se solicita un servicio mediante el constructor o el método `inject()`.

**Ejemplo:**
```typescript
constructor(private productService: ProductService) {}
```
o
```typescript
import { inject } from '@angular/core';
const productService = inject(ProductService);
```
---

### 3. Separación entre lógica de componente y lógica de negocio
Es la práctica de mantener el código que maneja la UI (componentes) separado del código 
que procesa datos o reglas de negocio (servicios).  
**Ventaja:**
- Componentes se enfocan en la presentación (UI, eventos, bindings).
- Servicios manejan la obtención/modificación de datos y reglas.
- Favorece la reutilización, pruebas y mantenibilidad.

---

### 4. Servicios para acceso a datos
Servicios creados exclusivamente para gestionar toda la comunicación con fuentes de datos 
externas o internas:
- API REST (HttpClient)
- Bases de datos locales o almacenamiento web
- Archivos, caché, etc.

**Ejemplo típico:** `ProductService` con métodos `getProducts()`, `getProductById(id)`, `saveProduct(p)`…

---

### 5. Servicios para reglas de negocio
Servicios dedicados a centralizar la lógica, restricciones o validaciones propias de tu dominio (negocio).
- Por ejemplo: precios, impuestos, descuentos, validaciones.
- Facilita modificación y reutilización de reglas sin cambiar los componentes.

---

### 6. Errores comunes en servicios
- Registrar el servicio en el lugar equivocado (`providers` de un componente en vez de raíz).
- Crear instancias manualmente con `new` (perdiendo la inyección y ciclo de vida).
- Colocar demasiada lógica de vista/UI dentro del servicio.
- No manejar correctamente errores de red o peticiones en servicios de datos.
- Hacer que los servicios dependan de detalles de la UI (acoplamiento innecesario).

---

#### Resumen Visual
| Concepto                                    | Resumen breve                                                                                              |
|----------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Servicio                                    | Clase reutilizable para encapsular lógica y compartir datos entre componentes.                             |
| Inyección de dependencias                    | Patrón donde Angular crea e "inyecta" servicios automáticamente donde se necesitan, evitando `new Service`.|
| Separación lógica UI y lógica de negocio     | Mantener visual/interfaz (componentes) separado del procesamiento o reglas (servicios).                    |
| Servicio para acceso a datos                 | Servicio encargado de obtener, guardar o modificar datos externos (API, bases, archivos, etc.).            |
| Servicio para reglas de negocio              | Servicio que define y centraliza reglas, cálculos, validaciones o lógica del dominio.                      |
| Errores comunes en servicios                 | Registrarlos mal, instanciarlos manualmente, mezclar lógica de UI, no manejar errores de red, acoplamiento.|
---

**Detalles**:  
`Servicio` → Decorado con `@Injectable()`, almacena la lógica o acceso a datos.    
`Componente` → Solo maneja la vista, inyecta servicios por constructor o usando `inject()`.  
`Inyector de dependencias` → Sistema de Angular que busca y provee (inyecta) instancias de servicios.   
`Provider` → (En `@Injectable({ providedIn: 'root' })`) determina el alcance/globalidad del servicio.   


## Referencias y Recursos

- 📌 [freecodecamp](https://www.freecodecamp.org/espanol/news/rxjs-como-sacarle-provecho-a-angular/)
- 📌 [aluralatam](https://www.aluracursos.com/blog/servicios-e-inyeccion-de-dependencias-en-angular-que-son-y-como-funcionan)
- 📌 [Angular Docs: services](https://angular.dev/guide/routing/define-routes/)


---
### 📄 METADATOS DEL DOCUMENTO 

| Campo                    | Detalles                                                           |
|:-------------------------|:-------------------------------------------------------------------|
| **Título**               | DAY 6 - SERVICIOS, INYECCIÓN DE DEPENDENCIAS Y LÓGICA REUTILIZABLE |
| **Autor(es)**            | Saul Echeverri                                                     |
| **Versión**              | 1.0.0                                                              |
| **Fecha de Creación**    | 26 de Mayo de 2026                                                 |
| **Última Actualización** | 26 de Mayo de 2026                                                 |
| **Notas Adicionales**    | Documento base de referencia para el plan de formación en Angular. |

---

