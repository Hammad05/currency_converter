import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConvertResponse, GetSupportedCurrenciesResponse } from './types';
import { Option } from '../components/dropdown/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    apiKey: 'cur_live_ZkxOpdJ3SuQnv0RY4nzzdUOwvDW9VHsdmJMHTYlg',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private apiUrl = 'https://api.currencyapi.com/v3';

  constructor(private http: HttpClient) {}

  getConversion(
    value: number,
    from: string,
    to: string
  ): Observable<{
    value: number;
    perUnit: number;
  }> {
    return this.http.get<ConvertResponse>(`${this.apiUrl}/latest`, {
      ...httpOptions,
      params: {
        base_currency: from,
        currencies: to,
      },
    }).pipe(map(response => ({
      value: response.data[to].value * value,
      perUnit: response.data[to].value
    })), catchError(error => throwError(() => error)));
  }
  getSupportedCurrencyOptions(): Observable<Option[]> {
    return this.http.get<GetSupportedCurrenciesResponse>(`${this.apiUrl}/currencies`, {
      ...httpOptions,
    }).pipe(
      map(response => {
        return Object.values(response.data).map(entry => {
          return {
            label: `${entry.code} - ${entry.name}`,
            value: entry.code,
          };
        })
      }),
      catchError(error => throwError(() => error))
    )
  }
}


