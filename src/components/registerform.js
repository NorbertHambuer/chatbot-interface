import axios from "axios";
import UserProfile from "../userProfile";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {Component} from "react";
import servConfig from "../server_config"

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            company: "",
            email: "",
            password: "",
            passwordConfirm: "",
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

    registerUser() {
        var bodyFormData = new FormData();
        bodyFormData.set('username', this.state.username);
        bodyFormData.set('first_name', this.state.firstName);
        bodyFormData.set('last_name', this.state.lastName);
        bodyFormData.set('company', this.state.company);
        bodyFormData.set('email', this.state.email);
        bodyFormData.set('password', this.state.password);

        if (this.state.password === this.state.passwordConfirm) {
            axios.post(`${servConfig}register`, bodyFormData, {withCredentials: true})
                .then(res => {
                    UserProfile.setId(res.data.user_id);
                    this.props.redirect();
                });
        }
    }

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
                            <FormGroup controlId="firstName">
                                <FormLabel>First name</FormLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="lastName">
                                <FormLabel>Last name</FormLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="company">
                                <FormLabel>Company</FormLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.company}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="email">
                                <FormLabel>E-mail</FormLabel>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
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
                            <FormGroup controlId="passwordConfirm">
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.passwordConfirm}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                size="lg"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Register
                            </Button>
                            <div>
                                <button id="login_lost_btn" type="button" className="btn btn-link"
                                        onClick={() => this.props.transition('registerVisible', 'lostVisible')}>Lost
                                    Password?
                                </button>
                                <button id="login_register_btn" type="button" className="btn btn-link"
                                        onClick={() => this.props.transition('registerVisible', 'loginVisible')}>Login
                                </button>
                            </div>
                        </form>

                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        )
    }
}