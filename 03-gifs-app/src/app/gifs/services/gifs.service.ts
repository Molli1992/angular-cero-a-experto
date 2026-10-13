import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gifs.interfaces';
import { GifMapper } from '../mappers/gif.mapper';
import { finalize, map, tap } from 'rxjs';

const GIF_KEY = 'gifs';
const PAGE_SIZE = 30;

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  try {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY);
    return gifsFromLocalStorage ? JSON.parse(gifsFromLocalStorage) : {};
  } catch {
    return {};
  }
};

// Giphy can repeat gifs between pages, so only the ones not already loaded are added.
// If nothing is new, the same array is returned so the signal doesn't change.
const appendNewGifs = (current: Gif[], next: Gif[]): Gif[] => {
  const ids = new Set(current.map((gif) => gif.id));
  const newGifs = next.filter((gif) => !ids.has(gif.id));
  return newGifs.length ? [...current, ...newGifs] : current;
};

@Injectable({ providedIn: 'root' })
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  // Next offset to request. It's not the number of loaded gifs, because repeated ones are filtered out
  private trendingOffset = 0;
  private searchOffsets = new Map<string, number>();
  // Queries with a page request in flight, to avoid asking for the same page twice
  private loadingQueries = new Set<string>();

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyApiUrl}/trending`, {
        params: {
          api_key: `${environment.giphyApiKey}`,
          limit: PAGE_SIZE,
          offset: this.trendingOffset,
        },
      })
      .pipe(finalize(() => this.trendingGifsLoading.set(false)))
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
        this.trendingOffset += gifs.length;
        this.trendingGifs.update((current) => appendNewGifs(current, gifs));
      });
  }

  searchGifs(query: string) {
    const key = query.trim().toLocaleLowerCase();
    return this.fetchSearchPage(key, 0).pipe(
      // History
      tap((items) => {
        this.searchOffsets.set(key, items.length);
        this.searchHistory.update((history) => ({
          ...history,
          [key]: items,
        }));
      }),
    );
  }

  loadMoreSearchGifs(query: string) {
    const key = query.toLocaleLowerCase();
    const current = this.searchHistory()[key];
    if (!current || this.loadingQueries.has(key)) return;

    // Gifs restored from localStorage don't have an offset yet
    const offset = this.searchOffsets.get(key) ?? current.length;

    this.loadingQueries.add(key);
    this.fetchSearchPage(key, offset)
      .pipe(finalize(() => this.loadingQueries.delete(key)))
      .subscribe((items) => {
        this.searchOffsets.set(key, offset + items.length);
        this.searchHistory.update((history) =>
          // The query may have been removed from the history while the request was in flight
          history[key] ? { ...history, [key]: appendNewGifs(history[key], items) } : history,
        );
      });
  }

  removeFromHistory(key: string) {
    this.searchOffsets.delete(key);
    this.searchHistory.update((history) => {
      const { [key]: _, ...rest } = history;
      return rest;
    });
  }

  private fetchSearchPage(query: string, offset: number) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyApiUrl}/search`, {
        params: {
          api_key: `${environment.giphyApiKey}`,
          limit: PAGE_SIZE,
          offset,
          q: query,
        },
      })
      .pipe(map((resp) => GifMapper.mapGiphyItemToGifArray(resp.data)));
  }
}
