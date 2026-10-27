import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',
})
export default class BasicPage {
  nameUpper = signal('FELIPE');
  nameLower = signal('tobias');
  fullName = signal('fELipe blakSleY');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanUp) => {
    const intervale = setInterval(() => {
      this.customDate.set(new Date());
    }, 1000);

    onCleanUp(() => {
      clearInterval(intervale);
    });
  });
}
