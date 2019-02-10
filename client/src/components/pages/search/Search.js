import React, { Component } from 'react'
import { findPerson } from '../../../services/api/search'
import interactWithOthersSrv from '../../../services/api/user/interactWithOthers'
import UserList from './UserList'
import { connect } from 'react-redux'

class SearchPage extends Component{
    constructor(){
        super()
        this.state = {
            users: []
        }
        this.addFriend = this.addFriend.bind(this)
    }
    setPushStateListener(callback){
        const pushState = window.history.pushState
        window.history.pushState = function(state) {
            setTimeout(() => {
                callback()
            })
            return pushState.apply(window.history, [...arguments])
        }
    }
    getQueryParam(){
        var queryParam

        window.location.search
        .substr(1)
        .split('&')
        .forEach(item => {
            queryParam = item.split('=')[1]
        })
        
        return queryParam
    }
    componentWillMount(){
        this.getUsers()
        this.setPushStateListener(() => {
            this.getUsers()
        })
    }
    getUsers(){
        findPerson(this.getQueryParam(), 0, 2, (err, users) => {
            if(!err){
                if(users.length !== 0)
                    this.setState({
                        users
                    })
                else
                    this.setState({
                        users: []
                    })
            }
            else
                console.error(`SearchPage: ${err}`)
        })
    }
    addFriend(personID){
        interactWithOthersSrv.addFriend(this.props.myID, personID)
    }
    render(){
        return(
            <UserList myID={this.props.myID} users={this.state.users} addFriend={this.addFriend}/>
        )
    }
}

const mapStateToProps = state => {
    return{
        myID: state.user._id
    }
}
export default connect(mapStateToProps)(SearchPage)