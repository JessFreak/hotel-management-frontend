import { Component, Input, OnInit } from '@angular/core';
import { Room, RoomFilter } from '../../models/room.model';
import { RoomService } from '../../services/rooms.service';
import { ActivatedRoute } from '@angular/router';
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
  filters: RoomFilter = {};
  @Input() selectRoom!: OmitThisParameter<(roomNumber: number) => void>;

  constructor (
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit (): void {
    this.route.queryParams.subscribe(params => {
      if (params['type']) {
        this.filters.comfortLevel = params['type'];
      }
      this.loadRooms();
    });
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
    this.filters = {};
    this.loadRooms();
  }
}
