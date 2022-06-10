import React from 'react';
import {getHeaders} from './utils';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        // initialization code here
        console.log('NavBar props :', props);
        this.state = {
            profile: {}
        }
        this.getProfileFromServer()
    }

    getProfileFromServer () {
        fetch('http://127.0.0.1:5000/api/profile/', {
            headers: getHeaders(),
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                profile: data
            })
        })
    }


    componentDidMount() {
        // fetch posts and then set the state...
    }

     render () {
         const profile = this.state.profile;
         return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1> 
                <div id="nav-links">
                    <p>{profile.username}</p>
                    <p>Logout</p>
                    <p>API Docs</p>
                </div>
            </nav>
         ) 
    }
}

export default NavBar;