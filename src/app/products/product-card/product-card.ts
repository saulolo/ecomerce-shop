import {Component, input} from '@angular/core';
import {Product} from '../models/product';
import {DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();

}
