export interface Country {
  code: string;
  emoji: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
}

export type SearchField = 'capitals' | 'names.common' | 'codes.alpha_3';
