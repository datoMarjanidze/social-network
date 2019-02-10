import chatSrv from '../services/api/user/chat'

const CHAT_SIDEBAR_CREATE_TAB = 'CHAT_SIDEBAR_CREATE_TAB'
export const CHAT_SIDEBAR_CREATE_TAB_FULFILLED = 'CHAT_SIDEBAR_CREATE_TAB_FULFILLED'
export const CHAT_SIDEBAR_APPEND_MSG_TO_TAB = 'CHAT_SIDEBAR_APPEND_MSG_TO_TAB'
export const CHAT_SIDEBAR_DELETE_CHAT_TAB = 'CHAT_SIDEBAR_DELETE_CHAT_TAB'



export const createChatTab = (_id, firstName, lastName) => {
    return dispatch => {
        dispatch({
            type: CHAT_SIDEBAR_CREATE_TAB,
            payload: new Promise((resolve, reject) => {
                chatSrv.getChatTabConversation(_id, conversation => {
                    resolve({
                        _id,
                        firstName,
                        lastName, 
                        conversation: conversation.reverse()
                    })
                })
            })
        })
    }
}
export const appendMsgToTab = (tabID, msg) => {
    return{
        type: CHAT_SIDEBAR_APPEND_MSG_TO_TAB,
        payload: {
            tabID,
            msg
        }
    }
}
export const deleteChatTab = tabID => {
    return{
        type: CHAT_SIDEBAR_DELETE_CHAT_TAB,
        payload: {
            tabID
        }
    }
}