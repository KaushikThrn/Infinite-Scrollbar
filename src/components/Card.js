import React from 'react';

const Card=(props)=>{
    const {content,updated,author}=props.message
    return ( 
    <div className="card-container">
        <div className="author-container">
            <div className="image-container">
                <img src={`http://message-list.appspot.com/${author.photoUrl}`} alt="thumbnail" className="author-image" />
            </div>
            <div className="author-details">
                <span>{author.name}</span>
                <span>{updated}</span>
            </div>
        </div>
    </div> 
    )
}

export default Card;