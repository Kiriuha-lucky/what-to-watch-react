import { Film } from '../../types/film.types';
import { FilmCard } from '../film-card/film-card';

interface FilmsListProps {
  filmsList: Film[];
}

export function FilmsList({ filmsList }: FilmsListProps): JSX.Element {
  return (
    <ul
      className='catalog__films-list'
      style={{
        listStyle: 'none',
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        padding: 0,
      }}
    >
      {filmsList.map((film: Film) => (
        <FilmCard key={film.id} {...film} />
      ))}
    </ul>
  );
}
