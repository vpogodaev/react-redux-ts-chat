import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { SliceStatuses } from '../enums/SliceStatuses';
import { IMessage } from '../models/interfaces/IMessage';
import { HttpError } from '../types/errors';

interface IMessagesState {
  status: SliceStatuses;
  messages: IMessage[];
}

type JSONResponse = {
  messages: IMessage[];
};

const initialState: IMessagesState = {
  status: SliceStatuses.idle,
  messages: [],
};

export const getMessagesAsync = createAsyncThunk('messages', async () => {
  return await fetch('/api/messages').then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new HttpError(response.status, response.statusText);
  });
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesAsync.pending, (state) => {
        state.status = SliceStatuses.loading;
      })
      .addCase(
        getMessagesAsync.fulfilled,
        (state, action: PayloadAction<JSONResponse>) => {
          state.status = SliceStatuses.succeeded;
          state.messages = action.payload.messages;
        }
      );
  },
});

export default messagesSlice.reducer;

export const selectMessages = (state: RootState) => state.messages.messages;
