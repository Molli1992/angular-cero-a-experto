import { Component, computed, signal } from '@angular/core';
// import { NgClass } from '@angular/common';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.html',
  // imports: [NgClass],
})
export class DragonballPage {
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9500 },
    { id: 2, name: 'Vegeta', power: 8500 },
    { id: 3, name: 'piccolo', power: 3000 },
    { id: 4, name: 'Yamcha', power: 500 },
  ]);

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });
}
