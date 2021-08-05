import { useEffect, useState } from 'react';
import { Container, Form, Row, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  getCurrentUser,
  getStateStatus,
  loginAsync,
} from '../../features/usersSlice';

import styles from './Login.module.scss';

declare type TLoginProps = {};

const Login: React.FC<TLoginProps> = ({}): JSX.Element => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined | null>();
  const dispatch = useDispatch();
  const status = useSelector(getStateStatus);
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (status.status === 'failed') {
      setError(status.msg);
    }
  }, [status])

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginAsync(name));
      setError(null);
    } catch (err) {
      console.error('failed to log in', err);
      setError('Произошла ошибка');
    }
  };

  const renderError = () => {
    return error && <Alert variant="danger">{error}</Alert>;
  };

  if (currentUser.id) {
    return <Redirect to='/users'/>;
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
