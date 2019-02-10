import React, { Component } from 'react'
import interactWithOthersSrv from '../../../services/api/user/interactWithOthers'
import { Segment, List, Image, Button } from 'semantic-ui-react'

export default class FriendList extends Component{
    constructor(){
        super()
        this.state = {
            friends: []
        }
        this.getFriends = this.getFriends.bind(this)
    }
    componentWillMount(){
        this.getFriends()
    }
    getFriends(){
        interactWithOthersSrv.getFriends(friends => {
            this.setState({
                friends: friends
            })
        })
    }
    render(){
        const { friends } = this.state
        
        return(
            <Segment floated='right' style={{
                width: '230px', 
                margin: '0px'
                }} >
                <List animated verticalAlign='middle'>
                    {friends.map(friend =>
                        <List.Item onClick={() => this.props.openChatTab('', friend)} key={friend._id}>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                            {/* <List.Content floated='right'>
                            </List.Content> */}
                            <List.Content>
                                <List.Header>
                                    {friend.firstName.charAt(0).toUpperCase() + friend.firstName.slice(1)}
                                    {' '}
                                    {friend.lastName.charAt(0).toUpperCase() + friend.lastName.slice(1)}
                                    <span
                                        style={{
                                            height: '6px',
                                            width: '6px', 
                                            position: 'absolute',
                                            marginLeft: '40px',
                                            marginTop: '5px',
                                            background: '#00cc00',
                                            borderRadius: '100px'}}>
                                    </span>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    )}
                </List>
            </Segment>
        )
    }
}