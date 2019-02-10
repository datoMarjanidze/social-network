import React, { Component } from 'react'
import UserLoginSrv from '../../services/api/user/login'
import UserLoginForm from '../forms/UserLogin'
import UserRegistrationForm from '../forms/UserRegistration'
import { connect } from 'react-redux'
import { userSetID, userSetFirstName, userSetLastName } from '../../actions/user'
import history from '../../components/history'

class Auth extends Component{
    constructor(props){
        super(props)
        this.jwTokenExistsNIsValid = this.jwTokenExistsNIsValid.bind(this)
        this.state = {
            checkingToken: true,
            tokenExistsNIsValid: false
        }
    }
    jwTokenExistsNIsValid(){
        UserLoginSrv.jwTokenExistsNIsValid()
            .then(data => {
                if(data !== '' && data.expired === false){
                    const { _id } = data.user
                    const firstName = data.user.firstName.charAt(0).toUpperCase() + data.user.firstName.substr(1)
                    const lastName = data.user.lastName.charAt(0).toUpperCase() + data.user.lastName.substr(1)
                    
                    this.props.userSetID(_id)
                    this.props.userSetFirstName(firstName)
                    this.props.userSetLastName(lastName)   

                    this.setState({
                        checkingToken: false,
                        tokenExistsNIsValid: true
                    })
                }
                else{
                    history().push('/')
                    this.setState({
                        checkingToken: false,
                    })
                }
            })
            .catch(err => {
                console.error(`jwTokenExistsNIsValid: ${err}`)
            })
    }
    componentDidMount(){
        this.jwTokenExistsNIsValid()
    }
    render(){
        const RequestedPage = this.props.requestedPage
        const { checkingToken, tokenExistsNIsValid } = this.state
        
        if(checkingToken)
            return <div>Loading(spinner)...</div>
        return(
            (
                tokenExistsNIsValid ? 
                    <RequestedPage {...this.props} /> 
                    : 
                    <div>
                        <UserLoginForm />
                        <UserRegistrationForm />
                    </div>
            ) 
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
        userSetID: _id => {
            dispatch(userSetID(_id))
        },
        userSetFirstName: firstName => {
            dispatch(userSetFirstName(firstName))
        },
        userSetLastName: lastName => {
            dispatch(userSetLastName(lastName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)