import * as actions from "../actionTypes"

const reducer = (state = {}, action) =>  {
    switch(action.type) {
        case actions.LOGIN:
            return {
                user: action.payload
            }
        case actions.LOGOUT: 
            return null
        default:
            return state
    }
}

export default reducer