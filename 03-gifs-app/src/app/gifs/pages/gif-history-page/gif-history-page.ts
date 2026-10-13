import { Component, computed, effect, inject, untracked } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifsService } from '../../services/gifs.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gif-history-page',
  imports: [GifList],
  templateUrl: './gif-history-page.html',
})
export default class GifHistoryPage {
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => (params['query'] as string).toLocaleLowerCase())),
  );
  gifsService = inject(GifsService);
  historyGifs = computed(() => this.gifsService.searchHistory()[this.query() ?? ''] ?? []);

  // The gifs already loaded (with all their pages) are reused; they're only fetched if missing
  queryEffect = effect(() => {
    const query = this.query();
    if (!query) return;
    if (untracked(() => this.gifsService.searchHistory()[query])) return;
    this.gifsService.searchGifs(query).subscribe();
  });

  onLoadMore() {
    const query = this.query();
    if (query) this.gifsService.loadMoreSearchGifs(query);
  }
}
