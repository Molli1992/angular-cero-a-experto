import { Component, input } from '@angular/core';
import { GifListItem } from './components/gif-list-item/gif-list-item';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {
  gifs = input.required<Gif[]>();
}
