import { 
    CHAT_SIDEBAR_CREATE_TAB_FULFILLED, 
    CHAT_SIDEBAR_APPEND_MSG_TO_TAB, 
    CHAT_SIDEBAR_DELETE_CHAT_TAB } from '../actions/chatSidebar'

var copiedState

const rootReducer = (
    state = {
        chatTabs: []
    },
    action
) => {
    switch(action.type){
        case CHAT_SIDEBAR_CREATE_TAB_FULFILLED:
            return Object.assign({}, {...state, chatTabs: [...state.chatTabs, action.payload]})
        case CHAT_SIDEBAR_APPEND_MSG_TO_TAB:
            copiedState = JSON.parse(JSON.stringify(state))
            copiedState.chatTabs.find(chatTab => chatTab._id === action.payload.tabID).conversation.push(action.payload.msg)
            return copiedState
        case CHAT_SIDEBAR_DELETE_CHAT_TAB:
            copiedState = JSON.parse(JSON.stringify(state))
            copiedState.chatTabs = copiedState.chatTabs.filter(chatTab => chatTab._id !== action.payload.tabID)
            return copiedState
        default:
            return state
    }
}

export default rootReducer