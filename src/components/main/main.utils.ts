import { Film } from '../../types/film.types';

export function setGenres(films: Film[]): string[] {
  const genres = ['All genres'];
  films.map((film) => genres.includes(film.genre) ? '' : genres.push(film.genre));
  return genres;
}

export function setCurrentFilms(films: Film[], genre = 'All genres'): Film[] {
  if (genre === 'All genres') {
    return films;
  }
  return films.filter((film) => film.genre === genre);
}
