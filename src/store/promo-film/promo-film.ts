import { createSlice } from '@reduxjs/toolkit';
import { Film } from '../../types/film.types';

export const promoFilm = createSlice({
  name: 'promoFilm',
  initialState: {} as Film,
  reducers: {
    setPromoFilm: (state, action) => action.payload,
  },
});

export const { setPromoFilm } = promoFilm.actions;
