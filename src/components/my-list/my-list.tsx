import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { Header } from '../header/header';
import { Footer } from './../footer/footer';
import { useAppDispatch } from './../../hooks/index';
import { fetchMyListFilms } from '../../store/api-actions';
import { Spinner } from '../spinner/spinner';
import { FilmsList } from '../films-list/films-list';

export function MyList(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const myListFilms = useAppSelector(({ myList }) => myList);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    await dispatch(fetchMyListFilms());

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <div className="user-page">
      <Header >
        <h1 className="page-title user-page__title">My list</h1>
      </Header >
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmsList filmsList={myListFilms} />
      </section>
      <Footer />
    </div>
  );
}
