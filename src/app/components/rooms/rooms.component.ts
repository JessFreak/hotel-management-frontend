import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomFilter, RoomService } from '../../services/rooms.service';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: 'rooms.component.html',
  styleUrl: 'rooms.component.css',
  standalone: true,
  imports: [
    NgForOf,
    TitleCasePipe,
    FormsModule,
  ],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  filters: RoomFilter = {
    capacity: null,
    comfortLevel: null,
    minPrice: null,
    maxPrice: null,
  };

  constructor (private roomService: RoomService) {}

  ngOnInit (): void {
    this.loadRooms();
  }

  loadRooms () {
    this.roomService.getRooms({ ...this.filters, isAvailable: true })
      .subscribe({
        next: (rooms) => {
          this.rooms = rooms;
        },
      });
  }

  applyFilters () {
    this.loadRooms();
  }

  clearFilters () {
    this.filters = {
      capacity: null,
      comfortLevel: null,
      minPrice: null,
      maxPrice: null,
    };
    this.loadRooms();
  }
}
