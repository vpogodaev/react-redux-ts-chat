import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HttpError } from '../types/errors';
import { RootState } from '../app/store';
import { IUser } from '../models/interfaces/IUser';

export interface IUserState {
  currentUser: IUser;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  msg: string | undefined;
}

const initialState: IUserState = {
  currentUser: {
    id: 0,
    name: undefined,
    status: 'offline',
  },
  status: 'idle',
  msg: undefined,
};

export const loginAsync = createAsyncThunk(
  'users/login',
  async (userName: string) => {
    const fetchResult = fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'applications/json;charset=utf-8',
      },
      body: JSON.stringify({ name: userName }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new HttpError(response.status, response.statusText);
    });

    return fetchResult;
  }
);

const currentUserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = 'succeeded';
        state.currentUser = {
          name: action.payload.name,
          id: action.payload.id,
          status: 'online',
        };
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.msg = action.error.message;
      });
  },
});

export default currentUserSlice.reducer;

export const getCurrentUser = (state: RootState) => state.currentUser.currentUser;
export const getStateStatus = (
  state: RootState
): { status: string; msg: string | undefined } => {
  return { status: state.users.status, msg: state.users.msg };
};
