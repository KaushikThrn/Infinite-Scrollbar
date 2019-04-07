import React,{Component} from 'react';
import Card from './Card';
import {fetchMessages,fetchNextMessages} from '../actions/index.js';
import {connect} from 'react-redux';

class MessageList extends Component{
    
    state={loading:false}

    addMessages=()=>{
        this.setState({loading:true});
        console.log("pressed");
        this.props.dispatch(fetchNextMessages(this.props.token))
        this.setState({loading:false})
    }

    onScroll=()=>{
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          this.props.messages.length && !this.state.loading
        ) {
          this.addMessages();
        }
      }

    async componentDidMount(){
        window.addEventListener('scroll', this.onScroll, false);
        await this.props.dispatch(fetchMessages())
    }

    render(){
        const {messages}=this.props
        console.log("length is",this.props)
        return(
            <div className="message-list">
                {messages.map((message, index)=>(<Card message={message} key={index}/>))}
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

export default connect(mapStateToProps)(MessageList);