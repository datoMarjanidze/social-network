import React, { Component } from 'react'
import UserLoginSrv from '../../services/api/user/login'
import { Input, Menu, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class UserLogin extends Component{
    constructor(){
        super()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.state = {
            menu: {
                activeItem: 'home'
            },
            inputs: {
                email: '',
                password: '',
            },
            status: '',
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
    submitForm(event){
        event.preventDefault()
        
        if(!this.state.submitBtnLocked){
            const { email, password } = this.state.inputs

            UserLoginSrv.validateAllInputs(email, password, (err, status) => {
                if(!err){
                    this.setState( () => ({
                        status: status
                    }),
                    () => {
                        const { status } = this.state

                        if(status){
                            let output = document.querySelector('#form-user-login output')
                            output.innerText = status
                        }
                        else{
                            this.setState({
                                submitBtnLocked: true
                            })
                            window.location.reload()
                        }
                    })
                }
                else
                    console.error(`UserLogin: ${err}`)
            })
        }
    }
    render(){
        return(
            <Menu>
                <Link to="/">
                    <Menu.Item>
                        <Image src="/assets/images/components/shared/header/logo.png" avatar />
                    </Menu.Item>
                </Link>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <form id="form-user-login" onSubmit={this.submitForm}>
                            <Input
                                style={{marginRight: '5px'}}
                                name="email" 
                                type="text"
                                placeholder="Email"
                                onChange={this.handleInputChange}
                                maxLength="30" 
                                autoComplete='email'
                                icon='user' />

                            <Input 
                                style={{marginRight: '5px'}}
                                name="password"
                                type="password" 
                                placeholder="Password"
                                onChange={this.handleInputChange}
                                maxLength="40"
                                autoComplete="true"
                                icon='lock' />
                            
                            <output />
                            <Button
                                basic 
                                color='green' 
                                content='Login' 
                                type="submit" 
                                form="form-user-login" />
                        </form>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}