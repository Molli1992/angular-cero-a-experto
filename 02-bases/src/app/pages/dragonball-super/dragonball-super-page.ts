import { Component, inject, signal } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add';
import { DragonballService } from '../../services/dragonball';
import { Character } from '../../interfaces/character';

@Component({
  templateUrl: './dragonball-super-page.html',
  imports: [CharacterList, CharacterAdd],
})
export class DragonballSuperPage {
  public dragonballService = inject(DragonballService);
}
