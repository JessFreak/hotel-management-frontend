import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Reservation } from '../../../models/reservation.model';
import { ReservationsService } from '../../../services/reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgIf,
    DatePipe,
    NgForOf,
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor (
    private authService: AuthService,
    private reservationsService: ReservationsService,
    private router: Router,
  ) {}

  user: User | null = null;
  reservations: Reservation[] = [];

  ngOnInit (): void {
    this.authService.setUser();
    this.authService.user$.subscribe(user => {
      this.user = user;

      if (user) {
        this.loadReservations(user.id);
      }
    });
  }

  loadReservations (userId: string): void {
    this.reservationsService.getReservations({ clientId: userId })
      .subscribe({
        next: (reservations) => {
          this.reservations = reservations;
        },
      });
  }

  onReservationClick (id: string): void {
    this.router.navigate([`/reservations/${id}`]);
  }
}
