import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HttpError } from '../types/errors';
import { RootState } from '../app/store';
import { IUser } from '../models/interfaces/IUser';

export interface IUserState {
  onlineUsers: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  msg: string | undefined;
}

const initialState: IUserState = {
  onlineUsers: [],
  status: 'idle',
  msg: undefined,
};

type JSONResponse = {
  users: IUser[];
};

export const getOnlineUsersAsync = createAsyncThunk(
  'users/online',
  async () => {
    const fetchResult = await fetch('/api/users/online').then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new HttpError(response.status, response.statusText);
    });
    return fetchResult;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOnlineUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getOnlineUsersAsync.fulfilled,
        (state, action: PayloadAction<JSONResponse>) => {
          state.status = 'succeeded';
          state.onlineUsers = action.payload.users;
        }
      )
      .addCase(getOnlineUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.msg = action.error.message;
      });
  },
});

export default usersSlice.reducer;

export const selectOnlineUsers = (state: RootState) => state.users.onlineUsers;
export const getStateStatus = (
  state: RootState
): { status: string; msg: string | undefined } => {
  return { status: state.users.status, msg: state.users.msg };
};
