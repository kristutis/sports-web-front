import * as actions from "../actionTypes"

export const login = (user) => {
    return {
        type: actions.LOGIN,
        payload: user
    }
}

export const logout = () => {
    localStorage.clear()
    return {
        type: actions.LOGOUT
    }
}

export const isLogged = () => {
    return 
}