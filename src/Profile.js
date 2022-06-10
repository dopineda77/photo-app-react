import React from 'react';
import {getHeaders} from './utils';

class Profile extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
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
            <header className="user-profile">
                <img 
                    src={profile.image_url}
                    width="100"
                    height="100"></img>
                <p id="user-name">{profile.username}</p>
            </header>
         ) 
    }
}

export default Profile;