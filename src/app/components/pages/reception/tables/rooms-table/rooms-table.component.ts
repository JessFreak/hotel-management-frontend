import { Component } from '@angular/core';
import { FiltersComponent } from '../../../../rooms/filters/room-filters.component';
import { Observable } from 'rxjs';
import { Room, RoomFilter } from '../../../../../models/room.model';
import { RoomService } from '../../../../../services/rooms.service';
import { AsyncPipe, NgForOf, TitleCasePipe } from '@angular/common';
import { TableComponent } from '../table.component';

@Component({
  selector: 'app-rooms-table',
  imports: [
    FiltersComponent,
    AsyncPipe,
    TitleCasePipe,
    NgForOf
  ],
  templateUrl: './rooms-table.component.html',
  standalone: true,
  styleUrl: '../../reception.component.css',
})
export class RoomsTableComponent extends TableComponent {
  rooms$: Observable<Room[]> | null = null;
  override filters: RoomFilter = {}

  constructor (private roomService: RoomService) {
    super();
  }

  override loadData () {
    this.rooms$ = this.roomService.getRooms(this.filters)
  }

}
