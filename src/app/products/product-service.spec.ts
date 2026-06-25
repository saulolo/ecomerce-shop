import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-service';
import {Product} from './models/product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('Deberia crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  // ========== PRUEBA 1: Retorna productos ==========
  describe('getProducts', () => {
    it('debería retornar una lista de productos en estado success', (done) => {
      // ARRANGE: Configuramos el estado esperado
      const state = 'success';

      // ACT: Ejecutamos el método
      service.getProducts(state).subscribe({
        next: (products) => {
          // ASSERT: Verificamos el resultado
          expect(products).toBeDefined();
          expect(products.length).toBeGreaterThan(0);
          expect(Array.isArray(products)).toBe(true);
          done();
        },
      });
    });

    it('debería retornar una lista vacía en estado empty', (done) => {
      // ARRANGE
      const state = 'empty';

      // ACT
      service.getProducts(state).subscribe({
        next: (products) => {
          // ASSERT
          expect(products).toBeDefined();
          expect(products.length).toBe(0);
          done();
        },
      });
    });

    it('debería lanzar un error en estado error', (done) => {
      // ARRANGE
      const state = 'error';

      // ACT
      service.getProducts(state).subscribe({
        next: () => fail('Debería haber lanzado un error'),
        error: (error) => {
          // ASSERT
          expect(error).toBeDefined();
          expect(error.message).toContain('Error técnico');
          done();
        },
      });
    });
  });

  // ========== PRUEBA 2: Busca producto por ID ==========
  describe('getProductById', () => {
    it('debería retornar un producto existente por su ID', (done) => {
      // ARRANGE: Usamos un ID que sabemos que existe
      // (puedes verificar esto en product-data.ts)
      const productId = '001';

      // ACT
      service.getProductById(productId).subscribe({
        next: (product) => {
          // ASSERT
          expect(product).toBeDefined();
          expect(product?.id).toBe(productId);
          done();
        },
      });
    });

    it('debería retornar undefined si el producto no existe', (done) => {
      // ARRANGE
      const productId = 'id-inexistente';

      // ACT
      service.getProductById(productId).subscribe({
        next: (product) => {
          // ASSERT
          expect(product).toBeUndefined();
          done();
        },
      });
    });
  });

  // ========== PRUEBA 3: Filtra por nombre ==========
  describe('filterProducts', () => {
    let mockProducts: Product[];

    beforeEach(() => {
      // ARRANGE: Preparamos datos de prueba
      mockProducts = [
        { id: '1', name: 'Laptop Gamer', price: 1500, stock: 5, category: 'Electrónica', active: true },
        { id: '2', name: 'Mouse Inalámbrico', price: 25, stock: 10, category: 'Electrónica', active: true },
        { id: '3', name: 'Teclado Mecánico', price: 75, stock: 0, category: 'Electrónica', active: true },
      ];
    });

    it('debería filtrar productos por nombre correctamente', () => {
      // ARRANGE
      const searchTerm = 'laptop';
      const onlyAvailable = false;

      // ACT
      const resultado = service.filterProducts(mockProducts, searchTerm, onlyAvailable);

      // ASSERT
      expect(resultado.length).toBe(1);
      expect(resultado[0].name).toBe('Laptop Gamer');
    });

    it('debería ser case-insensitive al filtrar por nombre', () => {
      // ARRANGE
      const searchTerm = 'MOUSE';
      const onlyAvailable = false;

      // ACT
      const resultado = service.filterProducts(mockProducts, searchTerm, onlyAvailable);

      // ASSERT
      expect(resultado.length).toBe(1);
      expect(resultado[0].name).toBe('Mouse Inalámbrico');
    });

    it('debería filtrar solo productos disponibles cuando onlyAvailable es true', () => {
      // ARRANGE
      const searchTerm = '';
      const onlyAvailable = true;

      // ACT
      const resultado = service.filterProducts(mockProducts, searchTerm, onlyAvailable);

      // ASSERT
      expect(resultado.length).toBe(2);
      expect(resultado.every(p => p.stock > 0)).toBe(true);
    });

    it('debería retornar lista vacía si no hay coincidencias', () => {
      // ARRANGE
      const searchTerm = 'producto-inexistente';
      const onlyAvailable = false;

      // ACT
      const resultado = service.filterProducts(mockProducts, searchTerm, onlyAvailable);

      // ASSERT
      expect(resultado.length).toBe(0);
    });

    it('debería combinar filtro por nombre y disponibilidad', () => {
      // ARRANGE
      const searchTerm = 'teclado';
      const onlyAvailable = true;

      // ACT
      const resultado = service.filterProducts(mockProducts, searchTerm, onlyAvailable);

      // ASSERT
      expect(resultado.length).toBe(0); // El teclado tiene stock 0
    });
  });

  // ========== PRUEBA 4: Valida disponibilidad ==========
  describe('isAvailable', () => {
    it('debería retornar true si el producto tiene stock mayor a 0', () => {
      // ARRANGE
      const product: Product = {
        id: '1',
        name: 'Laptop',
        price: 1500,
        stock: 5,
        category: 'Electrónica',
        active: true,
      };

      // ACT
      const resultado = service.isAvailable(product);

      // ASSERT
      expect(resultado).toBe(true);
    });

    it('debería retornar false si el producto tiene stock 0', () => {
      // ARRANGE
      const product: Product = {
        id: '1',
        name: 'Laptop',
        price: 1500,
        stock: 0,
        category: 'Electrónica',
        active: true,
      };

      // ACT
      const resultado = service.isAvailable(product);

      // ASSERT
      expect(resultado).toBe(false);
    });

    it('debería retornar false si el producto tiene stock negativo', () => {
      // ARRANGE
      const product: Product = {
        id: '1',
        name: 'Laptop',
        price: 1500,
        stock: -1,
        category: 'Electrónica',
        active: true,
      };

      // ACT
      const resultado = service.isAvailable(product);

      // ASSERT
      expect(resultado).toBe(false);
    });
  });


});
