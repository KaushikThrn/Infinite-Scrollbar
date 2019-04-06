export default function messages(state = {}, action) {
    switch (action.type) {
        case "GET_INITAL_DATA":
            return {
                ...state
            }
        case "ADD_MESSAGES":
            return {
                ...state,
                messages: state.messages.concat(action.messages)
            }
        default:
            return state
    }

}