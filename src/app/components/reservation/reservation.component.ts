import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsVariantsComponent } from '../rooms/variants/rooms-variants.component';
import { NgIf } from '@angular/common';
import { ReservationPayload } from '../../models/reservation.payload';
import { FormsModule } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [
    RoomsComponent,
    RoomsVariantsComponent,
    NgIf,
    FormsModule,
  ],
  templateUrl: './reservation.component.html',
  standalone: true,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit {
  showRooms: boolean = false;
  reservation: ReservationPayload = {
    roomNumber: null,
    checkIn: null,
    note: null,
  };

  today: string = new Date().toISOString().split('T')[0];

  @ViewChild('roomInput') roomInput: ElementRef | null = null;

  constructor (
    private reservationsService: ReservationsService,
    private router: Router,
  ) {}

  ngAfterViewInit () {
    if (this.roomInput) {
      this.roomInput.nativeElement.value = this.reservation.roomNumber;
    }
  }

  updateMinCheckOut() {
    if (this.reservation.checkIn) {
      this.reservation.checkOut = this.reservation.checkOut &&
      this.reservation.checkOut < this.reservation.checkIn
        ? null
        : this.reservation.checkOut;
    }
  }

  onRoomInputClick () {
    this.showRooms = true;
  }

  setRoomNumber (roomNumber: number) {
    this.reservation.roomNumber = roomNumber;
    this.showRooms = false;

    if (this.roomInput) {
      this.roomInput.nativeElement.value = roomNumber;
    }
  }

  onSubmit () {
    this.reservationsService.makeReservation(this.reservation).subscribe({
      next: () => { this.router.navigate(['/profile']); },
    });
  }
}
