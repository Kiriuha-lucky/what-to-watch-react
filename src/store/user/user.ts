import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './../../types/user-data.types';

const initialState = {} as UserData;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => action.payload,
    clearUser: (state) => initialState,
  },
});

export const { setUser, clearUser } = user.actions;
