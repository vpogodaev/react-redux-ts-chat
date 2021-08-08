import React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { makeServer } from '../../api/server';
import Chat from '../Chat/Chat';

import Login from '../Login/Login';
import UsersList from '../Users/UsersList/UsersList';

import styles from './App.module.scss';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const App = () => {
  // return <Login />;
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path="/messages" component={Chat} />
          {/* <Redirect to="/messages" /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={UsersList} />

          <Redirect to="/login"/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
