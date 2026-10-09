import { Gif } from '../interfaces/gifs.interfaces';
import { GiphyItem } from '../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.id,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemToGifArray(items: GiphyItem[]): Gif[] {
    return items.map((item) => this.mapGiphyItemToGif(item));
  }
}
