import { Pipe, PipeTransform } from '@angular/core';
import { Creator, CreatorMap } from '../interfaces/hero-interface';

@Pipe({
  name: 'heroTextColorCreatorPipe',
})
export class HeroTextColorCreatorPipe implements PipeTransform {
  transform(value: Creator): string {
    return CreatorMap[value];
  }
}
