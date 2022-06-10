import React from 'react';
import {getHeaders} from'./utils';

class AddComment extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            model: this.props.model,
        }

        this.textInput = React.createRef();
        
        this.toggleComment = this.toggleComment.bind(this)
        this.createComment = this.createComment.bind(this)
    
    }


    componentDidMount() {
        // fetch posts and then set the state...
    }

    toggleComment () {
        //console.log('hello!')
        this.createComment();
    }

    createComment () {
        const postData = {
            post_id: this.props.postId,
            text: this.textInput.current.value
        };

        console.log(postData)
        
        fetch('http://127.0.0.1:5000/api/comments/', {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.refreshPost()
                this.textInput.current.value = '';
            });
    }




    render () {
         return (
            <div id="comment-section">
                <div id="left-section">
                    <i className="far fa-2x fa-smile"></i>
                    <input type="text" 
                    ref={this.textInput}
                    placeholder="Add a comment..."></input>
                </div>
                <button
                    id="post-button"
                    data-post-id="${post.id}"
                    onClick={this.toggleComment}> 
                        Post 
                </button>
            </div>
         )
    }
}

export default AddComment;