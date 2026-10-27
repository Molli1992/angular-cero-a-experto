import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  host: {
    class: 'break-inside-avoid block',
  },
})
export class Card {
  title = input.required<string>();
}
