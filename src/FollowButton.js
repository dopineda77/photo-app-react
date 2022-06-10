import React from 'react';
import {getHeaders} from './utils';

class FollowButton extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            followingId: null
        }

        this.toggleFollow = this.toggleFollow.bind(this)
        this.createFollow = this.createFollow.bind(this)
        this.removeFollow = this.removeFollow.bind(this)
        // initialization code here
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleFollow () {
        //console.log('hello!')
        if (this.state.followingId) {
            this.removeFollow();
        } else {
            this.createFollow();
        }
    }

    createFollow () {
        // fetch POST: /api/posts/likes
        const url = 'http://127.0.0.1:5000/api/following/';

        const followData = {
            user_id: this.props.userId
        }

        console.log('create follower:', url)
        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(followData)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                followingId: data.id
            })
        })
    }

    removeFollow () {
        // fetch DELETE: /api/posts/likes
        const url = 'http://127.0.0.1:5000/api/following/' + this.state.followingId;
        console.log('remove follower:', url)
        fetch(url, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                followingId: null
            })
        })
        console.log('unfollowed user')
    }

    render () {
        return (
            
                <button className="follow" 
                aria-label="Follow/Unfollow"
                aria-checked="false"
                onClick={this.toggleFollow}>
                    {this.state.followingId ? "Unfollow" : "Follow"}
                </button>
               
        ) 
    }
}

export default FollowButton;