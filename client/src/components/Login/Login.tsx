import { useState } from 'react';
import { Container, Form, Row, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SliceStatuses } from '../../enums/SliceStatuses';
import {
  selectCurrentUser,
  selectStateStatus,
  selectUsersErrorMsg,
} from '../../features/users/selectors';
import { loginAsync } from '../../features/users/slice';

import styles from './Login.module.scss';

declare type TLoginProps = {};

const errors: { [msg: string]: string } = {
  Conflict: 'Имя занято. Выберите другое имя.',
};

const Login: React.FC<TLoginProps> = ({}): JSX.Element => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(selectStateStatus);
  const currentUser = useSelector(selectCurrentUser);

  const storeMessage = useSelector(selectUsersErrorMsg);

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginAsync(name));
  };

  const renderError = () => {
    return storeMessage
      ? errors[storeMessage] && (
          <Alert variant="danger">{errors[storeMessage]}</Alert>
        )
      : null;
  };

  if (status !== SliceStatuses.idle && currentUser.id !== '0') {
    return <Redirect to="/room" />;
  }

  return (
    <Container className={styles.login}>
      <Row className="justify-content-md-center align-items-center">
        <Card className="col-4 p-3">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя..."
                value={name}
                onChange={onNameChanged}
              />
            </Form.Group>
            {renderError()}
            <Button type="submit">Ввод</Button>
          </Form>
        </Card>
      </Row>
    </Container>
  );
};

export default Login;
