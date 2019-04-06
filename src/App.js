import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import Blog from './components/Blog.js'

class App extends Component {
  render() {
    const store=createStore(reducers,{},applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
       <Blog />
      </Provider>
    );
  }
}

export default App;
