import { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser } from '../../../features/users/selectors';
import { addNewMessageAsync } from '../../../features/messages/slice';

import styles from './MessageInput.module.scss';

declare type TMessageInputProps = {};

const MessageInput: React.FC<TMessageInputProps> = ({}): JSX.Element => {
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>(
    'idle'
  );
  const { id: userId } = useSelector(selectCurrentUser);
  //ttest
  //const userId = '4';

  const dispatch = useDispatch();

  const onMessageSubmitAsync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    try {
      setRequestStatus('pending');
      dispatch(addNewMessageAsync({ text: message, userId }));
    } catch (err) {
      console.error('Failed to add message', err);
    } finally {
      setMessage('');
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
