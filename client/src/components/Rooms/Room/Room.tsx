import Chat from '../../Chat/Chat';
import UsersList from '../../Users/UsersList/UsersList';
import styles from './Room.module.scss';

declare type TRoomProps = {};

const Room: React.FC<TRoomProps> = ({}): JSX.Element => {
  return (
    <div className={styles.room}>
      <div className={styles.chat}>
        <Chat />
      </div>
      <div className={styles.users}>
        <UsersList />
      </div>
    </div>
  );
};

export default Room;
