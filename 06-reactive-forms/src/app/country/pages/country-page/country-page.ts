import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Object as CountryItem } from '../../interfaces/country.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryService = inject(CountryService);
  formBuilder = inject(FormBuilder);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<CountryItem[]>([]);
  borders = signal<CountryItem[]>([]);

  myForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChange();
    const countrySubscription = this.onCountryChange();

    onCleanUp(() => {
      regionSubscription?.unsubscribe();
      countrySubscription?.unsubscribe();
    });
  });

  onRegionChange() {
    return this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.setValue('');
          this.myForm.get('border')?.setValue('');
          this.countriesByRegion.set([]);
          this.borders.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegions(region ?? '')),
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChange() {
    return this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.setValue('');
          this.borders.set([]);
        }),
        switchMap((alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
        switchMap((country) => this.countryService.getCountryNamesByCodes(country?.borders ?? [])),
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}
