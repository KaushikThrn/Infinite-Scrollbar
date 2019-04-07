import React, {Component} from 'react';
import Header from './Header';
import MessageList from './MessageList';

class Blog extends Component {
    render(){
        return(
            <div>
                <Header />
                <MessageList />
            </div>
            )
    }
}
  
  export default Blog;