import { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SliceStatuses } from '../../../enums/SliceStatuses';
import { getCurrentUser } from '../../../features/currentUserSlice';
import { addNewMessageAsync } from '../../../features/messagesSlice';
import styles from './MessageInput.module.scss';

declare type TMessageInputProps = {};

const MessageInput: React.FC<TMessageInputProps> = ({}): JSX.Element => {
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>(
    'idle'
  );
  const { id: userId } = useSelector(getCurrentUser);
  //ttest
  //const userId = '4';

  const dispatch = useDispatch();

  const onMessageSubmitAsync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    try {
      setRequestStatus('pending');
      await dispatch(addNewMessageAsync({ text: message, userId }));

      setMessage('');
    } catch (err) {
      console.error('Failed to add message', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <form onSubmit={onMessageSubmitAsync}>
      <InputGroup className="mb-1">
        <FormControl
          placeholder="Enter your message"
          aria-label="Enter your message"
          aria-describedby="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          type="submit"
          disabled={requestStatus === 'pending'}
        >
          Enter
        </Button>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
