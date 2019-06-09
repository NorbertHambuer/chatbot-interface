import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React, {Component} from "react";

export default class LostForm extends Component {
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
                            <div>
                                <button id="login_btn" type="button" className="btn btn-link"
                                        onClick={() => this.props.transition('lostVisible', 'loginVisible')}>Login
                                </button>
                                <button id="login_register_btn" type="button" className="btn btn-link"
                                        onClick={() => this.props.transition('lostVisible', 'registerVisible')}>Register
                                </button>
                            </div>
                        </form>

                    </div>
                    : null}
            </ReactCSSTransitionGroup>
        )
    }
}