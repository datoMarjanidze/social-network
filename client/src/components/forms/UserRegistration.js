import React, { Component } from 'react'
import UserRegistrationSrv from '../../services/api/user/registration'
import UserLoginSrv from '../../services/api/user/login'
import { Input, Button, Grid, Header, Image, Form, Segment, Message } from 'semantic-ui-react'

export default class UserRegistrationForm extends Component{
    constructor(){
        super()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputStatus = this.handleInputStatus.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.state = {
            inputs: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            statuses: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            submitBtnLocked: false
        }
    }
    handleInputChange(event){
        let inputName = event.target.name
        let inputValue = (event.target.value).toLowerCase()

        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [inputName]: inputValue
            }
        }))
    }
    handleInputStatus(event){
        event.persist()
        let inputName = event.target.name
        let inputValue = this.state.inputs[inputName]
        
        UserRegistrationSrv.validateSingleInput(inputName, inputValue, (err, status) => {
            if(!err)
                this.setState(prevState => ({
                    statuses: {
                        ...prevState.statuses,
                        [inputName]: status
                    }
                }),
                () => {
                    let output = document.querySelector(`#form-user-registration output.${inputName}`)
                    output.innerText = this.state.statuses[inputName]
                })
            else
                console.error(`UserRegistration: ${err}`)
        })
    }
    submitForm(event){
        event.preventDefault()
        
        if(!this.state.submitBtnLocked){
            const { inputs, statuses } = this.state
            UserRegistrationSrv.validateAllInputs(inputs, statuses, (errors, statuses) => {
                var err = false
                errors.forEach(e => e !== null ? err = true : false)
                if(!err)
                    this.setState(prevState => ({
                        statuses
                    }),
                    () => {
                        const { statuses } = this.state
                        let output = document.querySelectorAll('#form-user-registration output'), 
                        key, i = 0, credentialsAreValid = true
                        
                        for(key in statuses){
                            if(statuses[key] !== ''){
                                output[i++].innerText = statuses[key]
                                credentialsAreValid = false
                            }
                        }
                        if(credentialsAreValid){
                            this.setState({
                                submitBtnLocked: false
                            })
                            UserRegistrationSrv.createNewUser(inputs, (err, created, userID) => {
                                if(!err){
                                    if(created)
                                        UserLoginSrv.validateAllInputs(this.state.inputs.email, this.state.inputs.password, (err, status) => {
                                            if(!err){
                                                if(!status)
                                                    window.location.replace(`/profile/${userID}`)
                                            }
                                            else
                                                console.error(`UserLogin: ${err}`)
                                        })
                                }
                                else
                                    console.error(`User registration: ${err}`)
                            })
                        }
                    })
                else
                    console.error(`UserRegistration: ${errors}`)
            })
        }
    }
    render(){
        return(
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='green' textAlign='center'>
                        Create a new account
                    </Header>
                    <Form className="ui form" id="form-user-registration" onSubmit={this.submitForm} size='large'>
                        <Segment stacked>
                            <Form.Input
                                name="firstName"
                                type="text"
                                placeholder="First name"
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputStatus}
                                maxLength="15"
                                autoComplete="off" />
                            <output style={{color: '#B03060'}} className="firstName" />

                            <Form.Input 
                                name="lastName" 
                                type="text" 
                                placeholder="Last name"
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputStatus}
                                maxLength="15"
                                autoComplete="off" />
                            <output style={{color: '#B03060'}} className="lastName" />

                            <Form.Input 
                                name="email" 
                                type="text" 
                                placeholder="Email"
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputStatus}
                                maxLength="30"
                                autoComplete="off" />
                            <output style={{color: '#B03060'}} className="email" />

                            <Form.Input 
                                name="password" 
                                type="password" 
                                placeholder="Password"
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputStatus}
                                maxLength="40"
                                autoComplete="off" />
                            <output style={{color: '#B03060'}} className="password" />

                            <Form.Input 
                                name="confirmPassword" 
                                type="password" 
                                placeholder="Re-enter the password"
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputStatus}
                                maxLength="40"
                                autoComplete="off" />
                            <output style={{color: '#B03060'}} className="confirmPassword" />

                            <Button fluid size='large' type="submit" form="form-user-registration" basic color='green'>Sign up</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}