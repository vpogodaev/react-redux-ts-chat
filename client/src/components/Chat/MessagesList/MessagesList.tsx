import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { SliceStatuses } from '../../../enums/SliceStatuses';
import {
  getMessagesAsync,
  selectMessages,
} from '../../../features/messagesSlice';
import Message from '../Message/Message';
import styles from './MessagesList.module.scss';

declare type TMessagesListProps = {};

const MessagesList: React.FC<TMessagesListProps> = ({}): JSX.Element => {
  const dispatch = useDispatch();
  const messagesStatus = useSelector(
    (state: RootState) => state.messages.status
  );
  const messages = useSelector(selectMessages);

  useEffect(() => {
    if (messagesStatus === SliceStatuses.idle) {
      dispatch(getMessagesAsync());
    }
  });

  const renderMessages = () => {
    return (
      <ul className={styles.messages}>
        {messages.map((m) => (
          <li key={m.id}>
            <Message message={m} />
          </li>
        ))}
      </ul>
    );
  };

  return renderMessages();
};

export default MessagesList;
