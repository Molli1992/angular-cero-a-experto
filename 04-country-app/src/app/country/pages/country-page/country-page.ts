import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-country-page',
  imports: [DecimalPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryService = inject(CountryService);
  countryCode: string = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource<Country[], { code: string }>({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => this.countryService.searchCountries('codes.alpha_3', params.code),
  });
}
