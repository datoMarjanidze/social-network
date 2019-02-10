import React, { Component } from 'react'
import CoverImage from './CoverImage'
import ProfileImage from './ProfileImage'
import WritePost from './WritePost'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import interactWithOthersSrv from '../../../services/api/user/interactWithOthers'

class Profile extends Component{
    constructor(){
        super()
        this.addFriend = this.addFriend.bind(this)
    }
    addFriend(personID){
        interactWithOthersSrv.addFriend(this.props.user._id, personID)
    }
    render(){
        const user = {}
        user._id = this.props.user._id
        user.firstName = this.props.user.firstName
        user.lastName = this.props.user.lastName
        const thisProfileID = this.props.match.params.userID

        return(
            <div id="page-profile" style={{width: '400px', display:'inline-block'}}>
                <CoverImage thisProfileID={thisProfileID} userID={user._id}/>
                <ProfileImage thisProfileID={thisProfileID} userID={user._id}/>
                {/* <h3>{user.firstName} {user.lastName}</h3> */}
                {user._id !== thisProfileID ? 
                    <Button basic color="green" onClick={() => this.addFriend(thisProfileID)}>Add Friend</Button>
                    :
                    null}
                <WritePost />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user
    }
} 
export default connect(mapStateToProps)(Profile)