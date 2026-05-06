import {Component, computed, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProductList} from './product-list/product-list';
import {PRODUCTS} from './models/product-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecommerce Shop');
  protected readonly filter = signal('');
  protected readonly onlyAvailable = signal(false);
  protected readonly allProducts = PRODUCTS;

  // Filtra por texto y estado de disponibilidad
  protected readonly products = computed(() =>
    this.allProducts.filter(p =>
      p.name.toLowerCase().includes(this.filter().toLowerCase())
      &&
      (!this.onlyAvailable() || p.stock > 0)
    )
  );

  // Métodos mutadores
  setFilter(value: string) {
    this.filter.set(value);
  }

  toggleAvailability() {
    this.onlyAvailable.set(!this.onlyAvailable());
  }
}
