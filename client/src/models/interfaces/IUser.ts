export interface IUser {
  id: number;
  name: string | undefined;
  status: 'offline' | 'online' | 'error';
}
