import { afterNextRender, Component, ElementRef, inject, Injector, viewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideMenu } from '../../components/side-menu/side-menu';
@Component({
  selector: 'gifs-dashboard-page',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage {
  private router = inject(Router);
  private injector = inject(Injector);
  private scrollContainer = viewChild.required<ElementRef<HTMLDivElement>>('scrollContainer');

  // Scroll position of each url, to put the user back where they left off
  private scrollPositions = new Map<string, number>();

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      // router.url is still the url being left
      if (event instanceof NavigationStart) {
        this.scrollPositions.set(this.router.url, this.scrollContainer().nativeElement.scrollTop);
      }

      // Wait for the new page to render so there is content to scroll to
      if (event instanceof NavigationEnd) {
        afterNextRender(
          () => {
            this.scrollContainer().nativeElement.scrollTop =
              this.scrollPositions.get(event.urlAfterRedirects) ?? 0;
          },
          { injector: this.injector },
        );
      }
    });
  }
}
