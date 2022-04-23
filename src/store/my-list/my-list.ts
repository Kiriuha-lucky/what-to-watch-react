import { createSlice } from '@reduxjs/toolkit';
import { Film } from '../../types/film.types';

const initialState: Film[] = [];

export const myList = createSlice({
  name: 'myList',
  initialState,
  reducers: {
    setMyListFilms: (state, action) => action.payload,
  },
});

export const { setMyListFilms } = myList.actions;
