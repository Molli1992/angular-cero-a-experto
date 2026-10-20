import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
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

  searchCountries(field: SearchField, query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLocaleLowerCase();

    return this.http
      .get<RESTCountry>(API_URL, {
        params: { [field]: lowerCaseQuery },
        headers: new HttpHeaders({
          Authorization: `Bearer ${environment.restCountriesApiKey}`,
        }),
      })
      .pipe(
        map(CountryMapper.mapRestCountriesToCountries),
        delay(1000),
        catchError((err) => {
          return throwError(() => new Error(err.error.errors[0].message));
        }),
      );
  }
}
