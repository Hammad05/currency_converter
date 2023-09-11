import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ConvertResponse,
  GetSupportedCurrenciesResponse,
  HistoricalRange,
} from './types';
import { Option } from '../components/dropdown/types';
import { format, getYear, isLastDayOfMonth, lastDayOfMonth } from 'date-fns';
import { config } from '../components/header/config';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    apiKey: environment.apiKey,
  }),
};

type ConvertedValue = {
  code: string;
  value: number;
  perUnit: number;
};

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getConversion(
    value: number,
    from: string,
    to: string,
  ): Observable<{
    target: ConvertedValue;
    others: ConvertedValue[];
  }> {
    return this.http
      .get<ConvertResponse>(`${this.apiUrl}/latest`, {
        ...httpOptions,
        params: {
          base_currency: from,
          currencies: [to, ...config.popularCurrencyCodes].join(','),
        },
      })
      .pipe(
        map((response) => {
          let target = {
            code: to,
            value: response.data[to].value * value,
            perUnit: Number(response.data[to].value.toFixed(2)),
          };
          let others: ConvertedValue[] = [];
          Object.keys(response.data).forEach((key) => {
            if (response.data[key].code !== to) {
              others.push({
                code: key,
                value: response.data[key].value * value,
                perUnit: Number(response.data[key].value.toFixed(2)),
              });
            }
          });
          return {
            target: target,
            others: others,
          };
        }),
        catchError((error) => throwError(() => error)),
      );
  }
  getSupportedCurrencyOptions(): Observable<Option[]> {
    return this.http
      .get<GetSupportedCurrenciesResponse>(`${this.apiUrl}/currencies`, {
        ...httpOptions,
      })
      .pipe(
        map((response) => {
          return Object.values(response.data).map((entry) => {
            return {
              label: `${entry.code} - ${entry.name}`,
              value: entry.code,
            };
          });
        }),
        catchError((error) => throwError(() => error)),
      );
  }

  getLastYearHistoricalData(
    from: string,
    to: string,
  ): Observable<HistoricalRange[]> {
    const lastYear = getYear(Date.now()) - 1;
    const httpCalls = [];
    for (let i = 1; i <= 12; i++) {
      httpCalls.push(
        this.http.get<HistoricalRange>(`${this.apiUrl}/historical`, {
          ...httpOptions,
          params: {
            date: `${lastYear}-${i}-${lastDayOfMonth(
              new Date(lastYear, i - 1),
            ).getDate()}`,
            base_currency: from,
            currencies: to,
          },
        }),
      );
    }
    return forkJoin(httpCalls);
  }
}
