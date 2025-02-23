import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Room, RoomFilter } from '../models/room.model';
import { getHttpParams } from './utils';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly baseUrl = `${environment.apiUrl}/rooms`;

  constructor (private http: HttpClient) {}

  getRooms (filters: RoomFilter): Observable<Room[]> {
    const params = getHttpParams(filters);

    return this.http.get<Room[]>(this.baseUrl, { params });
  }

  updateRoom (roomNumber: number, room: Room): Observable<Room> {
    return this.http.patch<Room>(`${this.baseUrl}/${roomNumber}`, room);
  }
}
