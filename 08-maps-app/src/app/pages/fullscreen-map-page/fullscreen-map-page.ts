import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import type { Map } from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { DecimalPipe, JsonPipe } from '@angular/common';

// mapbox-gl is loaded as a global script from angular.json ("scripts"),
// so that the bundler does not modify the code that is copied to the Web Worker.
declare const mapboxgl: typeof import('mapbox-gl');

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: calc(100vw - 32px);
      height: calc(100vh - 100px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 40px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2ebf0;
      width: 250px;
    }
  `,
})
export class FullscreenMapPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);
  zoom = signal(14);
  coordinates = signal({
    lat: -71.06776,
    lng: 42.35816,
  });

  zoomEffect = effect(() => {
    if (!this.map) return;

    this.map()?.setZoom(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    const element = this.divElement()?.nativeElement;
    const { lng, lat } = this.coordinates();

    const newMap = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element,
      center: [lat, lng],
      zoom: this.zoom(),
    });

    this.mapListeners(newMap);
  }

  mapListeners(map: Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    this.map.set(map);
  }
}
