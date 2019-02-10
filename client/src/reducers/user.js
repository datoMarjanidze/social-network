import { USER_SET_ID, USER_SET_FIRSTNAME, USER_SET_LASTNAME } from '../actions/user'

const rootReducer = (
    state = {
        _id: '',
        firstName: '',
        lastName: ''
    }, 
    action
) => {
    switch(action.type){
        case USER_SET_ID: 
            return Object.assign({}, {...state, _id: action.payload})
        case USER_SET_FIRSTNAME:
            return Object.assign({}, {...state, firstName: action.payload})
        case USER_SET_LASTNAME:
            return Object.assign({}, {...state, lastName: action.payload})    
        default:
            return state
    }
}

export default rootReducer