import React from 'react';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import AddComment from './AddComment';
import {getHeaders} from'./utils';


class Post extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            post: props.model
        }
        // initialization code here
        this.refreshPostDataFromSever = this.refreshPostDataFromSever.bind(this);
    
    }


    componentDidMount() {
        // fetch posts and then set the state...
    }

    refreshPostDataFromSever () {
        console.log('inside refresh post')
        const url = 'http://127.0.0.1:5000/api/posts/' + this.state.post.id;
        fetch(url, {
            headers: getHeaders()
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                post: data 
            })
        })
    }

    displayComments () {
        return this.state.post.comments.map(
            comment => {
                return (
                    <div className="caption"
                        key={comment.id}>
                        <p>
                            <a id="comment-user">
                                {comment.user.username + " "}
                            </a>
                            {comment.text}
                        </p>
                    </div>
                )
            }
        )
    }

    render () {
         const post = this.state.post;
         //console.log(post.current_user_like_id)
         return (
            
                <section
                    className="card">
                    <div id="post-nav">
                        <h4 id="user-name-p">
                            {post.user.username}
                        </h4>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                    <img src={post.image_url} 
                        width="100%"/>
                    <div id="post-interaction">
                        <div id="like-share">
                            <LikeButton 
                                likeId={post.current_user_like_id} 
                                postId={post.id} 
                                refreshPost={this.refreshPostDataFromSever}/>
                            <button><i className="far fa-2x fa-comment"></i></button>
                            <i className="far fa-2x fa-paper-plane"></i>
                        </div>
                        <div id="save">
                            <BookmarkButton 
                                bookmarkId={post.current_user_bookmark_id} 
                                postId={post.id} 
                                refreshPost={this.refreshPostDataFromSever}/>
                        </div>
                    </div>
                    <div id="num-likes">
                        <p id="numbers">
                            {post.likes.length} likes
                        </p>
                    </div>
                    <div className="caption">
                        <p>
                            <a id="comment-user">
                                {post.user.username + " "}
                            </a>
                            {post.caption}
                        </p>
                    </div>
                    {this.displayComments()}
                    <div id="days-ago">
                        <p>
                            {post.display_time}
                        </p>
                    </div>
                    <AddComment 
                        postId={post.id}
                        refreshPost={this.refreshPostDataFromSever}/>
                </section>
            )
        
    }
}

export default Post;