/*eslint-disable*/
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { fetchFilms, fetchPromoFilm } from '../../store/api-actions';
import { FilmsList } from '../films-list/films-list';
import { useAppDispatch } from './../../hooks/index';
import { Spinner } from './../spinner/spinner';
import { setCurrentFilms, setGenres } from './main.utils';
import './main.css';

export function Main(): JSX.Element {
  const filmsList = useAppSelector(({ films }) => films);
  const promoFilm = useAppSelector(({ promoFilm }) => promoFilm);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeGenre, setActiveGenre] = useState('All genres');

  const MAX_FILMS_ON_PAGE = 8;
  const [countFilms, setCountFilms] = useState(MAX_FILMS_ON_PAGE);


  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    await dispatch(fetchFilms());
    await dispatch(fetchPromoFilm());

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  const genres = setGenres(filmsList);
  const currentFilms = setCurrentFilms(filmsList, activeGenre);
  const sliceCurrentFilms = currentFilms.slice(0, countFilms);
  const handleChangeGenre = function (genre: string) {
    setCountFilms(MAX_FILMS_ON_PAGE);
    return setActiveGenre(genre);
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promoFilm.backgroundImage}
            alt={promoFilm.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width={63}
                  height={63}
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm.posterImage}
                alt={promoFilm.name}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ul className="catalog__genres-list">
            {genres.map((genre) => {
              return (
                <li key={genre} className={`catalog__genres-item ${activeGenre === genre && 'catalog__genres-item--active'}`}>
                  <button className="catalog__genres-link" onClick={() => handleChangeGenre(genre)}>
                    {genre}
                  </button>
                </li>)
            })}
          </ul>
          <FilmsList filmsList={sliceCurrentFilms} />
          {currentFilms.length > countFilms && (
            <div className="catalog__more">
              <button className="catalog__button" type="button" onClick={() => setCountFilms((prev) => prev += MAX_FILMS_ON_PAGE)}>
                Show more
              </button>
            </div>
          )}
        </section>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

