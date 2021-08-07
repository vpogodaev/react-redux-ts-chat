import { IUser } from '../../../models/interfaces/IUser';
import styles from './OnlineUser.module.scss';

declare type TOnlineUserProps = {
  user: IUser;
};

const OnlineUser: React.FC<TOnlineUserProps> = ({ user }): JSX.Element => {
  return <div>{user.name}</div>;
};

export default OnlineUser;
