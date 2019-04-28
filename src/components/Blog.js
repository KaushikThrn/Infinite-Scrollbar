import React, {Component} from 'react';
import Header from './Header';
import MessageList from './MessageList';
import { CSSTransition } from "react-transition-group"; 

class Blog extends Component {
    render(){
        return(
            <div>
                <Header />
                <CSSTransition
                in={true}
                timeout={400}
                classNames="list-transition"
                unmountOnExit
        >
            <MessageList />
        </CSSTransition>
             
            </div>
            )
    }
}
  
  export default Blog;