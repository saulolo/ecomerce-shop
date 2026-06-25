import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../product-service';
import {CATEGORIES} from '../../models/product-data';

@Component({
  selector: 'app-product-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form-page.html',
  styleUrl: './product-form-page.css',
})
export class ProductFormPage implements OnInit{
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Categorías para el <select>
  public categories = CATEGORIES;

  // Estado del componente
  public isEditMode = signal(false);
  public isSaving = signal(false);
  public productId = signal<string | null>(null);

  // Definición del formulario reactivo
  public productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),         // Precio mayor a 0
    ]),
    stock: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),         // Stock mayor o igual a 0
    ]),
    category: new FormControl('', [Validators.required]),
    active: new FormControl(true),
  });

  // Getters para acceder fácilmente a los controles en el HTML
  get nameControl() { return this.productForm.get('name')!; }
  get priceControl() { return this.productForm.get('price')!; }
  get stockControl() { return this.productForm.get('stock')!; }
  get categoryControl() { return this.productForm.get('category')!; }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Modo edición: cargamos el producto y rellenamos el formulario
      this.isEditMode.set(true);
      this.productId.set(id);

      this.productService.getProductById(id).subscribe({
        next: (product) => {
          if (product) {
            this.productForm.patchValue(product); // Rellena los campos con los datos del producto
          } else {
            this.router.navigate(['/not-found']);
          }
        },
        error: () => this.router.navigate(['/not-found']),
      });
    }
  }

  onSubmit(): void {
    // Si hay errores, marcar todos los campos como touched para mostrar mensajes
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const formValue = this.productForm.value;

    if (this.isEditMode() && this.productId()) {
      // Modo edición
      this.productService
        .updateProduct(this.productId()!, {
          name: formValue.name!,
          price: formValue.price!,
          stock: formValue.stock!,
          category: formValue.category!,
          active: formValue.active!,
        })
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: () => this.isSaving.set(false),
        });
    } else {
      // Modo creación
      this.productService
        .saveProduct({
          name: formValue.name!,
          price: formValue.price!,
          stock: formValue.stock!,
          category: formValue.category!,
          active: formValue.active!,
        })
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: () => this.isSaving.set(false),
        });
    }
  }
}
