import React from 'react'
import ChatTab from './ChatTab'
import { connect } from 'react-redux'

const ChatTabs = props => (
    <ul style={{listStyle: 'none'}}>
        {props.chatTabs.map(chatTab => (
            <li key={chatTab._id}><ChatTab chatTabData={chatTab} /></li>
        ))}
    </ul>
)

const mapStateToProps = state => {
    return{
        chatTabs: state.chatSidebar.chatTabs
    }
}
export default connect(mapStateToProps)(ChatTabs)