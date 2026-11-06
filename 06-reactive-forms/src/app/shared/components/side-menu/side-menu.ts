import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveRoute = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  reactiveMenu: MenuItem[] = reactiveRoute
    .filter((item) => item.path !== '**')
    .map((item) => {
      return {
        title: `${item.title}`,
        route: `reactive/${item.path}`,
      };
    });

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Countries',
      route: './country',
    },
  ];
}
