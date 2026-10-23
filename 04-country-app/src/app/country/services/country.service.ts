import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mappers';
import { Country, SearchField } from '../interfaces/country.interfaces';

const API_URL = `${environment.restCountriesUrl}/countries/v5`;

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountries = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchCountries(field: SearchField, query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLocaleLowerCase();

    if (!lowerCaseQuery) {
      return of([]);
    }

    if (field === 'capitals' && this.queryCacheCapital.has(lowerCaseQuery)) {
      return of(this.queryCacheCapital.get(lowerCaseQuery) ?? []);
    }

    if (field === 'names.common' && this.queryCacheCountries.has(lowerCaseQuery)) {
      return of(this.queryCacheCountries.get(lowerCaseQuery) ?? []);
    }

    if (field === 'codes.alpha_3' && this.queryCacheCountry.has(lowerCaseQuery)) {
      return of(this.queryCacheCountry.get(lowerCaseQuery) ?? []);
    }

    if (field === 'region' && this.queryCacheRegion.has(lowerCaseQuery)) {
      return of(this.queryCacheRegion.get(lowerCaseQuery) ?? []);
    }

    return this.http
      .get<RESTCountry>(API_URL, {
        params: { [field]: lowerCaseQuery },
        headers: new HttpHeaders({
          Authorization: `Bearer ${environment.restCountriesApiKey}`,
        }),
      })
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        tap((countries) => {
          if (field === 'capitals') {
            this.queryCacheCapital.set(lowerCaseQuery, countries);
          }

          if (field === 'names.common') {
            this.queryCacheCountries.set(lowerCaseQuery, countries);
          }

          if (field === 'codes.alpha_3') {
            this.queryCacheCountry.set(lowerCaseQuery, countries);
          }

          if (field === 'region') {
            this.queryCacheRegion.set(lowerCaseQuery, countries);
          }
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.errors[0].message));
        }),
      );
  }
}
