import React from 'react'

const UserList = props => (
    <ul>
        {props.users.map(user => (
            <li key={user._id}>{user.firstName} {user.lastName}</li>
        ))}
    </ul>
)

export default UserList