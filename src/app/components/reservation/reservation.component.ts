import { Component } from '@angular/core';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsVariantsComponent } from '../rooms/variants/rooms-variants.component';

@Component({
  selector: 'app-reservation',
  imports: [
    RoomsComponent,
    RoomsVariantsComponent
  ],
  templateUrl: './reservation.component.html',
  standalone: true,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {}
