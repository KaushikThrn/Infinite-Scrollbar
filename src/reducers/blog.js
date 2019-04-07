export default function blog(state = {messages:[],token:""},action) {
    switch (action.type) {
        case "GET_INITAL_DATA":
            return {
                ...state,
                messages:action.payload.messages,
                token:action.payload.pageToken
            }
        case "ADD_MESSAGES":
            return {
                ...state,
                messages: state.messages.concat(action.payload.messages),
                token: action.payload.pageToken
            }
        default:
            return state
    }

}