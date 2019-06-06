import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import "./login.css";
import axios from 'axios';
import UserProfile from '../userProfile'
import logo from '../assets/img/bot_login.png'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LoginForm extends Component {
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
                this.props.redirect();
            });
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
                        <div>
                            <button id="login_lost_btn" type="button" className="btn btn-link"
                                    onClick={() => this.props.transition('loginVisible', 'lostVisible')}>Lost Password?
                            </button>
                            <button id="login_register_btn" type="button" className="btn btn-link"
                                    onClick={() => this.props.transition('loginVisible', 'registerVisible')}>Register
                            </button>
                        </div>
                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        )
    }
}

class LostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };
    }

    sendPasswordRecovery() {

    }

    validateForm() {
        return this.state.email.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
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
                    <div className="LostForm">
                        <form onSubmit={this.sendPasswordRecovery}>
                            <FormGroup controlId="email">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                size="lg"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Send
                            </Button>
                        </form>
                        <div>
                            <button id="login_btn" type="button" className="btn btn-link"
                                    onClick={() => this.props.transition('lostVisible', 'loginVisible')}>Login
                            </button>
                            <button id="login_register_btn" type="button" className="btn btn-link"
                                    onClick={() => this.props.transition('lostVisible', 'registerVisible')}>Register
                            </button>
                        </div>
                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        )
    }
}

class RegisterForm extends Component {
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
            axios.post(`http://127.0.0.1:5000/register`, bodyFormData, {withCredentials: true})
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
                            <FormGroup controlId="firstname">
                                <FormLabel>First name</FormLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="lastname">
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
                        </form>
                        <div>
                            <button id="login_lost_btn" type="button" className="btn btn-link"
                                    onClick={() => this.props.transition('registerVisible', 'lostVisible')}>Lost
                                Password?
                            </button>
                            <button id="login_register_btn" type="button" className="btn btn-link"
                                    onClick={() => this.props.transition('registerVisible', 'loginVisible')}>Login
                            </button>
                        </div>
                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        )
    }
}


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginVisible: true,
            lostVisible: false,
            registerVisible: false,
            toIndex: false
        };

        this.transition.bind(this);
    };

    transition(oldForm, newForm) {
        this.setState({[oldForm]: false});
        this.setState({[newForm]: true});
    };

    redirect() {
        console.log("asd");
        this.setState(() => ({
            toIndex: true
        }))
    }

    render() {
        if (this.state.toIndex === true) {
            return <Redirect to='/main'/>;
        }
        return (
            <div id='loginFrame'>
                <div className="login-header" align="center">
                    <img className="img-circle" id="img_logo" src={logo} alt=''/>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </div>
                <LoginForm toIndex={this.state.toIndex} visible={this.state.loginVisible}
                           transition={this.transition.bind(this)} redirect={this.redirect.bind(this)}></LoginForm>
                <LostForm visible={this.state.lostVisible} transition={this.transition.bind(this)}></LostForm>
                <RegisterForm toIndex={this.state.toIndex} visible={this.state.registerVisible}
                              transition={this.transition.bind(this)}
                              redirect={this.redirect.bind(this)}></RegisterForm>
            </div>
        )
    }
}