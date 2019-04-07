import React from 'react';
import Card from './Card'

const MessageList=(props)=>{
    console.log(props)
    return(
        <div className="message-list">
            {props.messages.map(message=>(<Card message={message} key={message.id}/>))}
        </div>
    )
}
export default MessageList;