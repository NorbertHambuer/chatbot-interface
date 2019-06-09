import React, {Component} from "react";
import "./login.css";
import logo from '../assets/img/bot_login.png'
import LoginForm from './loginform'
import LostForm from './lostform'
import RegisterForm from './registerform'
import history from './history';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginVisible: true,
            lostVisible: false,
            registerVisible: false
        };

        this.transition.bind(this);
    };

    transition(oldForm, newForm) {
        this.setState({[oldForm]: false});
        this.setState({[newForm]: true});
    };

    redirect() {
        this.props.loginUpdate();
        history.push('/main');
    }

    render() {
        return (
            <div id='loginFrame' className='col-sm-4 offset-sm-4'>
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