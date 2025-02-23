import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomFilter } from '../../../../../models/room.model';
import { BaseFiltersComponent } from '../filters.component';

@Component({
  selector: 'app-rooms-filters',
  templateUrl: './rooms-filters.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class RoomsFilterComponent extends BaseFiltersComponent<RoomFilter> {}
