import React, {Component} from "react";
import logo from '../assets/img/bot_login.png'
import {Nav, Navbar} from "react-bootstrap";
import './navbar.css'
import {NavLink} from 'react-router-dom'
import history from './history';
export default class NavigationBar extends Component{
    changeRoute(status){
        console.log(history.location.pathname);
    }

    render() {
        return (

            <div>
                <Navbar bg="primary" variant="light">
                    <Navbar.Brand><img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Home"
                    /></Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink onClick={() => this.changeRoute(true)}  className='navLinkButton' to="/main">Home</NavLink>
                        <NavLink onClick={() => this.changeRoute(true)}  className='navLinkButton' to="/addbot">Create New Bot</NavLink>
                        <NavLink onClick={() => this.changeRoute(true)}  className='navLinkButton' to="/statistics">Statistics</NavLink>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}