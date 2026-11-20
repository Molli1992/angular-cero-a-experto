import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
})
export class Title implements OnChanges {
  title = input.required<string>();
  title2 = input.required<string>();
  title3 = input.required<string>();
  title4 = input.required<string>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges:');

    for (const [name, change] of Object.entries(changes)) {
      console.log(`--- ${name} ---`);
      console.log(`Previous: ${change.previousValue}`);
      console.log(`Current: ${change.currentValue}`);
      console.log(`Is first: ${change.firstChange}`);
    }
  }
}
