import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from '../features/usersSlice';
import currentUserReducer from '../features/currentUserSlice';
import messagesReducer from '../features/messagesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    messages: messagesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
