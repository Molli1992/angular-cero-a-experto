import { Pipe, PipeTransform } from '@angular/core';
import { Hero, SortBy } from '../interfaces/hero-interface';

@Pipe({
  name: 'heroSortByPipe',
})
export class HeroSortByPipe implements PipeTransform {
  transform(value: Hero[], sortBy: SortBy, reverse: boolean = false): Hero[] {
    if (!sortBy) return value;

    // 1 = ascending, -1 = descending
    const direction = reverse ? -1 : 1;

    switch (sortBy) {
      case 'name':
        return [...value].sort((a, b) => a.name.localeCompare(b.name) * direction);
      case 'canFly':
        return [...value].sort((a, b) => ((a.canFly ? 1 : -1) - (b.canFly ? 1 : -1)) * direction);
      case 'color':
        return [...value].sort((a, b) => (a.color - b.color) * direction);
      case 'creator':
        return [...value].sort((a, b) => (a.creator - b.creator) * direction);
      default:
        return value;
    }
  }
}
