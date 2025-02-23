import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Discount, DiscountPayload } from '../models/discount.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountsService {
  private readonly baseUrl = `${environment.apiUrl}/discounts`;

  constructor (private http: HttpClient) {}

  getDiscounts (): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.baseUrl}`);
  }

  createDiscount (discount: DiscountPayload): Observable<Discount> {
    return this.http.post<Discount>(`${this.baseUrl}`, discount);
  }

  updateDiscount (id: string, discount: DiscountPayload): Observable<Discount> {
    return this.http.patch<Discount>(`${this.baseUrl}/${id}`, discount);
  }

  deleteDiscount (id: string): Observable<Discount> {
    return this.http.delete<Discount>(`${this.baseUrl}/${id}`);
  }
}
