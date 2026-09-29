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
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Gohan', power: 8000 },
    { id: 2, name: 'Piccolo', power: 4000 },
  ]);

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      alert('Invalid Fields');
    }

    const newCharacter: Character = {
      id: this.characters.length,
      name: this.name(),
      power: this.power(),
    };

    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
