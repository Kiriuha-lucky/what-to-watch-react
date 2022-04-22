import { Film } from './film.types';
import { ReviewType } from './review.types';

export interface FilmPage {
  currentFilm: Film,
  reviews: ReviewType[],
  similarFilms: Film[],
}
