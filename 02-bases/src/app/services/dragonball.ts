import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character';

const loadFromLocalStorage = (): Character[] => {
  const storageCharacters = localStorage.getItem('characters');
  const characters = storageCharacters ? JSON.parse(storageCharacters) : [];

  return characters;
};

@Injectable({ providedIn: 'root' })
export class DragonballService {
  characters = signal<Character[]>(loadFromLocalStorage());

  savetoLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(newCharacter: Character) {
    this.characters.update((list) => [...list, newCharacter]);
  }
}
