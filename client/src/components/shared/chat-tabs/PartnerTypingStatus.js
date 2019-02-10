import React from 'react'

const Typing = () => (
    <img style={{width:'100%'}} src="/assets/images/chat-tab-events/typing.gif" alt="Typing" />
)

const PartnerTypingStatus = props => {
    if(props.typingEventName === '')
        return null
    else if(props.typingEventName === 'typing')
        return <Typing />
}

export default PartnerTypingStatus