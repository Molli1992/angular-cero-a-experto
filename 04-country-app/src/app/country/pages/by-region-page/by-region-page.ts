import { Component, inject, linkedSignal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountryPageContainer } from '../../components/country-page-container/country-page-container';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interfaces';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string | null): Region | null {
  if (!queryParam) return null;

  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    america: 'America',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam];
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList, CountryPageContainer],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? null;
  selectedRegion = linkedSignal<Region | null>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource<Country[], { region: Region | null }>({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
        },
      });
      return this.countryService.searchCountries('region', params.region ?? '');
    },
  });
}
