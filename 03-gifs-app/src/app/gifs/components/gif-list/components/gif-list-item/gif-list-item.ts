import { Component, DestroyRef, inject, input, signal } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
  host: { class: 'block mb-4 break-inside-avoid' },
})
export class GifListItem {
  imageUrl = input.required<string>();
  gifTitle = input.required<string>();
  width = input<number>();
  height = input<number>();

  linkCopied = signal(false);
  private copiedTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.copiedTimeout));
  }

  async onShare() {
    const data: ShareData = { title: this.gifTitle(), url: this.imageUrl() };

    // Opens the system share menu (WhatsApp, Telegram, mail, etc.) where it's supported
    if (navigator.share && navigator.canShare?.(data) !== false) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        // The user closed the share menu
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    // Fallback for browsers without the share menu: copy the link
    try {
      await navigator.clipboard.writeText(this.imageUrl());
      this.linkCopied.set(true);
      clearTimeout(this.copiedTimeout);
      this.copiedTimeout = setTimeout(() => this.linkCopied.set(false), 2000);
    } catch {
      window.open(this.imageUrl(), '_blank', 'noopener');
    }
  }
}
