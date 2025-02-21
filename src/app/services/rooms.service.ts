import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { RoomFilter } from '../models/room.filter';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private readonly baseUrl = `${environment.apiUrl}/rooms`;

  constructor (private http: HttpClient) {}

  getRooms (filters: RoomFilter): Observable<Room[]> {
    let params: HttpParams = new HttpParams();

    for (const [key, value] of Object.entries(filters)) {
      if (value != null) {
        params = params.append(key, value.toString());
      }
    }

    return this.http.get<Room[]>(this.baseUrl, { params });
  }
}
