import {Component, computed, signal} from '@angular/core';
import {PRODUCTS} from '../../models/product-data';
import {ProductFilter} from '../../product-filter/product-filter';
import {ProductList} from '../../product-list/product-list';

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
  protected filter = signal('');
  protected onlyAvailable = signal(false);
  protected readonly allProducts = PRODUCTS;

  // En esta función uso Computed para productos filtrados
  protected readonly products = computed(() =>
    this.allProducts
      .filter(p =>
        p.name.toLowerCase().includes(this.filter().toLowerCase()) &&
        (!this.onlyAvailable() || p.stock > 0)
      )
  );

  setFilter(val: string) {
    this.filter.set(val);
  }
  setOnlyAvailable(val: boolean) {
    this.onlyAvailable.set(val);
  }
}
