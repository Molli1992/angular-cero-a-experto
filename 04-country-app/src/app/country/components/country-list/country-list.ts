import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input.required<Country[]>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
  errorMessage = input<string | unknown | null>();
}
