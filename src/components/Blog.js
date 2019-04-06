import React, {Component} from 'react';
import {fetchMessages,fetchNextMessages} from '../actions/index.js';
import {connect} from 'react-redux';

class Blog extends Component {

    componentDidMount(){
        this.props.dispatch(fetchMessages())
        console.log(this.props.state)
    }

    addMessages=()=>{
        console.log("pressed");
        this.props.dispatch(fetchNextMessages(this.props.state.token))
    }

    render(){
        return(
            <div>
                <h3>hello,this is a blog</h3>
                <button onClick={this.addMessages}>add more</button>
            </div>
            )
    }
}

function mapStateToProps(state){
    return {
        state:state
    }
}
  
  export default connect(mapStateToProps)(Blog);