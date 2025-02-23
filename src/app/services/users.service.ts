import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserFilters } from '../models/user.model';
import { getHttpParams } from '../utils/getHttpParams';
import { Discount } from '../models/discount.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor (private http: HttpClient) {}

  getUsers (filter: UserFilters): Observable<User[]> {
    const params = getHttpParams(filter);

    return this.http.get<User[]>(this.baseUrl, { params });
  }

  getUsersDiscounts (userId: string): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.baseUrl}/${userId}/discounts`);
  }

  addDiscountToUser (userId: string, discountId: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userId}/discounts?discountId=${discountId}`, {});
  }
}
