import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ProductFilter} from '../../product-filter/product-filter';
import {ProductList} from '../../product-list/product-list';
import {ProductRequestState, ProductService} from '../../product-service';
import {Product} from '../../models/product';
import {RouterLink} from '@angular/router';

type ViewState = 'loading' | 'error' | 'empty' | 'success';

@Component({
  selector: 'app-product-list-page',
  imports: [
    ProductFilter,
    ProductList,
    RouterLink
  ],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css',
})
export class ProductListPage implements OnInit{
  private productService = inject(ProductService);

  protected filter = signal('');
  protected onlyAvailable = signal(false);

  protected allProducts = signal<Product[]>([]);
  protected loading = signal(false);
  protected errorMessage = signal<string | null>(null);

  // Usar el servicio para obtener productos
  protected readonly products = computed(() =>
    this.productService.filterProducts(
      this.allProducts(),
      this.filter(),
      this.onlyAvailable())
  );

  //Determina cuál es el estado actual de la pantalla.
  protected readonly viewState = computed<ViewState>(() => {
    if (this.loading()) return 'loading';
    if (this.errorMessage()) return 'error';
    if (this.allProducts().length === 0) return 'empty';
    return 'success';
  });

  //computed para “sin resultados por filtro”
  protected readonly noResultsByFilter = computed(() =>
    this.viewState() === 'success' && this.products().length === 0
  );

  //Con este metodo digo que tipo de respuesta quiero simular
  ngOnInit(): void {
    this.loadProducts('empty');
  }


  loadProducts(state: ProductRequestState = 'success') {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.allProducts.set([]);

    this.productService.getProducts(state).subscribe({
      next: (products) => {
        this.allProducts.set(products);
      },
      error: (error) => {
        console.error('Error técnico al cargar productos:', error);
        this.errorMessage.set('No fue posible cargar los productos. Intenta nuevamente.');
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  setFilter(value: string) {
    this.filter.set(value);
  }

  setOnlyAvailable(value: boolean) {
    this.onlyAvailable.set(value);
  }
}
