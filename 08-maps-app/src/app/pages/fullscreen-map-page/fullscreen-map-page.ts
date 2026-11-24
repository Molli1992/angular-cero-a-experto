import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import type { Map } from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';

// mapbox-gl is loaded as a global script from angular.json ("scripts"),
// so that the bundler does not modify the code that is copied to the Web Worker.
declare const mapboxgl: typeof import('mapbox-gl');

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: calc(100vw - 32px);
      height: calc(100vh - 100px);
    }
  `,
})
export class FullscreenMapPage implements AfterViewInit, OnDestroy {
  divElement = viewChild<ElementRef>('map');
  map: Map | null = null;

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;

    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element,
      center: [-71.06776, 42.35816],
      zoom: 9,
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
