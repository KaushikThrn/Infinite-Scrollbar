import React from 'react';
import Card from './Card'

const MessageList=(props)=>{
    console.log(props)
    return props.messages.map(message=>(<Card message={message} />))
}
export default MessageList;