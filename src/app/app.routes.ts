import { Routes } from '@angular/router';
import {ProductListPage} from './products/pages/product-list-page/product-list-page';
import {ProductDetailPage} from './products/pages/product-detail-page/product-detail-page';
import {NotFound} from './shared/not-found/not-found';
import {ProductFormPage} from './products/pages/product-form-page/product-form-page';

export const routes: Routes = [
  //Ruta raiz
  {path: '', redirectTo: '/products', pathMatch: "full"},

  //Ruta de listado de productos
  {path: 'products', component: ProductListPage},

  // Nuevo producto
  { path: 'products/new', component: ProductFormPage },

  //Ruta de detalle de producto (con parámetro dinámico: id)
  {path: 'products/:id', component: ProductDetailPage},

  // Ruta decEditar producto
  { path: 'products/:id/edit', component: ProductFormPage },

  //Ruta de página no encontrada
  {path: 'not-found', component: NotFound},

  //Ruta comodin: cualquier otra URL accedida redirige a not-found (siempre estará al final)
  {path: '**', redirectTo: '/not-found'}
];
