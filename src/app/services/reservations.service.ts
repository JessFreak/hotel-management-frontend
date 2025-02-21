import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reservation, ReservationFilter, ReservationPayload } from '../models/reservation.model';
import { Observable } from 'rxjs';
import { getHttpParams } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private readonly baseUrl = `${environment.apiUrl}/reservations`;

  constructor (private http: HttpClient) {}

  makeReservation (reservationForm: ReservationPayload): Observable<{}> {
    return this.http.post(`${this.baseUrl}`, reservationForm);
  }

  getReservations (filter: ReservationFilter): Observable<Reservation[]> {
    const params = getHttpParams(filter);

    return this.http.get<Reservation[]>(`${this.baseUrl}`, { params });
  }
}
