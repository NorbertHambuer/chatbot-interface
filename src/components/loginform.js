import axios from "axios";
import UserProfile from "../userProfile";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {Component} from "react";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            toIndex: props.toIndex
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    loginUser = event => {
        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.set('username', this.state.username);
        bodyFormData.set('password', this.state.password);

        axios.post(`http://127.0.0.1:5000/login`, bodyFormData, {withCredentials: true})
            .then(res => {
                UserProfile.setId(res.data.user_id);
                localStorage.setItem('csrf_token', res.data.csrf_token);
                this.props.redirect();
            });
    };

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={10}
                transitionName='loadComponent'
            >
                {this.props.visible ?
                    <div className="LoginForm">
                        <form onSubmit={this.loginUser}>
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
                            <div>
                                <button id="login_lost_btn" type="button" className="btn btn-link"
                                        onClick={() => this.props.transition('loginVisible', 'lostVisible')}>Lost
                                    Password?
                                </button>
                                <button id="login_register_btn" type="button" className="btn btn-link"
                                        onClick={() => this.props.transition('loginVisible', 'registerVisible')}>Register
                                </button>
                            </div>
                        </form>

                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        )
    }
}