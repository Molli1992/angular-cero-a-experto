import { ChangeDetectionStrategy, Component, inject, LOCALE_ID, signal } from '@angular/core';
import { LocaleService } from '../../services/locale-service';
import { AvailableLocale } from '../../interfaces/locale-types';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  localeService = inject(LocaleService);
  currentLocal = signal(inject(LOCALE_ID));

  changeLocale(locale: AvailableLocale) {
    this.localeService.changeLocale(locale);
  }
}
