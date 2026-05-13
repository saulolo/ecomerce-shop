import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product';
import {PRODUCTS} from '../../models/product-data';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    DecimalPipe
  ],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage {
  // Inyección de dependencias moderna con inject()
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  //Signal para almacenar el producto
  protected product = signal<Product | undefined>(undefined)


  constructor() {
    //Leer el parametrp 'id' de la url
    const id = this.route.snapshot.paramMap.get('id');

    //Buscar el producto en la lista
    const foundProduct = PRODUCTS.find(p => p.id === id)

    if (foundProduct) {
      this.product.set(foundProduct);
    } else {
      //Si no existe redirigir al 404
      this.router.navigate(['/not-found']);
    }
  }

  //Metodo para volver al listado
  goBack() {
    this.router.navigate(['/products']);
  }
}
