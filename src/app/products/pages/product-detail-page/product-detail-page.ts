import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Product} from '../../models/product';
import {DecimalPipe} from '@angular/common';
import {ProductService} from '../../product-service';


@Component({
  selector: 'app-product-detail-page',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected product = signal<Product | undefined>(undefined);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (foundProduct) => {
        if (foundProduct) {
          this.product.set(foundProduct);
        } else {
          this.router.navigate(['/not-found']);
        }
      },
      error: () => {
        this.router.navigate(['/not-found']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
