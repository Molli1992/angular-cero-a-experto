import { Component, inject, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryPageContainer } from '../../components/country-page-container/country-page-container';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interfaces';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList, CountrySearchInput, CountryPageContainer],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchCountries('names.common', params.query);
    },
  });
}
