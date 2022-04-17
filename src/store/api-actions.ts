import { errorHandle } from '../services/error-handle';
import { setFilms } from './films/films';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.types';
import { AxiosInstance } from 'axios';
import { Film } from './../types/film.types';
import { APIRoute } from '../types/api.types';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Film[]>(APIRoute.Films);
      dispatch(setFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
