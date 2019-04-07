import React, {Component} from 'react';
import {fetchMessages,fetchNextMessages} from '../actions/index.js';
import {connect} from 'react-redux';
import Header from './Header';
import MessageList from './MessageList';

class Blog extends Component {
    state={messages:[]}

    async componentDidMount(){
        await this.props.dispatch(fetchMessages())
        this.setState({messages:this.props.messages})
    }

    addMessages=()=>{
        console.log("pressed");
        this.props.dispatch(fetchNextMessages(this.props.token))
        this.setState({messages:this.props.messages})
    }

    render(){
        return(
            <div>
                <Header />
                <button onClick={this.addMessages}>add more</button>
                <MessageList messages={this.state.messages}/>
            </div>
            )
    }
}

function mapStateToProps(state){
    console.log("state is",state)
    return {
        messages:state.blog.messages,
        token:state.blog.token
    }
}
  
  export default connect(mapStateToProps)(Blog);