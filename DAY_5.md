# 📚 DAY 5 - Routing y navegación

## 📖 Tabla de Contenidos

1. [Configuración de rutas](#1-configuración-de-rutas)
2. [RouterLink](#2-routerlink)
3. [Parámetros de ruta](#3-parámetros-de-ruta)
4. [Navegación a detalle](#4-navegación-a-detalle)
5. [Rutas no encontradas](#5-rutas-no-encontradas)
6. [Lazy loading básico como concepto](#6-lazy-loading-básico-como-concepto)
7. [Errores comunes de navegación](#7-errores-comunes-de-navegación)
---

## Teoría

![rutas](./docs/images/11_rutas.png)  
*Figura 1: Enrutamienro en angular  
*Fuente: [Medium.com](https://medium.com/@jsmuster/enrutamiento-de-angular-en-5-minutos-spanish-dfbadc2c1cb7)*

### 1. Configuración de rutas.
Definir rutas es el proceso de indicar en Angular qué componente debe mostrar al usuario en función de la URL.  
Esto se logra mediante el arreglo de rutas (`Routes[]`) y usando el RouterModule.  
Cada ruta asocia un path (ej: `/productos/:id`) con un componente específico.

**Ejemplo**:
```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent }
];
```
Para esta ruta, cuando un usuario visite el `/home` ó `/products`, la aplicación mostrará los componentes
HomeComponent o ProductsComponent respectivamente.

---

### 2. Elementos claves para implementar rutas en Angular
Para implementar rutas en Angular, debemos conocer los siguientes conceptos y herramientas:

#### A. RouterOutlet
Es una directiva que actúa como un contenedor donde se renderizan los componentes en función de la ruta activa. 
Se coloca en el `app.component.html` o en cualquier otro lugar donde queramos que aparezcan las vistas dinámicas.

**Ejemplo:**
```html
<router-outlet></router-outlet>
```

#### B. RouterLink
Es una directiva de Angular que permite crear enlaces navegables dentro de la aplicación SPA sin recargar la página.  
`[routerLink]` se utiliza en plantillas (HTML) para vincular rutas definidas.

**Ejemplo:**
```html
<a routerLink="/products">Ver productos</a>
```

#### C. ActivatedRoute
Es un servicio que nos permite acceder a los parámetros de la URL dentro de un componente

**Ejemplo:**
```typescript
constructor(private route: ActivatedRoute) {
}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```
#### D. Router
Es un servicio que nos permite cambiar de ruta de forma programática. Simplemente, 
lo importamos en nuestro componente y hacemos uso del mismo.

**Ejemplo:**
```typescript
this.router.navigate(['/dashboard']);
```

---

### 3. Parámetros de ruta
Permiten definir rutas dinámicas, donde una parte del path es variable (como el id de un producto).  
Son útiles para mostrar detalles, editar, etc.

**Ejemplo configuración:**
```typescript
{ path: 'products/:id', component: ProductDetailComponent }
```
**Enlace con parámetro:**
```html
<a [routerLink]="['/products', producto.id]">Ver detalle</a>
```
**Cómo se capturan:**  
Se recuperan en el componente con `ActivatedRoute`.


---

### 4. Navegación a detalle
Consiste en dirigir al usuario desde una vista de lista a una vista de detalle, aprovechando los parámetros 
de ruta.  
Generalmente se usa en catálogos, e-commerce, etc.

**Ejemplo:**
- El usuario da clic en un producto, Angular navega a `/products/123` y muestra los detalles del producto con id `123`.

---

### 5. Rutas no encontradas
Una ruta no encontrada (404) permite mostrar una página personalizada si el usuario intenta navegar a una URL que no 
existe en la configuración de la app.

**Ejemplo:**
```typescript
{ path: '**', component: NotFoundComponent }
```

---

### 6. Lazy loading básico como concepto
Lazy loading (“carga perezosa”) es una técnica que permite cargar módulos de la aplicación solo cuando se requieren, 
mejorando el tiempo de arranque inicial.  
En Angular se implementa dividiendo la app en módulos y cargando ciertos módulos bajo demanda al navegar a rutas específicas.

**Ejemplo configuración:**
```typescript
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
```

---

### 7. Errores comunes de navegación
- Usar rutas mal configuradas o con typos.
- Olvidar importar el RouterModule o incluir rutas hijas.
- No manejar rutas con parámetros correctamente (`:id`/`params`).
- Usar `href` en vez de `routerLink` (esto recarga la página).
- No agregar la ruta comodín (`**`) para rutas 404.
- Navegar programáticamente sin el Router (usando `window.location`).
- No limpiar suscripciones a `ActivatedRoute` en componentes.

---

#### Resumen Visual
| Concepto                      | Resumen breve                                                                                                              |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Configuración de rutas        | Definir los caminos (paths) de la app y el componente que muestra cada uno. Se realiza con el arreglo de rutas y el RouterModule. |
| RouterLink                    | Directiva para crear enlaces navegables internamente sin recarga, vinculando el HTML con la ruta de Angular.              |
| Parámetros de ruta            | Partes variables en la URL (como un id), se definen con `:param` y permiten páginas de detalle dinámicas.                 |
| Navegación a detalle          | Ir desde una vista general (ej: lista) a una específica (detalle), normalmente pasando un parámetro por la URL.           |
| Rutas no encontradas          | Configurar una ruta comodín (`**`) para mostrar una página personalizada si la URL no coincide con ninguna ruta definida. |
| Lazy loading básico           | Técnica para cargar módulos solo cuando se necesitan, lo que acelera el arranque de la app.                               |
| Errores comunes de navegación | Problemas habituales como rutas mal escritas, olvidar 404, usar `href` en vez de `routerLink`, o mal manejo de parámetros.|
---

**Componentes clave**:  
`Routes[]` → Array que define las rutas (el mapa)  
`<router-outlet>` → Espacio donde se renderizan los componentes según la ruta  
`routerLink` → Enlaces que navegan sin recargar la página  
`ActivatedRoute` → Servicio para leer parámetros de la URL (como el id)  


## Referencias y Recursos

- 📌 [freecodecamp](https://www.freecodecamp.org/espanol/news/rutas-en-angular-como-implementarlas/)
- 📌 [medium.com](https://medium.com/@jsmuster/enrutamiento-de-angular-en-5-minutos-spanish-dfbadc2c1cb7)
- 📌 [Angular Docs: signals](https://angular.dev/guide/routing/define-routes/)


---
### 📄 METADATOS DEL DOCUMENTO 

| Campo                    | Detalles                                                           |
|:-------------------------|:-------------------------------------------------------------------|
| **Título**               | DAY 5 - ROUTING Y NAVEGACIÓN                                       |
| **Autor(es)**            | Saul Echeverri                                                     |
| **Versión**              | 1.0.0                                                              |
| **Fecha de Creación**    | 12 de Mayo de 2026                                                 |
| **Última Actualización** | 12 de Mayo de 2026                                                 |
| **Notas Adicionales**    | Documento base de referencia para el plan de formación en Angular. |

---

