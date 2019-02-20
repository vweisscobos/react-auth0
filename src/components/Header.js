import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

    render() {
        const {
            isAuthenticated,
            logout,
            login
        } = this.props.auth;

        return <nav  className='header'>
            <ul className='header-link-container'>
                <li className='header-link-item'><NavLink to='/'>Home</NavLink></li>
                <li className='header-link-item'><NavLink to='/profile'>Profile</NavLink></li>
                <li className='header-link-item'><NavLink to='/public'>Public</NavLink></li>
                {isAuthenticated() && <li className='header-link-item'><NavLink to='/private'>Private</NavLink></li>}
                {isAuthenticated() && <li className='header-link-item'><NavLink to='/courses'>Courses</NavLink></li>}
                <li className='header-link-item' onClick={isAuthenticated() ? logout : login}>
                    {isAuthenticated() ? "Log Out" : "Log In"}
                </li>
            </ul>
        </nav>
    }
}

export default Header;