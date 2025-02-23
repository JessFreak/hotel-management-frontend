import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../../../../models/reservation.model';
import { TableComponent } from '../table.component';
import { ReservationsService } from '../../../../../services/reservations.service';
import { AsyncPipe, DatePipe, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomsFilterComponent } from '../../filters/rooms-filters/rooms-filters.component';
import { ReservationsFiltersComponent } from '../../filters/reservations-filters/reservations-filters.component';

@Component({
  selector: 'app-reservations-table',
  imports: [
    TitleCasePipe,
    DatePipe,
    RouterLink,
    AsyncPipe,
    NgForOf,
    RoomsFilterComponent,
    ReservationsFiltersComponent,
    NgIf
  ],
  templateUrl: './reservations-table.component.html',
  standalone: true,
  styleUrl: '../../reception.component.css',
})
export class ReservationsTableComponent extends TableComponent {
  reservations$: Observable<Reservation[]> | null = null;

  constructor (private reservationsService: ReservationsService) {
    super();
  }

  override loadData () {
    this.reservations$ = this.reservationsService.getReservations(this.filters);
  }
}
