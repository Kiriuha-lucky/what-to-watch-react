import { errorHandle } from '../services/error-handle';
import { setFilms } from './films/films';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.types';
import { AxiosInstance } from 'axios';
import { Film } from './../types/film.types';
import { APIRoutes } from '../types/api.types';
import { setPromoFilm } from './promo-film/promo-film';
import { requireAuthorization } from './auth/auth';
import { clearUser, setUser } from './user/user';
import { AuthorizationStatus } from '../types/auth.types';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.types';
import { UserData } from '../types/user-data.types';

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

export const requireAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'requireAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(APIRoutes.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoutes.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoutes.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(clearUser());
  },
);

