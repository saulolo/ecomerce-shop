import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProductList} from './product-list/product-list';
import {PRODUCTS} from './models/product-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecomerce Shop');
  protected readonly products = PRODUCTS;
}
