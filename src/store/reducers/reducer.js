import {
    SET_USER,
    LOGIN_ERROR,
    RESET_LOGIN_ERROR
} from '../actions/actionsTypes'

export const INITIAL_STATE = {
 };

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: action.error
            }
        }
        case RESET_LOGIN_ERROR: {
            return {
                ...state,
                loginError: ''
            }
        }
        default:
            return state
    }
}

export default Reducer