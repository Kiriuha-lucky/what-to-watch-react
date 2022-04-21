import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../types/auth.types';

export const auth = createSlice({
  name: 'auth',
  initialState: AuthorizationStatus.Unknown,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => action.payload,
  },
});

export const { requireAuthorization } = auth.actions;
