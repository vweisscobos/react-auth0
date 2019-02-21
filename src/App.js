import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Auth from './auth/Auth';
import Callback from './components/Callback';
import Header from './components/Header';
import Public from './components/Public';
import Private from './components/Private';
import Courses from './components/Courses';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  constructor(props) {
    super(props);

    this.auth = new Auth(this.props.history);
  }

  render() {

    return (
      <div className={'App'}>
        <Header auth={this.auth} />
        <div className={'body'}>
          <Switch>
            <Route
              exact path={'/'}
              render={props => <Home auth={this.auth} {...props}/>}
            />
            <PrivateRoute
              path={'/profile'}
              component={Profile}
              auth={this.auth}
            />
            <Route
              path={'/callback'}
              render={props => <Callback auth={this.auth} {...props} />}
            />
            <Route
              path={'/public'}
              render={props => <Public auth={this.auth} {...props} />}
            />
            <PrivateRoute
              path={'/private'}
              component={Private}
              auth={this.auth}
            />
            <PrivateRoute
              path={'/courses'}
              component={Courses}
              auth={this.auth}
              scopes={["read:courses"]}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
