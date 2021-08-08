export interface IUser {
  id: string;
  name: string | undefined;
  status: 'offline' | 'online' | 'error';
}
