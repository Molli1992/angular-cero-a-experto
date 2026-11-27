import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import type { LngLatLike, Map, MapMouseEvent, Marker } from 'mapbox-gl';
import { environment } from '../../../environments/environment.development';
import { v4 as UUIDV4 } from 'uuid';
import { JsonPipe } from '@angular/common';

// mapbox-gl is loaded as a global script from angular.json ("scripts"),
// so that the bundler does not modify the code that is copied to the Web Worker.
declare const mapboxgl: typeof import('mapbox-gl');

interface MarkerInterface {
  id: string;
  mapboxMarker: Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);

  initialCoordinate: LngLatLike = [-57.942036, -34.910296];
  markers = signal<MarkerInterface[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()) return;
    const element = this.divElement()?.nativeElement;

    const newMap = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element,
      center: this.initialCoordinate,
      zoom: 14,
    });

    this.mapListeners(newMap);
  }

  mapListeners(map: Map) {
    map.on('click', (event) => {
      this.mapClick(event);
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }

  mapClick(event: MapMouseEvent) {
    const map = this.map();
    if (!map) return;

    const cords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));

    const mapboxMarker = new mapboxgl.Marker({ draggable: false, color: color })
      .setLngLat(cords)
      .addTo(map);

    const newMarker: MarkerInterface = {
      id: UUIDV4(),
      mapboxMarker: mapboxMarker,
    };

    this.markers.update((markers) => [newMarker, ...markers]);
  }

  flyToMarker(lngLat: LngLatLike) {
    const map = this.map();
    if (!map) return;

    map.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: MarkerInterface) {
    const map = this.map();
    if (!map) return;

    marker.mapboxMarker.remove();
    this.markers.update((markers) => markers.filter((m) => m.id !== marker.id));
  }
}
