import React, { Component } from 'react'
import chatSrv from '../../../services/api/user/chat'
import { appendMsgToTab, deleteChatTab } from '../../../actions/chatSidebar'
import { connect } from 'react-redux'
import PartnerTypingStatus from './PartnerTypingStatus'
import { Segment, Grid, Divider } from 'semantic-ui-react'

const me = {
    background: 'rgb(119, 244, 66)',
    display: 'block',
    width: '60px',
    borderRadius: '8px',
    marginLeft: '24px'
}
const partner = {
    background: 'rgb(219, 217, 217)',
    display: 'block',
    width: '60px',
    borderRadius: '8px'
}
const ConversationBox = props => {
    var i = 0
    return props.conversation.map(conversationLine => (
        <span key={i++} style={props.myID === conversationLine.authorID ? me : partner}>{conversationLine.msg}</span>
    ))
}

class ChatTab extends Component{
    constructor(){
        super()
        this.sendMessage = this.sendMessage.bind(this)
        this.closeChatTab = this.closeChatTab.bind(this)
        this.catchTypingEvents = this.catchTypingEvents.bind(this)
        this.state = {
            partnerTypingEventName: '',
            typingStatusTimer: 0
        }
    }
    sendMessage(event){
        if(event.key === 'Enter'){
            const msg = event.target.value
            const partnerID = this.props.chatTabData._id
            chatSrv.sendMsg(msg, partnerID)
            this.props.appendMsgToTab(partnerID, {authorID: this.props.user._id, msg: msg})
            event.target.value = ''
        }
        else if(event.key !== 'Enter'){
            const partnerID = this.props.chatTabData._id
            chatSrv.clearingTypedText(partnerID)
        }
    }
    closeChatTab(){
        this.props.deleteChatTab(this.props.chatTabData._id)
    }
    catchTypingEvents(){
        chatSrv.catchTypingEvents(eventName => {
            if(eventName === 'typing')
                this.setState({
                    partnerTypingEventName: 'typing'
                },
                () => {
                    if(this.state.typingStatusTimer > 0)
                        this.setState({
                            typingStatusTimer: 0
                        })
                    else
                        var interval = setInterval(() => {
                            if(this.state.typingStatusTimer > 500){
                                this.setState({
                                    typingStatusTimer: 0,
                                    partnerTypingEventName: ''
                                })
                                clearInterval(interval)
                            }
                            else
                                this.setState(prevState => ({
                                    typingStatusTimer: prevState.typingStatusTimer + 1
                                }))
                        }, 1)
                })
        })
    }
    componentDidMount(){
        this.catchTypingEvents()
    }
    render(){
        const { chatTabData } = this.props

        return(
            // <Segment style={{width: '280px', padding: '0px'}}>
            //     {/* <div style={{width: '280px'}}>
            //         {chatTabData.firstName} {chatTabData.lastName}
            //     </div> */}
            //     <Grid columns={2} style={{width: '280px'}}>
            //         <Grid.Row>
            //             <Grid.Column>
            //                 <b>
            //                     {chatTabData.firstName.charAt(0).toUpperCase() + chatTabData.firstName.slice(1)}
            //                     {' '}
            //                     {chatTabData.lastName.charAt(0).toUpperCase() + chatTabData.lastName.slice(1)}
            //                 </b>
            //             </Grid.Column>
            //             <Grid.Column style={{textAlign: 'right'}}>
            //                 X
            //             </Grid.Column>
            //         </Grid.Row>
            //         <div style={{width: '100%', height: '200px', border: '1px solid grey'}}></div>
            //     </Grid>
            // </Segment>

            <ul style={{border: '1px solid grey', width: '280px', height: '400px'}}>
                <li>{chatTabData.firstName} {chatTabData.lastName} </li>
                <li onClick={this.closeChatTab}>X</li>
                <li style={{height: '200px', overflow: 'scroll'}}><ConversationBox conversation={chatTabData.conversation} myID={this.props.user._id}/></li>
                <li style={{height: '100px'}}><PartnerTypingStatus typingEventName={this.state.partnerTypingEventName}/></li>
                <li>
                    <input 
                        name="messageInput" 
                        onKeyDown={this.sendMessage}
                        placeholder="Type a message" />
                </li>
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch => {
    return{
        appendMsgToTab: (tabID, msg) => {
            dispatch(appendMsgToTab(tabID, msg))
        },
        deleteChatTab: (tabID) => {
            dispatch(deleteChatTab(tabID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatTab)