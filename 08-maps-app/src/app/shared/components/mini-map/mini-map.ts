import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';
import { environment } from '../../../../environments/environment.development';

// mapbox-gl is loaded as a global script from angular.json ("scripts"),
// so that the bundler does not modify the code that is copied to the Web Worker.
declare const mapboxgl: typeof import('mapbox-gl');

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit {
  coordinates = input.required<LngLatLike>();
  zoom = input<number>(12);

  divElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()) return;
    const element = this.divElement()?.nativeElement;

    const newMap = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element,
      center: this.coordinates(),
      zoom: this.zoom(),
      interactive: false,
    });

    new mapboxgl.Marker({ draggable: false, color: '#000000' })
      .setLngLat(this.coordinates())
      .addTo(newMap);

    this.mapListeners(newMap);
  }

  mapListeners(map: Map) {
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
}
