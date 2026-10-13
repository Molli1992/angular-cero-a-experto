export interface Gif {
  id: string;
  title: string;
  url: string;
  // Optional because gifs saved in localStorage before these fields existed don't have them
  width?: number;
  height?: number;
}
