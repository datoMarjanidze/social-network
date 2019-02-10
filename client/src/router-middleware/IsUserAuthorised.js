import React from 'react'
import AuthPage from '../components/pages/Auth'

const IsUserAuthorised = props => (
    <div>
        <AuthPage requestedPage={props.requestedPage} {...props} />
    </div>
)

export default IsUserAuthorised