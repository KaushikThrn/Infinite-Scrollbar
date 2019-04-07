import React from 'react';
import Card from './Card'

const MessageList=(props)=>{
    console.log(props)
    return(
        <div className="message-list">
            {props.messages.map((message, index)=>(<Card message={message} key={index}/>))}
        </div>
    )
}
export default MessageList;