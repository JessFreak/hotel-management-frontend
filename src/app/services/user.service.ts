import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserFilters } from '../models/user.model';
import { getHttpParams } from '../utils/getHttpParams';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor (private http: HttpClient) {}

  getUsers(filter: UserFilters): Observable<User[]> {
    const params = getHttpParams(filter);

    return this.http.get<User[]>(this.baseUrl, { params });
  }

}
