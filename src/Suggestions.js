import React from 'react';
import Suggestion from'./Suggestion';
import {getHeaders} from './utils';

class Suggestions extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            suggestions: []
        }
        // initialization code here
        this.getSuggestionsFromServer = this.getSuggestionsFromServer.bind(this);
    }

    getSuggestionsFromServer () {
        fetch('http://127.0.0.1:5000/api/suggestions', {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    suggestions: data
                })
            })
    ;}

    componentDidMount() {
        this.getSuggestionsFromServer();
    }

    

     render () {
         const suggestions = this.state.suggestions;
         return (
            <div className="suggestions">
                <p className="suggestion-text">Suggestions for you</p>
                {
                    suggestions.map(suggestion => {
                        //console.log(suggestion);
                        return (
                            <Suggestion
                                followingId={suggestion.id}
                                model={suggestion}
                                key={'suggestion-' + suggestion.id}/>
                        )
                    })
                }
            </div>
         ) 
    }
}

 export default Suggestions;