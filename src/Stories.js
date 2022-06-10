import React from 'react';
import {getHeaders} from './utils';

class Stories extends React.Component {
  
    constructor(props) {
        super(props);
        // initialization code here
        this.state = {
            stories: []
        }
        this.getStoriesFromServer()
    }

    componentDidMount() {
        // fetch posts and then set the state...
    }

    getStoriesFromServer () {
        fetch('http://127.0.0.1:5000/api/stories/', {
            headers: getHeaders(),
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                stories: data
            })
        })
    }

     render () {
         const stories = this.state.stories;
         return (
            <header className="stories">
                {
                    stories.map(story => {
                        //console.log(suggestion);
                        return (
                            <div key={"story-number" + story.id}>
                                <img className="pic" src={story.user.thumb_url}></img>
                                <p>{story.user.username}</p>
                            </div>
                        )
                    })
                }
            </header>
         ) 
    }
}

export default Stories;