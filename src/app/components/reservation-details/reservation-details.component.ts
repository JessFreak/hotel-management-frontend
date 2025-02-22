import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { ReservationDetails } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservation-details',
  imports: [CommonModule],
  templateUrl: './reservation-details.component.html',
  standalone: true,
  styleUrl: './reservation-details.component.css',
})
export class ReservationDetailsComponent implements OnInit {
  reservation$: Observable<ReservationDetails> | null = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private reservationsService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.loadReservation();
    }
  }

  loadReservation() {
    if (this.id) {
      this.reservation$ = this.reservationsService.getReservationById(this.id);
    }
  }

  cancelReservation() {
    if (this.id) {
      this.reservationsService.cancelReservation(this.id).subscribe({
        next: () => {
          this.loadReservation();
        },
      });
    }
  }
}
