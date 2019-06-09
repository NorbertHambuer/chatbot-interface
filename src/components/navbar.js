import React, {Component} from "react";
import logo from '../assets/img/bot_login.png'
import {Nav, Navbar} from "react-bootstrap";

export default class NavigationBar extends Component{
    render() {

        return (
            <div>
                <Navbar bg="primary" variant="light">
                    <Navbar.Brand href="main"><img
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Home"
                    /></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="main">Home</Nav.Link>
                        <Nav.Link href="addbot">Create New Bot</Nav.Link>
                        <Nav.Link href="statistics">Statistics</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}