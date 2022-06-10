import React from 'react';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';
import Profile from './Profile';
import NavBar from './NavBar';

class App extends React.Component {  

    constructor(props) {
        super(props);
        // issue a fetch request to api/profile endpoint
        this.state = {
            user: {}
        }
    }


    render () {
        return (
            <div>

            <NavBar 
                title="Photo App"
            />

            <aside>
                <Profile />
                <Suggestions />
            </aside>

            <main className="content">
                <Stories />
                <Posts />
            </main>

            </div>
        );
    }
}

export default App;