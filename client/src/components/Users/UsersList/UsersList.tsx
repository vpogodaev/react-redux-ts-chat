import { useState } from 'react';
import styles from './UsersList.module.scss';

declare type TUsersListProps = {};

const UsersList: React.FC<TUsersListProps> = ({}): JSX.Element => {
  const [users, setUsers] = useState([]);

  fetch('/api/users')
    .then(response => response.json())
    // .then((response) => console.log(response))
    .then((data) => console.log(data));

  return <div></div>;
};

export default UsersList;
