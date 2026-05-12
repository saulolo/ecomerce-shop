import {Component, computed, EventEmitter, input, Output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  // Recibe signal del padre (no define su propio signal)
  value = input<string>();
  onlyAvailable = input<boolean>();

  // Para emitir cambios por eventos clásicos (puedes usar signals para advanced cases)
  @Output() valueChange = new EventEmitter<string>();
  @Output() onlyAvailableChange = new EventEmitter<boolean>();

  onTextChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
  toggleAvailability() {
    this.onlyAvailableChange.emit(!this.onlyAvailable());
  }
}
