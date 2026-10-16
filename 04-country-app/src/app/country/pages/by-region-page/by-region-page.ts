import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountryPageContainer } from '../../components/country-page-container/country-page-container';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList, CountryPageContainer],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {}
