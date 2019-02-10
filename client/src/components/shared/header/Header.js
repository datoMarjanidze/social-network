import React from 'react'
import NavBar from '../header/nav-bar/NavBar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Header = props => (
    <header>
        {props.user._id !== '' ? 
            <NavBar user={props.user} /> : null}
    </header>
)

const mapStateToProps = state => {
    return{
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps)(Header))
