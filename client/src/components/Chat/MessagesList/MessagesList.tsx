import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { SliceStatuses } from '../../../enums/SliceStatuses';
import { selectCurrentUser } from '../../../features/users/selectors';
import { selectMessages } from '../../../features/messages/selectors';
import { getMessagesAsync } from '../../../features/messages/slice';
import Message from '../Message/Message';
import styles from './MessagesList.module.scss';

declare type TMessagesListProps = {};

const MessagesList: React.FC<TMessagesListProps> = ({}): JSX.Element => {
  const dispatch = useDispatch();
  const messagesStatus = useSelector(
    (state: RootState) => state.messages.status
  );
  const messages = useSelector(selectMessages);
  const { id: userId } = useSelector(selectCurrentUser);
  let listEnd: HTMLElement | null;

  useEffect(() => {
    if (messagesStatus === SliceStatuses.idle) {
      dispatch(getMessagesAsync());
    }
  });

  const scrollToBottom = () => {
    listEnd?.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   scrollToBottom();
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const l = messages.length;
    if (l && messages[l - 1].userId === userId) {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [messages]);

  const renderContent = () => {
    return messagesStatus === SliceStatuses.loading ? (
      <Spinner animation="grow" variant="primary" />
    ) : messagesStatus === SliceStatuses.succeeded ? (
      <>
        <ul className={styles.messages}>
          {messages.map((m) => (
            <li key={m.id}>
              <Message message={m} />
            </li>
          ))}
        </ul>
        <div
          ref={(el) => {
            listEnd = el;
          }}
        ></div>
      </>
    ) : (
      <div>error</div>
    );
  };

  return renderContent();
};

export default MessagesList;
