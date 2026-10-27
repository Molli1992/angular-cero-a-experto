import { ChangeDetectionStrategy, Component, inject, LOCALE_ID, signal } from '@angular/core';
import { LocalService } from '../../services/localService';
import { AvailableLocale } from '../../interfaces/localeTypes';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  localService = inject(LocalService);
  currentLocal = signal(inject(LOCALE_ID));

  changeLocale(locale: AvailableLocale) {
    this.localService.changeLocale(locale);
  }
}
