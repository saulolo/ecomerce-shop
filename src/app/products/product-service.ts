import {Injectable, signal} from '@angular/core';
import {PRODUCTS} from './models/product-data';
import {Product} from './models/product';
import {delay, map, Observable, of, switchMap, throwError, timer} from 'rxjs';

export type ProductRequestState = 'success' | 'empty' | 'error';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  //Obtener todos los productos
  getProducts(state: ProductRequestState = 'success'): Observable<Product[]> {
    switch (state) {
      case 'empty':
        return of([]).pipe(delay(1200));

      case 'error':
        return timer(1200).pipe(
          switchMap(() =>
            throwError(() => new Error('Error técnico: no fue posible consultar los productos'))
          )
        );

      case 'success':
      default:
        return of(PRODUCTS).pipe(delay(1200));
    }
  }

  //Buscar producto por ID
  getProductById(id: string): Observable<Product | undefined> {
    return of(PRODUCTS).pipe(
      delay(800),
      map(products => products.find(p => p.id === id))
    );
  }


  //filtar productos por nombre y disponibilidad
  filterProducts(products: Product[], search: string, onlyAvailable: boolean): Product[] {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) && (!onlyAvailable || p.stock > 0))
  }

  //Validar disponibilidad
  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

}
