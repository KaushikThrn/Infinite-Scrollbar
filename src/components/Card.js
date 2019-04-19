import React from 'react';

const Card=(props)=>{
    const {content,updated,author}=props.message
    return ( 
    <div className="card-container" draggable>
        <div className="author-container">
            <div className="image-container">
                <img src={`http://message-list.appspot.com/${author.photoUrl}`} alt="thumbnail" className="author-image" />
            </div>
            <div className="author-details">
                <span className="author-details__name">{author.name}</span>
                <span className="author-details__updated">{updated}</span>
            </div>
        </div>
        <div className="message-content">{content}</div>
    </div> 
    )
}

export default Card;