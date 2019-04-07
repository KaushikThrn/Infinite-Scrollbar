import React, {Component} from 'react';
import {fetchMessages,fetchNextMessages} from '../actions/index.js';
import {connect} from 'react-redux';
import Header from './Header';

class Blog extends Component {
    state={messages:[]}

    componentDidMount(){
        this.props.dispatch(fetchMessages())
        this.setState({messages:this.props.messages})
    }

    addMessages=()=>{
        console.log("pressed");
        this.props.dispatch(fetchNextMessages(this.props.state.token))
        this.setState({messages:this.props.messages})
    }

    render(){
        return(
            <div>
                <Header />
                <button onClick={this.addMessages}>add more</button>
            </div>
            )
    }
}

function mapStateToProps(state){
    return {
        messages:state.messages
    }
}
  
  export default connect(mapStateToProps)(Blog);