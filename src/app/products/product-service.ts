import {Injectable, signal} from '@angular/core';
import {PRODUCTS} from './models/product-data';
import {Product} from './models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly allProducts = signal<Product[]>(PRODUCTS)

  //Obtener todos los productos
  getProducts() {
    return this.allProducts();
  }

  //Buscar producto por ID
  getProductById(id: String) {
    return this.allProducts().find(p => p.id === id);
  }

  //filtar productos por nombre y disponibilidad
  filterProducts(search: string, onlyAvailable: boolean) {
    return this.allProducts().filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (!onlyAvailable || p.stock > 0))
  }

  //Validar disponibilidad
  isAvailable(id: string) {
    const product = this.getProductById(id);
    return product ? product.stock > 0 : false;
  }

}
