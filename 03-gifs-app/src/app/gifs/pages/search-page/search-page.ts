import { Component, computed, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifsService = inject(GifsService);
  // Lives in the component, so leaving the route and coming back starts from scratch
  query = signal('');
  gifs = computed(() => (this.query() ? (this.gifsService.searchHistory()[this.query()] ?? []) : []));

  onSearch(query: string) {
    const key = query.trim().toLocaleLowerCase();
    if (!key) return;
    this.query.set(key);
    this.gifsService.searchGifs(key).subscribe();
  }

  onLoadMore() {
    if (this.query()) this.gifsService.loadMoreSearchGifs(this.query());
  }
}
