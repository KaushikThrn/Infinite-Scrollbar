import axios from 'axios';

export const addInitialData=(payload)=>{
    return{
        type:"GET_INITAL_DATA",
        payload
    }
}

export const addMessages=(payload)=>{
    return{
        type:"ADD_MESSAGES",
        payload
    }
}

export const fetchMessages=()=>{
    return (dispatch)=>{
        axios.get("http://message-list.appspot.com/messages").then((response)=>{
            console.log("response is",response);
            dispatch(addInitialData(response.data))
        })
    }
}

export const fetchNextMessages=(token)=>{
    return (dispatch)=>{
        axios.get(`http://message-list.appspot.com/messages?${token}`).then((response)=>{
            console.log("response is",response);
            dispatch(addMessages(response.data))
        })
    }
}