import { HttpParams } from '@angular/common/http';

export const getHttpParams = (filters: Object): HttpParams => {
  let params: HttpParams = new HttpParams();

  for (const [key, value] of Object.entries(filters)) {
    params = params.append(key, value.toString());
  }

  return params;
}
