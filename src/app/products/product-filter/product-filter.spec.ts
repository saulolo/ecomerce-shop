import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFilter } from './product-filter';

describe('ProductFilter', () => {
  let component: ProductFilter;
  let fixture: ComponentFixture<ProductFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ========== PRUEBA 3: Emite evento de filtro ==========
  it('debería emitir evento valueChange cuando el usuario escribe en el input', () => {
    // ARRANGE: Preparamos un spy para capturar el evento
    spyOn(component.valueChange, 'emit');

    // ACT: Simulamos que el usuario escribe en el input
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'laptop';
    input.dispatchEvent(new Event('input'));

    // ASSERT: Verificamos que se emitió el evento con el valor correcto
    expect(component.valueChange.emit).toHaveBeenCalledWith('laptop');
  });

  it('debería emitir evento onlyAvailableChange cuando se hace clic en el botón', () => {
    // ARRANGE
    fixture.componentRef.setInput('onlyAvailable', false);
    fixture.detectChanges();
    spyOn(component.onlyAvailableChange, 'emit');

    // ACT: Simulamos click en el botón
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    // ASSERT: El evento debe emitirse con el valor opuesto (true)
    expect(component.onlyAvailableChange.emit).toHaveBeenCalledWith(true);
  });

  it('debería mostrar texto correcto en el botón según el estado', () => {
    // ARRANGE & ACT: onlyAvailable = false
    fixture.componentRef.setInput('onlyAvailable', false);
    fixture.detectChanges();

    // ASSERT
    let button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Mostrar solo disponibles');

    // ACT: Cambiamos a true
    fixture.componentRef.setInput('onlyAvailable', true);
    fixture.detectChanges();

    // ASSERT
    button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Mostrar todos');
  });

  it('debería mostrar el valor actual en el input', () => {
    // ARRANGE
    const searchTerm = 'laptop';
    fixture.componentRef.setInput('value', searchTerm);

    // ACT
    fixture.detectChanges();

    // ASSERT
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe(searchTerm);
  });
});
