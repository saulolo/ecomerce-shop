import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
import { provideRouter } from '@angular/router';
import { Product } from '../models/product';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    // Proporcionar el input requerido antes de detectChanges
    const mockProduct: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      stock: 10,
      category: 'Test',
      active: true,
    };
    fixture.componentRef.setInput('product', mockProduct);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
