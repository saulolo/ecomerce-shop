import {Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Product} from '../models/product';
import {ProductCard} from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = input.required<Product[]>(); // <- Recibe la lista desde el padre
}
