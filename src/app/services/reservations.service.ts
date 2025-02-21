import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReservationPayload } from '../models/reservation.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private readonly baseUrl = `${environment.apiUrl}/reservations`;

  constructor (private http: HttpClient) {}

  makeReservation (reservationForm: ReservationPayload): Observable<{}> {
    return this.http.post(`${this.baseUrl}`, reservationForm);
  }
}
