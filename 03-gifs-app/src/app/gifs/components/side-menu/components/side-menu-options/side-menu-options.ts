import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../../../services/gifs.service';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {
  gifsService = inject(GifsService);
  private router = inject(Router);

  menuOptions: MenuOption[] = [
    {
      label: 'treding',
      subLabel: 'Popular Gifs',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Search',
      subLabel: 'Search Gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    },
  ];

  onRemoveHistory(event: MouseEvent, key: string) {
    event.preventDefault();
    event.stopPropagation();

    const isActive = this.router.url === `/dashboard/history/${encodeURIComponent(key)}`;
    this.gifsService.removeFromHistory(key);

    if (isActive) this.router.navigateByUrl('/dashboard/trending');
  }
}
