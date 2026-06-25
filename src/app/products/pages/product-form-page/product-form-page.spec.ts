import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormPage } from './product-form-page';
import { ProductService } from '../../product-service';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

describe('ProductFormPage', () => {
  let component: ProductFormPage;
  let fixture: ComponentFixture<ProductFormPage>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // ARRANGE: Crear mocks de las dependencias
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'saveProduct',
      'updateProduct',
    ]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue(null),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormPage],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ========== PRUEBA 4: Valida que el formulario sea inválido ==========
  it('debería validar que el formulario es inválido cuando está vacío', () => {
    // ARRANGE: Formulario vacío
    component.productForm.reset();

    // ACT
    fixture.detectChanges();

    // ASSERT
    expect(component.productForm.invalid).toBe(true);
    expect(component.productForm.get('name')?.hasError('required')).toBe(true);
    expect(component.productForm.get('category')?.hasError('required')).toBe(true);
  });

  it('debería tener el botón habilitado cuando no está guardando', () => {
    // ARRANGE: Llenar el formulario con datos válidos
    component.productForm.patchValue({
      name: 'Laptop',
      price: 1500,
      stock: 10,
      category: 'Electrónica',
      active: true,
    });

    // ACT
    fixture.detectChanges();

    // ASSERT
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(component.productForm.valid).toBe(true);
    expect(component.isSaving()).toBe(false);
    expect(submitButton.disabled).toBe(false);
  });

  it('debería validar que el nombre sea requerido', () => {
    // ARRANGE
    const nameControl = component.nameControl;

    // ACT: Dejar el campo vacío
    nameControl.setValue('');

    // ASSERT
    expect(nameControl.hasError('required')).toBe(true);
    expect(nameControl.valid).toBe(false);
  });

  it('debería validar que el precio sea mayor a 0', () => {
    // ARRANGE
    const priceControl = component.priceControl;

    // ACT: Intentar poner precio 0
    priceControl.setValue(0);

    // ASSERT
    expect(priceControl.hasError('min')).toBe(true);
    expect(priceControl.valid).toBe(false);
  });

  it('debería validar que el stock sea mayor o igual a 0', () => {
    // ARRANGE
    const stockControl = component.stockControl;

    // ACT: Stock negativo
    stockControl.setValue(-1);

    // ASSERT
    expect(stockControl.hasError('min')).toBe(true);

    // ACT: Stock 0 (válido)
    stockControl.setValue(0);

    // ASSERT
    expect(stockControl.valid).toBe(true);
  });

  it('debería validar que la categoría sea requerida', () => {
    // ARRANGE
    const categoryControl = component.categoryControl;

    // ACT
    categoryControl.setValue('');

    // ASSERT
    expect(categoryControl.hasError('required')).toBe(true);
  });

  it('debería crear un producto cuando el formulario es válido', () => {
    // ARRANGE
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    mockProductService.saveProduct.and.returnValue(
      of({
        id: '123',
        name: 'Laptop',
        price: 1500,
        stock: 10,
        category: 'Electrónica',
        active: true,
      })
    );

    component.productForm.patchValue({
      name: 'Laptop',
      price: 1500,
      stock: 10,
      category: 'Electrónica',
      active: true,
    });

    // ACT
    component.onSubmit();

    // ASSERT
    expect(mockProductService.saveProduct).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('debería cargar un producto en modo edición', () => {
    // ARRANGE: Simular que hay un ID en la ruta
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue('123');
    mockProductService.getProductById.and.returnValue(
      of({
        id: '123',
        name: 'Laptop Gamer',
        price: 2000,
        stock: 5,
        category: 'Electrónica',
        active: true,
      })
    );

    // ACT: Crear el componente nuevamente con el ID
    const newFixture = TestBed.createComponent(ProductFormPage);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges(); // Esto dispara ngOnInit

    // ASSERT
    expect(newComponent.isEditMode()).toBe(true);
    expect(mockProductService.getProductById).toHaveBeenCalledWith('123');
  });
});
