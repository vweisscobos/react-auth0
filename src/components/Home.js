import React from 'react';
import { NavLink } from 'react-router-dom';


class Home extends React.Component {
    
    render() {
        const { isAuthenticated, login } = this.props.auth;

        return <div>
            <h1>Home</h1>
            {
                isAuthenticated() ?
                    <NavLink to="/profile">Profile</NavLink> :
                    <button onClick={login}>
                        Log In
                    </button>
            }
            
        </div>
    }
}

export default Home;