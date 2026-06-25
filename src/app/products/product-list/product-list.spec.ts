import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import { Product } from '../models/product';
import { provideRouter } from '@angular/router';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ========== PRUEBA 1: Muestra lista de productos ==========
  it('debería mostrar una lista de productos', () => {
    // ARRANGE: Preparamos datos de prueba
    const mockProducts: Product[] = [
      { id: '1', name: 'Laptop', price: 1500, stock: 5, category: 'Electrónica', active: true },
      { id: '2', name: 'Mouse', price: 25, stock: 10, category: 'Electrónica', active: true },
    ];

    // Configuramos el input del componente
    fixture.componentRef.setInput('products', mockProducts);

    // ACT: Detectamos cambios para que se renderice
    fixture.detectChanges();

    // ASSERT: Verificamos que se renderizaron los productos
    const productCards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(2);
  });

  it('debería renderizar el título "Catálogo de Productos"', () => {
    // ARRANGE
    fixture.componentRef.setInput('products', []);

    // ACT
    fixture.detectChanges();

    // ASSERT
    const title = fixture.nativeElement.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Catálogo de Productos');
  });

  // ========== PRUEBA 2: Muestra mensaje vacío ==========
  it('debería mostrar un contenedor vacío cuando no hay productos', () => {
    // ARRANGE
    const emptyProducts: Product[] = [];
    fixture.componentRef.setInput('products', emptyProducts);

    // ACT
    fixture.detectChanges();

    // ASSERT
    const productCards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(0);
  });

  it('debería actualizar la lista cuando cambian los productos', () => {
    // ARRANGE: Primera lista con 2 productos
    const initialProducts: Product[] = [
      { id: '1', name: 'Laptop', price: 1500, stock: 5, category: 'Electrónica', active: true },
      { id: '2', name: 'Mouse', price: 25, stock: 10, category: 'Electrónica', active: true },
    ];
    fixture.componentRef.setInput('products', initialProducts);
    fixture.detectChanges();

    // ACT: Cambiamos a una lista con 3 productos
    const updatedProducts: Product[] = [
      ...initialProducts,
      { id: '3', name: 'Teclado', price: 75, stock: 8, category: 'Electrónica', active: true },
    ];
    fixture.componentRef.setInput('products', updatedProducts);
    fixture.detectChanges();

    // ASSERT
    const productCards = fixture.nativeElement.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(3);
  });
});
