import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reservation, ReservationDetails, ReservationFilters, ReservationPayload } from '../models/reservation.model';
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

  getReservations (filter: ReservationFilters): Observable<Reservation[]> {
    const params = getHttpParams(filter);

    return this.http.get<Reservation[]>(`${this.baseUrl}`, { params });
  }

  getReservationById (id: string): Observable<ReservationDetails> {
    return this.http.get<ReservationDetails>(`${this.baseUrl}/${id}`);
  }

  cancelReservation (id: string): Observable<{}> {
    return this.http.patch<{}>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
