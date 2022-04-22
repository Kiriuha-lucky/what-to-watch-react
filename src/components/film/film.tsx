import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFilmAction } from '../../store/api-actions';
import { FilmsList } from '../films-list/films-list';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Spinner } from '../spinner/spinner';
import { useAppDispatch, useAppSelector } from './../../hooks/index';
import './film.css';
import { ratingToText, timeToText } from './film.utils';

/*eslint-disable*/
export function Film(): JSX.Element {
  const filmId = Number(useParams().id);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { currentFilm, reviews, similarFilms } = useAppSelector(({ filmPage }) => filmPage);
  const [currentTab, setCurrentTab] = useState('overview');

  const fetchData = useCallback(async () => {
    await dispatch(fetchFilmAction(filmId));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  const toogleTab = function () {
    switch (currentTab) {
      case 'overview':
        return (<><div className="film-rating">
          <div className="film-rating__score">{currentFilm.rating}</div>
          <p className="film-rating__meta">
            <span className="film-rating__level">{ratingToText(currentFilm.rating)}</span>
            <span className="film-rating__count">{currentFilm.scoresCount} ratings</span>
          </p>
        </div><div className="film-card__text">
            <p>{currentFilm.description}</p>
            <p className="film-card__director"><strong>Director: {currentFilm.director}</strong></p>
            <p className="film-card__starring"><strong>Starring: {currentFilm.starring.join(', ')}</strong></p>
          </div></>);
      case 'details':
        return (<div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{currentFilm.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              <span className="film-card__details-value">
                {currentFilm.starring.join(', ')}
              </span>
            </p>
          </div>
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{timeToText(currentFilm.runTime)}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{currentFilm.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{currentFilm.released}</span>
            </p>
          </div>
        </div >);
      case 'reviews':
        return (<div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {reviews.map((review) => (
              <div key={review.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>
                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time className="review__date" dateTime={new Date(review.date).toISOString().split('T')[0]}>{`${new Date(review.date).toLocaleString('EN', { month: 'long' })}, ${new Date(review.date).getDate() - 1}, ${new Date(review.date).getFullYear()}`}</time>
                  </footer>
                </blockquote>
                <div className="review__rating">{review.rating}</div>
              </div>
            ))}
          </div>
        </div>);
    }
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={currentFilm.backgroundImage}
              alt={currentFilm.name}
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link to={`/player/${currentFilm.id}`} className="btn btn--play film-card__button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">
                  Add review
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={currentFilm.posterImage}
                alt={currentFilm.name}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item ${currentTab === 'overview' && 'film-nav__item--active'}`}>
                    <button onClick={() => setCurrentTab('overview')} className="film-nav__link">
                      Overview
                    </button>
                  </li>
                  <li className={`film-nav__item ${currentTab === 'details' && 'film-nav__item--active'}`}>
                    <button onClick={() => setCurrentTab('details')} className="film-nav__link">
                      Details
                    </button>
                  </li>
                  <li className={`film-nav__item ${currentTab === 'reviews' && 'film-nav__item--active'}`}>
                    <button onClick={() => setCurrentTab('reviews')} className="film-nav__link">
                      Reviews
                    </button>
                  </li>
                </ul>
              </nav>
              {toogleTab()}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList filmsList={similarFilms.slice(0, 4)} />
        </section>
        <Footer />
      </div>
    </>
  );
}

