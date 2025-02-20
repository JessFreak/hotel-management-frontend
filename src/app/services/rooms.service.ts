import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

export interface RoomFilter {
  capacity?: number | null;
  comfortLevel?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  isAvailable?: boolean;
}

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

    console.log(params.toString());
    return this.http.get<Room[]>(this.baseUrl, { params });
  }
}
