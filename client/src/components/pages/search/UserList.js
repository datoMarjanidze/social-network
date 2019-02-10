import React from 'react'

const UserList = props => (
    <ul>
        {props.users.map(user => (
            <li key={user._id}>
                {user.firstName} {user.lastName}
                {props.myID !== user._id ? 
                    <button onClick={() => props.addFriend(user._id)}>Add Friend</button>
                    :
                    null
                }
            </li>
        ))}
    </ul>
)

export default UserList