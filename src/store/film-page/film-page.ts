import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmPage } from '../../types/film-page.types';
import { Film } from '../../types/film.types';
import { ReviewType } from '../../types/review.types';


const initialState: FilmPage = {
  currentFilm: {} as Film,
  reviews: [],
  similarFilms: [],
};

export const filmPage = createSlice({
  name: 'filmPage',
  initialState,
  reducers: {
    setFilm: (state, action: PayloadAction<Film>) => {
      state.currentFilm = action.payload;
    },
    setReviews: (state, action: PayloadAction<ReviewType[]>) => {
      state.reviews = action.payload;
    },
    setSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
  },
});

export const { setFilm, setReviews, setSimilarFilms } = filmPage.actions;
