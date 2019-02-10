import io from 'socket.io-client'

const chat = {
    chatNamespaceCreated: false,
    chatNamespace: null,
    getChatNamespace: function(){
        if(!this.chatNamespaceCreated){
            this.chatNamespace = io('/chat', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            'socket-token': window.localStorage.getItem('jwToken')
                        }
                    }
                }
            })
            this.chatNamespaceCreated = true
            return this.chatNamespace
        }
        else
            return this.chatNamespace
    },
    sendMsg: function(msg, personID){
        const chatNamespace = this.getChatNamespace()
        chatNamespace.emit('msg', msg, personID)
    },
    listenToMessages: function(callback){
        const chatNamespace = this.getChatNamespace()
        chatNamespace.on('msg', (msg, from) => callback(msg, from))
    },
    catchTypingEvents: function(callback){
        const chatNamespace = this.getChatNamespace()
        chatNamespace.on('typing', () => {callback('typing')})
    },
    clearingTypedText: function(partnerID){
        const chatNamespace = this.getChatNamespace()
        chatNamespace.emit('typing', partnerID)
    },
    getChatTabConversation: function(partnerID, callback){
        const chatNamespace = this.getChatNamespace()
        chatNamespace.emit('get-conversation', partnerID)
        chatNamespace.on('get-conversation', conversation => callback(conversation))
    }
}

export default chat