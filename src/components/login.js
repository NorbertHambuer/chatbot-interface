import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import "./login.css";
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            toIndex: false
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.set('username', this.state.username);
        bodyFormData.set('password', this.state.password);

        axios.post(`http://127.0.0.1:5000/login`, bodyFormData)
            .then(res => {
                var bodyFormData = new FormData();
                bodyFormData.set('username', this.state.username);
                bodyFormData.set('password', this.state.password);

                axios.get(`http://127.0.0.1:5000/get_user_bots?user_id=2`,{  withCredentials: true})
                    .then(res => res => this.setState(() => ({
                        toIndex: true
                    })));
            });
    };

    render() {
        if (this.state.toIndex === true) {
            return <Redirect to='/main'/>;
        }
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        size="lg"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}