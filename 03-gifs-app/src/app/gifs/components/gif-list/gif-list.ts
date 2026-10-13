import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { GifListItem } from './components/gif-list-item/gif-list-item';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {
  gifs = input.required<Gif[]>();
  loadMore = output<void>();

  private sentinel = viewChild.required<ElementRef<HTMLDivElement>>('sentinel');
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && this.gifs().length > 0) this.loadMore.emit();
        },
        // Ask for the next page a bit before the user reaches the end
        { rootMargin: '0px 0px 600px 0px' },
      );
      this.observer.observe(this.sentinel().nativeElement);
    });

    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());

    // Observing again forces a fresh check: if the new page doesn't fill the screen,
    // the sentinel is still visible and another page is requested
    effect(() => {
      this.gifs();
      const element = this.sentinel().nativeElement;
      this.observer?.unobserve(element);
      this.observer?.observe(element);
    });
  }
}
