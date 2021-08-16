import styles from './Chat.module.scss';
import MessageInput from './MessageInput/MessageInput';
import MessagesList from './MessagesList/MessagesList';

declare type TChatProps = {};

const Chat: React.FC<TChatProps> = ({}): JSX.Element => {
  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        <MessagesList />
      </div>
      <div className={styles.input}>
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
