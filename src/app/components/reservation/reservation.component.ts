import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsVariantsComponent } from '../rooms/variants/rooms-variants.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reservation',
  imports: [
    RoomsComponent,
    RoomsVariantsComponent,
    NgIf,
  ],
  templateUrl: './reservation.component.html',
  standalone: true,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit{
  showRooms: boolean = false;
  roomNumber: number | null = null;

  @ViewChild('roomInput') roomInput: any;

  ngAfterViewInit() {
    if (this.roomInput) {
      this.roomInput.nativeElement.value = this.roomNumber;
    }
  }

  onRoomInputFocus() {
    this.showRooms = true;
  }

  setRoomNumber(roomNumber: number) {
    this.roomNumber = roomNumber;
    this.showRooms = false;

    if (this.roomInput) {
      this.roomInput.nativeElement.value = roomNumber;
    }
  }
}
