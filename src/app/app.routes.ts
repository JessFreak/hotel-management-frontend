import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reservations/:id', component: ReservationDetailsComponent },
  { path: '**', redirectTo: '' },
];
