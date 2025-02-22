import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ReservationDetailsComponent } from './components/pages/reservation-details/reservation-details.component';
import { ReceptionComponent } from './components/pages/reception/reception.component';
import { ReceptionGuard } from './services/reception.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reservations/:id', component: ReservationDetailsComponent },
  { path: 'reception', component: ReceptionComponent, canActivate: [ReceptionGuard] },
  { path: '**', redirectTo: '' },
];
