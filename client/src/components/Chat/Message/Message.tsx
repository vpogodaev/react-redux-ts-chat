import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../../features/users/selectors';
import { IMessage } from '../../../models/interfaces/IMessage';
import styles from './Message.module.scss';

declare type TMessageProps = {
  message: IMessage;
};

const Message: React.FC<TMessageProps> = ({ message }): JSX.Element => {
  const { id, text, timestamp, userId, userName } = message;
  const { id: curUserId } = useSelector(selectCurrentUser);

  const messageStyle =
    userId === curUserId
      ? {
          secondClass: styles.messageMy,
          variant: 'secondary',
          wrapper: styles.wrapperMy,
        }
      : {
          secondClass: '',
          variant: 'primary',
          wrapper: '',
        };

  const renderMessage = () => {
    return (
      <div className={`${styles.wrapper} ${messageStyle.wrapper}`}>
        <Alert
          className={`${styles.message} ${messageStyle.secondClass}`}
          variant={messageStyle.variant}
        >
          <Alert.Heading className={styles.header}>
            <div>{userName}</div>
            <div className={styles.date}>{timestamp}</div>
          </Alert.Heading>
          {text}
        </Alert>
      </div>
    );
  };

  return renderMessage();
};

export default Message;
