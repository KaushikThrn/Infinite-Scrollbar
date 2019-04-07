const updateAuthorDate=(messages)=>{
    return messages.map(message=>{
        let updatedDate=new Date(message.updated);
        let currentDate=new Date();
        let diff=Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(updatedDate.getFullYear(), updatedDate.getMonth(), updatedDate.getDate()) ) /(1000 * 60 * 60 * 24));
        message.updated=`${diff} days ago`;
        return message;
    })
}


export default function blog(state = {messages:[],token:""},action) {
    switch (action.type) {
        case "GET_INITAL_DATA":
            action.payload.messages=updateAuthorDate(action.payload.messages);
            return {
                ...state,
                messages:action.payload.messages,
                token:action.payload.pageToken
            }
        case "ADD_MESSAGES":
            action.payload.messages=updateAuthorDate(action.payload.messages);
            return {
                ...state,
                messages: state.messages.concat(action.payload.messages),
                token: action.payload.pageToken
            }
        default:
            return state
    }

}