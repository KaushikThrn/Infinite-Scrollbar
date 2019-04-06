import axios from 'axios';

export const fetchMessages=()=>{
    return (dispatch)=>{
        axios.get("http://message-list.appspot.com/messages").then((data)=>{
            console.log("response is",data);
        })
    }
}