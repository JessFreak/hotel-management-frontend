import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomFilter } from '../../../models/room.model';

@Component({
  selector: 'app-rooms-filters',
  templateUrl: './rooms-filters.component.html',
  standalone: true,
  imports: [
    FormsModule,
  ]
})
export class RoomsFilterComponent {
  @Input() filters: RoomFilter = {};
  @Output() filtersChange = new EventEmitter<RoomFilter>();
  @Output() apply = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  applyFilters() {
    this.apply.emit();
  }

  clearFilters() {
    this.clear.emit();
  }
}
