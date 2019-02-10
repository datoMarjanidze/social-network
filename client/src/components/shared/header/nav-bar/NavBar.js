import React, { Component } from 'react'
import UserLogoutSrv from '../../../../services/api/user/logout'
import Search from './search/Search'
import { Menu, Image } from 'semantic-ui-react'
import { Link  } from 'react-router-dom'

export default class NavBar extends Component{
    constructor(){
        super()
        this.state = {
            // menu: {
            //     activeItem: 'home'
            // }
        }
    }
    logout(){
        UserLogoutSrv.logout()
    }
    render(){
        const { user } = this.props
        // const { activeItem } = this.state.menu


        return(
            // <ul>
            //     <li><NavLink to="/" exact activeClassName="selected">Home</NavLink ></li>
            //     <li><Search /></li>
            //     <li><NavLink to={`/profile/${user._id}`} exact activeClassName="selected">{user.firstName} {user.lastName}</NavLink ></li>
            //     <li onClick={() => this.logout()}>Log out</li>
            // </ul>
            <Menu style={{marginBottom: '3px'}}>
                <Link to="/">
                    <Menu.Item>
                        <Image src="/assets/images/components/shared/header/logo.png" avatar />
                    </Menu.Item>
                </Link>

                <Menu.Item>
                    <Search />
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Link to={`/profile/${user._id}`}>
                            <Image src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' avatar />
                            <span style={{color: '#00cc00', marginLeft: '8px'}}>{user.firstName} {user.lastName}</span>
                        </Link >
                    </Menu.Item>

                    <Menu.Item
                        name="Logout"
                        onClick={() => this.logout()} />
                </Menu.Menu>
            </Menu>
        )
    }
}