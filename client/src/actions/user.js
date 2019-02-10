export const USER_SET_ID = 'USER_SET_ID'
export const USER_SET_FIRSTNAME = 'USER_SET_FIRSTNAME'
export const USER_SET_LASTNAME = 'USER_SET_LASTNAME'

export const userSetID = _id => {
    return{
        type: USER_SET_ID,
        payload: _id
    }
}
export const userSetFirstName = firstName => {
    return{
        type: USER_SET_FIRSTNAME,
        payload: firstName
    }
}
export const userSetLastName = lastName => {
    return{
        type: USER_SET_LASTNAME,
        payload: lastName
    }
}