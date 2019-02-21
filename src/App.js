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
import AuthContext from './AuthContext';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth(this.props.history)
    };
  }

  render() {

    const { auth } = this.state;

    return (
      <AuthContext.Provider value={auth}>
        <Header auth={auth} />
        <div className={'body'}>
          <Switch>
            <Route
              exact path={'/'}
              render={props => <Home auth={auth} {...props}/>}
            />
            <PrivateRoute
              path={'/profile'}
              component={Profile}
            />
            <Route
              path={'/callback'}
              render={props => <Callback auth={auth} {...props} />}
            />
            <Route
              path={'/public'}
              render={props => <Public auth={auth} {...props} />}
            />
            <PrivateRoute
              path={'/private'}
              component={Private}
            />
            <PrivateRoute
              path={'/courses'}
              component={Courses}
              scopes={["read:courses"]}
            />
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
