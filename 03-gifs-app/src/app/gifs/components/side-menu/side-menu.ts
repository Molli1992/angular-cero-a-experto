import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { SideMenuHeader } from './components/side-menu-header/side-menu-header';
import { SideMenuOptions } from './components/side-menu-options/side-menu-options';

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeader, SideMenuOptions],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  // Only matters on small screens; from sm up the menu is always visible
  isOpen = signal(false);

  constructor() {
    // Close the menu after choosing an option, so the gifs are visible
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.isOpen.set(false));
  }

  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
