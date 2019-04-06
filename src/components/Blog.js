import React, {Component} from 'react';
import {fetchMessages} from '../actions/index.js';
import {connect} from 'react-redux';

class Blog extends Component {

    componentDidMount(){
        this.props.dispatch(fetchMessages())
    }

    render(){
        return(
            <div>
                <h3>hello,this is a blog</h3>
            </div>
            )
    }
}

  
  export default connect()(Blog);