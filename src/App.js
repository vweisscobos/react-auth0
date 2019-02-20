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

class App extends Component {

  constructor(props) {
    super(props);

    this.auth = new Auth(this.props.history);
  }

  render() {

    return (
      <div className={'App'}>
        <Header auth={this.auth}></Header>
        <div className={'body'}>
          <Switch>
            <Route
              exact path={'/'}
              render={props => <Home auth={this.auth} {...props}/>}
            />
            <Route
              path={'/profile'}
              render={props =>
                this.auth.isAuthenticated() ? (
                  <Profile auth={this.auth} {...props} />
                ) : (
                  <Redirect to='/'/>
                )
              }
            />
            <Route
              path={'/callback'}
              render={props => <Callback auth={this.auth} {...props} />}
            />
            <Route
              path={'/public'}
              render={props => <Public auth={this.auth} {...props} />}
            />
            <Route
              path={'/private'}
              render={props =>
                this.auth.isAuthenticated() ? (
                  <Private auth={this.auth} {...props} />
                ) : (
                  this.auth.login()  
                )
            }
            />
            <Route
              path={'/courses'}
              render={props =>
                this.auth.isAuthenticated() && this.auth.userHasScopes(['read:courses']) ? (
                  <Courses auth={this.auth} {...props} />
                ) : (
                  this.auth.login()  
                )
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
