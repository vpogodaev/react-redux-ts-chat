import React from 'react';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { makeServer } from '../../api/server';

import Login from '../Login/Login';
import UsersList from '../Users/UsersList/UsersList';

import styles from './App.module.scss';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

const App = () => {
  // return <Login />;
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={UsersList} />

        <Redirect to="/login"/>
      </Switch>
    </Router>
  );
};

export default App;
