import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format, getYear, lastDayOfMonth } from 'date-fns';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Option } from '../components/dropdown/types';
import { config } from '../components/header/config';
import {
  ConvertedValue,
  ConvertResponse,
  GetSupportedCurrenciesResponse,
  HistoricalRange,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves conversion data for a given value from one currency to another.
   *
   * @param value The value to be converted.
   * @param from The source currency code.
   * @param to The target currency code.
   * @returns An Observable containing conversion information.
   */
  getConversion(
    value: number,
    from: string,
    to: string
  ): Observable<{
    target: ConvertedValue;
    others: ConvertedValue[];
  }> {
    const params = new HttpParams()
      .set('base_currency', from)
      .set('currencies', [to, ...config.popularCurrencyCodes].join(','));

    return this.http
      .get<ConvertResponse>(`${this.apiUrl}/latest`, {
        headers: this.getHeaders(),
        params: params,
      })
      .pipe(
        map(response => {
          const target = {
            code: to,
            value: response.data[to].value * value,
            perUnit: Number(response.data[to].value.toFixed(2)),
          };

          const others: ConvertedValue[] = [];
          config.popularCurrencyCodes.forEach(code => {
            others.push({
              code: code,
              value: response.data[code].value * value,
              perUnit: Number(response.data[code].value.toFixed(2)),
            });
          });
          return {
            target: target,
            others: others,
          };
        }),
        catchError(error => throwError(() => error))
      );
  }

  /**
   * Retrieves a list of supported currency options.
   *
   * @returns An Observable containing a list of currency options.
   */
  getSupportedCurrencyOptions(): Observable<Option[]> {
    return this.http
      .get<GetSupportedCurrenciesResponse>(`${this.apiUrl}/currencies`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map(response => {
          return Object.values(response.data).map(entry => {
            return {
              label: `${entry.code} - ${entry.name}`,
              value: entry.code,
            };
          });
        }),
        catchError(error => throwError(() => error))
      );
  }

  /**
   * Retrieves historical data for a given currency pair for each month of the last year.
   *
   * @param from The source currency code.
   * @param to The target currency code.
   * @returns An Observable containing historical data for each month.
   */
  getLastYearHistoricalData(
    from: string,
    to: string
  ): Observable<HistoricalRange[]> {
    const lastYear = getYear(Date.now()) - 1;
    const httpCalls = [];

    for (let i = 1; i <= 12; i++) {
      const endDate = lastDayOfMonth(new Date(lastYear, i - 1)).getDate();
      const date = `${lastYear}-${i}-${endDate}`;

      const params = new HttpParams()
        .set('date', date)
        .set('base_currency', from)
        .set('currencies', to);

      httpCalls.push(
        this.http.get<HistoricalRange>(`${this.apiUrl}/historical`, {
          headers: this.getHeaders(),
          params: params,
        })
      );
    }

    return forkJoin(httpCalls);
  }

  /**
   * Returns the HTTP headers including the API key.
   *
   * @returns HttpHeaders with the API key.
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      apiKey: environment.apiKey,
    });
  }
}
