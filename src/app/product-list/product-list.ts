import {Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../models/product';
import {PRODUCTS} from '../models/product-data';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = input.required<Product[]>();
}
