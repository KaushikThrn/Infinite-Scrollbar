import React,{Component} from 'react';
import Card from './Card';
import {fetchMessages,fetchNextMessages,deleteMessage} from '../actions/index.js';
import {connect} from 'react-redux';

class MessageList extends Component{
    
    state={loading:false}

    addMessages=async ()=>{
        await this.setState({loading:true});
        this.props.dispatch(fetchNextMessages(this.props.token))
        await this.setState({loading:false});
       
        
    }

      onScroll=()=>{
        if (
          (window.innerHeight + window.scrollY) >= (3/4*(document.body.offsetHeight) ) &&
          this.props.messages.length && !this.state.loading
        ) {
            this.addMessages();
        }
      }

    handleDelete=(message)=>{
        this.props.dispatch(deleteMessage(message))
      }

    async componentDidMount(){
        window.addEventListener('scroll', this.onScroll, false);
        await this.props.dispatch(fetchMessages())
    }

    async componentDidUpdate(){
        
         if (
            (window.innerHeight + window.scrollY) >= (3/4*(document.body.offsetHeight) ) &&
            this.props.messages.length && !this.state.loading
          ) {
            console.log("didupdate")
            this.props.dispatch(fetchNextMessages(this.props.token))
          }
    }

    render(){
        const {messages}=this.props
        return(
            <div className="message-list">
                {messages.map((message, index)=>(<Card swiped={()=>(this.handleDelete(message))} message={message} key={index}/>))}
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