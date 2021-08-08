import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HttpError } from '../types/errors';
import { RootState } from '../app/store';
import { IUser } from '../models/interfaces/IUser';
import { SliceStatuses } from '../enums/SliceStatuses';

interface IUserState {
  currentUser: IUser;
  status: SliceStatuses;
  msg: string | undefined;
}

const initialState: IUserState = {
  currentUser: {
    id: '0',
    name: undefined,
    status: 'offline',
  },
  status: SliceStatuses.idle,
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
        state.status = SliceStatuses.loading;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = SliceStatuses.succeeded;
        state.currentUser = {
          name: action.payload.name,
          id: action.payload.id,
          status: 'online',
        };
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.msg = action.error.message;
      });
  },
});

export default currentUserSlice.reducer;

export const getCurrentUser = (state: RootState) =>
  state.currentUser.currentUser;
export const getStateStatus = (
  state: RootState
): { status: SliceStatuses; msg: string | undefined } => {
  return { status: state.currentUser.status, msg: state.users.msg };
};
