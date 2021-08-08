import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { SliceStatuses } from '../../../enums/SliceStatuses';
import {
  getOnlineUsersAsync,
  selectOnlineUsers,
} from '../../../features/usersSlice';
import { IUser } from '../../../models/interfaces/IUser';
import OnlineUser from '../OnlineUser/OnlineUser';
import styles from './UsersList.module.scss';

declare type TUsersListProps = {};

const UsersList: React.FC<TUsersListProps> = ({}): JSX.Element => {
  const dispatch = useDispatch();
  const usersStatus = useSelector((state: RootState) => state.users.status);

  const onlineUsers = useSelector(selectOnlineUsers);

  useEffect(() => {
    if (usersStatus === SliceStatuses.idle) {
      dispatch(getOnlineUsersAsync());
    }
  }, [usersStatus, dispatch]);

  const onUserClicked = (user: IUser) => {
    console.log(user);
  };

  const renderUsers = () => {
    return (
      <ListGroup as="ul">
        {onlineUsers.map((u) => (
          <ListGroup.Item
            key={u.id}
            as="li"
            action
            onClick={() => onUserClicked(u)}
          >
            <OnlineUser user={u} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <div className={styles.wrapper}>
      {onlineUsers ? renderUsers() : <div>No online users</div>}
    </div>
  );
};

export default UsersList;
