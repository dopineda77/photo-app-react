import React from 'react';
import {getHeaders} from'./utils';

class LikeButton extends React.Component {
  
    constructor(props) {
        super(props);
        
        this.toggleLike = this.toggleLike.bind(this)
        this.createLike = this.createLike.bind(this)
        this.removeLike = this.removeLike.bind(this)
    
    }


    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleLike () {
        //console.log('hello!')
        if (this.props.likeId) {
            this.removeLike();
        } else {
            this.createLike();
        }
    }

    createLike () {
        // fetch POST: /api/posts/likes
        const url = 'http://127.0.0.1:5000/api/posts/likes';
        const postData = {
            post_id: this.props.postId
        }
        console.log('create like:', url)
        fetch(url, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify(postData)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.refreshPost();
        })
    }

    removeLike () {
        // fetch DELETE: /api/posts/likes
        const url = 'http://127.0.0.1:5000/api/posts/likes/' + this.props.likeId;
        console.log('remove like:', url)
        fetch(url, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.refreshPost();
        })
    }


    render () {
         const likeId = this.props.likeId;
         const heartClass = (likeId ? 'fas' : 'far') + ' fa-2x fa-heart';
         
         return (
                <button 
                    onClick={this.toggleLike}
                    aria-label="like / unlike">
                    <i className={heartClass}></i>
                </button>    
            )
        
    }
}

export default LikeButton;