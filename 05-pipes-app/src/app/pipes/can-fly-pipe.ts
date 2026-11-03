import { Pipe, PipeTransform } from '@angular/core';

type PipeReturn = 'Can fly' | "Can't fly";

@Pipe({
  name: 'canFlyPipe',
})
export class CanFlyPipe implements PipeTransform {
  transform(value: boolean): PipeReturn {
    return value ? 'Can fly' : "Can't fly";
  }
}
