import React, { Component } from 'react';
import './App.css';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Auth from './auth/Auth';
import Callback from './components/Callback';

class App extends Component {

  constructor(props) {
    super(props);

    this.auth = new Auth(this.props.history);
  }

  render() {
    const {
      isAuthenticated,
      login,
      logout
    } = this.auth;

    return (
      <div className={'App'}>
        <nav  className='header'>
          <ul className='header-link-container'>
            <li className='header-link-item'><NavLink to='/'>Home</NavLink></li>
            <li className='header-link-item'><NavLink to='/profile'>Profile</NavLink></li>
            <li className='header-link-item' onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log Out" : "Log In"}
            </li>
          </ul>
        </nav>
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
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
