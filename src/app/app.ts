import {Component, computed, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {ProductList} from './products/product-list/product-list';
import {PRODUCTS} from './products/models/product-data';
import {ProductFilter} from './products/product-filter/product-filter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, FormsModule, ProductFilter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //En estos campos de clase ya estoy usando signals
  protected readonly title = signal('Ecommerce Shop');
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
