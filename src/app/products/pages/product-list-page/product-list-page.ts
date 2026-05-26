import {Component, computed, inject, signal} from '@angular/core';
import {ProductFilter} from '../../product-filter/product-filter';
import {ProductList} from '../../product-list/product-list';
import {ProductService} from '../../product-service';

@Component({
  selector: 'app-product-list-page',
  imports: [
    ProductFilter,
    ProductList
  ],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css',
})
export class ProductListPage {
  private productService = inject(ProductService);
  protected filter = signal('');
  protected onlyAvailable = signal(false);

  // Usar el servicio para obtener productos
  protected readonly products = computed(() =>
    this.productService.filterProducts(this.filter(), this.onlyAvailable())
  );

  setFilter(val: string) {
    this.filter.set(val);
  }
  setOnlyAvailable(val: boolean) {
    this.onlyAvailable.set(val);
  }
}
