import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from '../features/users/slice';
import messagesReducer from '../features/messages/slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
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
