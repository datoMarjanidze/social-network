import React, { Component } from 'react'
import { createChatTab, appendMsgToTab } from '../../../actions/chatSidebar'
import { connect } from 'react-redux'
import FriendList from './FriendList'
import chatSrv from '../../../services/api/user/chat'

/*
*This component controls chat service and functionallity
**/

class ChatSidebar extends Component{
    constructor(){
        super()
        this.openChatTab = this.openChatTab.bind(this)
    }
    openChatTab(msg, person){
        var chatTabIsOpened = this.props.chatSidebar.chatTabs.find(chatTab => chatTab._id === person._id)

        if(chatTabIsOpened === undefined) // Checking if tab exists, to prevent same tab opening more then once
            this.props.createChatTab(person._id, person.firstName, person.lastName)
    }
    listenToMessages(){
        chatSrv.listenToMessages((msg, from) => {
            var chatTabExists = false
            this.props.chatSidebar.chatTabs.forEach(chatTab => {
                if(chatTab._id === from._id)
                    chatTabExists = true
            })
            if(chatTabExists)
                this.props.appendMsgToTab(from._id, {authorID: from._id, msg: msg})
            else
                this.openChatTab({authorID: from._id, msg: msg}, from)
        })
    }
    componentDidMount(){
        this.listenToMessages()
    }
    render(){
        return(
            <FriendList openChatTab={this.openChatTab}/>
        )
    }
}


const mapStateToProps = state => {
    return{
        chatSidebar: state.chatSidebar
    }
}
const mapDispatchToProps = dispatch => {
    return{
        createChatTab: (_id, firstName, lastName, conversation) => {
            dispatch(createChatTab(_id, firstName, lastName, conversation))
        },
        appendMsgToTab: (tabID, msg) => {
            dispatch(appendMsgToTab(tabID, msg))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatSidebar)