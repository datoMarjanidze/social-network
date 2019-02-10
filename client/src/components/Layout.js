import React from 'react'
import Header from './shared/header/Header'
import ChatSidebar from '../components/shared/chat-sidebar/ChatSidebar'
import ChatTabs from './shared/chat-tabs/ChatTabs'
import Footer from './shared/Footer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Layout = props => (
    <div>
        <Header />
        <main>
            {props.children}
        </main>
        {props.user._id !== '' ? <ChatSidebar /> : null}
        {props.user._id !== '' ? <ChatTabs /> : null}
        <Footer />
    </div>
)

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps)(Layout))