import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountrySearchInput } from '../../components/country-search-input/country-search-input';
import { CountryPageContainer } from '../../components/country-page-container/country-page-container';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, CountrySearchInput, CountryPageContainer],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  onSearch(value: string) {}
}
