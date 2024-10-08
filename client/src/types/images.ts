import { LanguageCode } from "./language";

export type Image = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: LanguageCode;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type ImageResult = {
  backdrops: Image[];
  id: number;
  logos: Image[];
  posters: Image[];
};
