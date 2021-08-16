import { RootState } from '../../app/store';

export const selectMessages = (state: RootState) => state.messages.messages;
