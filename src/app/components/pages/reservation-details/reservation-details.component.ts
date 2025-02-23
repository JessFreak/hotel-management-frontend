import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../../../services/reservations.service';
import { ReservationDetails } from '../../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-reservation-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-details.component.html',
  standalone: true,
  styleUrl: './reservation-details.component.css',
})
export class ReservationDetailsComponent implements OnInit {
  reservation$: Observable<ReservationDetails> | null = null;
  user: User | null = null;
  id: string | null = null;
  editingStatus: boolean = false;
  newStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private reservationsService: ReservationsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadReservation();

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
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

  changeStatus() {
    this.editingStatus = true;
    this.reservation$?.subscribe((details) => {
      if (details) {
        this.newStatus = details.reservation.status;
      }
    });
  }

  saveStatus() {
    if (this.id) {
      this.reservationsService.updateReservationStatus(this.id, this.newStatus).subscribe({
        next: () => {
          this.editingStatus = false;
          this.newStatus = '';
          this.loadReservation();
        },
      });
    }
  }
}
