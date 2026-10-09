import { Component, effect, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history-page',
  imports: [GifList],
  templateUrl: './gif-history-page.html',
})
export default class GifHistoryPage {
  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));
  gifsService = inject(GifsService);
  historyGifs = signal<Gif[]>([]);

  queryEffect = effect(() => {
    const query = this.query();
    if (!query) return;
    this.getHistoryGifs(query);
  });

  getHistoryGifs(query: string) {
    this.gifsService.searchGifs(query).subscribe((resp) => {
      this.historyGifs.set(resp);
    });
  }
}
