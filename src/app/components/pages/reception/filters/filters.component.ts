import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive()
export class BaseFiltersComponent<T> {
  @Input() filters: T = {} as T;
  @Output() filtersChange = new EventEmitter<T>();
  @Output() apply = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  applyFilters() {
    this.apply.emit();
  }

  clearFilters() {
    this.clear.emit();
  }
}
