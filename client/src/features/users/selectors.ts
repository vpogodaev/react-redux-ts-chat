import { RootState } from '../../app/store';
import { SliceStatuses } from '../../enums/SliceStatuses';

export const selectOnlineUsers = (state: RootState) => state.users.onlineUsers;
export const selectStateStatus = (state: RootState) => state.users.status;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectUsersErrorMsg = (state: RootState) => state.users.msg;
