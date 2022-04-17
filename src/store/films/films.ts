import { createSlice } from '@reduxjs/toolkit';
// import { Film } from './../../types/film.types';

const initialState: any = [];

export const films = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms: (state, action) => action.payload,
  },
});

export const { setFilms } = films.actions;
