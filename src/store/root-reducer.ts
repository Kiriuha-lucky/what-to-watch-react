import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './auth/auth';
import { films } from './films/films';
import { promoFilm } from './promo-film/promo-film';


export const rootReducer = combineReducers({
  films: films.reducer,
  promoFilm: promoFilm.reducer,
  auth: auth.reducer,
});
