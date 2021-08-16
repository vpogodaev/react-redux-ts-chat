import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HttpError } from '../../types/errors';
import { IUser } from '../../models/interfaces/IUser';
import { SliceStatuses } from '../../enums/SliceStatuses';

interface IUserState {
  currentUser: IUser;
  onlineUsers: IUser[];
  status: SliceStatuses;
  msg: string | undefined;
}

const initialState: IUserState = {
  currentUser: {
    id: '0',
    name: undefined,
    status: 'offline',
  },
  onlineUsers: [],
  status: SliceStatuses.idle,
  msg: undefined,
};

type JSONResponse = {
  users: IUser[];
};

export const getOnlineUsersAsync = createAsyncThunk(
  'users/online',
  async () => {
    return await fetch('/api/users/online').then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new HttpError(response.status, response.statusText);
    });
  }
);

export const loginAsync = createAsyncThunk(
  'users/login',
  async (userName: string) => {
    return await fetch('/api/users/login', {
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
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOnlineUsersAsync.pending, (state) => {
        state.status = SliceStatuses.loading;
      })
      .addCase(
        getOnlineUsersAsync.fulfilled,
        (state, action: PayloadAction<JSONResponse>) => {
          state.status = SliceStatuses.succeeded;
          state.onlineUsers = action.payload.users;
        }
      )
      .addCase(getOnlineUsersAsync.rejected, (state, action) => {
        state.status = SliceStatuses.failed;
        state.msg = action.error.message;
      })
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
        state.msg = action.error.message || undefined;
      });
  },
});

export default usersSlice.reducer;
