import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero-interface';
import { retry } from 'rxjs';

@Pipe({
  name: 'heroFilterPipe',
})
export class HeroFilterPipe implements PipeTransform {
  transform(value: Hero[], searchQuery: string): Hero[] {
    if (!searchQuery) return value;

    searchQuery = searchQuery.toLocaleLowerCase();

    return value.filter((hero) => {
      return hero.name.toLocaleLowerCase().includes(searchQuery);
    });
  }
}
