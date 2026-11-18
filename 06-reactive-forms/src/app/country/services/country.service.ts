import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Country, Object as CountryItem } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = environment.countriesApiUrl;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.countriesApiKey}`,
  });
  http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegions(region: string): Observable<CountryItem[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}?region=${region}&response_fields=codes.alpha_3,names.common,borders&limit=100`;

    return this.http
      .get<Country>(url, { headers: this.headers })
      .pipe(map((resp) => resp.data.objects ?? null));
  }

  getCountryByAlphaCode(alphaCode: string): Observable<CountryItem | null> {
    if (!alphaCode) return of(null);

    const url = `${this.baseUrl}/codes.alpha_3?q=${alphaCode}&response_fields=codes.alpha_3,names.common,borders`;

    return this.http
      .get<Country>(url, { headers: this.headers })
      .pipe(map((resp) => resp.data.objects[0] ?? null));
  }

  getCountryNamesByCodes(countriesCodes: string[]): Observable<CountryItem[]> {
    if (!countriesCodes.length) return of([]);

    const requests = countriesCodes.map((code) => this.getCountryByAlphaCode(code));

    return forkJoin(requests).pipe(
      map((countries) => {
        return countries.filter((country): country is CountryItem => !!country);
      }),
    );
  }
}
