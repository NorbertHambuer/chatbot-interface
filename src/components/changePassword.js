import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {Component} from "react";
import axios from "axios";
import servConfig from "../server_config";
import UserProfile from "../userProfile";
import history from "./history";

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            confirm_password: ""
        };
    }

    validateForm() {
        return this.state.password.length > 0 && this.state.confirm_password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    changePassword = event => {
        event.preventDefault();

        if (this.state.password === this.state.confirm_password) {
            var bodyFormData = new FormData();
            bodyFormData.set('password', this.state.password);
            bodyFormData.set('token', this.props.match.params.token);

            axios.post(`${servConfig}reset_password`, bodyFormData, {withCredentials: true})
                .then(res => {
                    if (res.data.user_id) {
                        UserProfile.setId(res.data.user_id);
                        localStorage.setItem('csrf_token', res.data.csrf_token);
                        this.props.loginUpdate();
                        history.push('/main');
                    } else {
                        console.log("login failed!");
                    }
                });
        }else{
            alert("Passwords mismatch!")
        }
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
                    <div className="ResetPasswordForm">
                        <form onSubmit={this.changePassword}>
                            <FormGroup controlId="password">
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="confirm_password">
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.confirm_password}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                size="lg"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Change password
                            </Button>
                        </form>

                    </div>
            </ReactCSSTransitionGroup>
        )
    }
}