import { combineReducers } from '@reduxjs/toolkit';
import { films } from './films/films';


export const rootReducer = combineReducers({
  films: films.reducer,
});
