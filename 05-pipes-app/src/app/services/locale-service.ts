import { Injectable, signal } from '@angular/core';
import { AvailableLocale } from '../interfaces/locale-types';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private currentLocale = signal<AvailableLocale>('en');

  constructor() {
    this.currentLocale.set((localStorage.getItem('locale') as AvailableLocale) ?? 'en');
  }

  get getLocale() {
    return this.currentLocale();
  }

  changeLocale(locale: AvailableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }
}
