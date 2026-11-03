import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { ToggleCasePipe } from '../../pipes/toggle-case-pipe';
import { heroes } from '../../data/heroes-data';
import { CanFlyPipe } from '../../pipes/can-fly-pipe';
import { HeroColorPipe } from '../../pipes/hero-color-pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color-pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/hero-creator-pipe';
import { HeroTextColorCreatorPipe } from '../../pipes/hero-text-color-creator-pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by-pipe';
import { SortBy } from '../../interfaces/hero-interface';
import { HeroFilterPipe } from '../../pipes/hero-filter-pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    Header,
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroTextColorCreatorPipe,
    HeroSortByPipe,
    HeroFilterPipe,
  ],
  templateUrl: './custom-page.html',
})
export default class CustomPage {
  name = signal('Felipe Blaksley');
  upperCase = signal(true);
  heroes = signal(heroes);
  sortBy = signal<SortBy>(null);
  sortReverse = signal(false);
  searchQuery = signal('');

  toggleUpperCaseSignal() {
    const value = this.upperCase() ? false : true;
    this.upperCase.set(value);
  }

  changeSortBy(value: SortBy) {
    if (this.sortBy() === value) {
      this.sortReverse.set(!this.sortReverse());
      return;
    }

    this.sortBy.set(value);
    this.sortReverse.set(false);
  }
}
