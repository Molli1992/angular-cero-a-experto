import { Component, inject, linkedSignal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryPageContainer } from '../../components/country-page-container/country-page-container';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList, CountrySearchInput, CountryPageContainer],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource<Country[], { query: string }>({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query,
        },
      });
      return this.countryService.searchCountries('names.common', params.query);
    },
  });
}
