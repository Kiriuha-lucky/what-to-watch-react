import { errorHandle } from '../services/error-handle';
import { setFilms } from './films/films';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.types';
import { AxiosInstance } from 'axios';
import { Film } from './../types/film.types';
import { APIRoutes } from '../types/api.types';
import { setPromoFilm } from './promo-film/promo-film';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film[]>(APIRoutes.Films);
      dispatch(setFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film[]>(APIRoutes.PromoFilm);
      dispatch(setPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

