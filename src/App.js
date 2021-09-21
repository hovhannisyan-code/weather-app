import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './helpers';
import Main from './components/Main';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
