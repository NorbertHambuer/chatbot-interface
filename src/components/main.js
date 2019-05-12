// index.component.js

import React, {Component} from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";
import UserProfile from '../userProfile'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './chat_2.png'
import Image from 'react-bootstrap/Image'
import FadeIn from 'react-fade-in';

class Bot extends Component {
    render() {
        const botDetails = this.props;
        return (
            <div>
                <Button
                    block
                    size="lg"
                    type="button"
                    className={`botButton ${this.props.active === this.props.id ? 'active' : 'innactive'}`}
                    onClick={() => this.props.setActive(this.props.id)}
                >
                    {botDetails.name}
                </Button>
            </div>
        )
    }
}


class ChatRoom extends Component {
    render() {
        return (
            <FadeIn transitionDuration='800'>
                <div className='chatroom form-group'>
                    <div id='chatroomHeader'>
                        <h1 id='headerText'>React simple chatbot</h1>
                    </div>
                    <div id='chatroomBody'></div>
                    <div id='chatroomInput'>
                        <input type="text" id='message' className='messageInput' placeholder='Type the message'/>
                    </div>
                </div>
            </FadeIn>
        )
    }
}


class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    render() {
        console.log(this.state.active);
        return (
            <div id='chatbotComponent'>
                {this.state.active && <ChatRoom/>}
                <div className='chatbotButton'>
                    <Image src={logo} roundedCircle className='chatbotIcon'
                           onClick={() => this.setState({active: !this.state.active})}/>
                </div>
            </div>
        )
    }
}

/*List with properties, if 1 BOT - align left, 2 Align right*/
/*Create new component for whole chatbot ui that takes a bot id as a parameter*/
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bots: [],
            active: 0
        };
    }

    addActiveClass(id) {
        this.setState({active: id});
    }

    componentDidMount(prevProps) {
        axios.get(`http://127.0.0.1:5000/get_user_bots?user_id=${UserProfile.getId()}`, {withCredentials: true})
            .then(response => {
                this.setState({
                    bots: response.data.bots
                })
            });
    }

    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3">
                    {this.state.bots.map((bot, index) => <Bot key={bot.id} index={index} active={this.state.active}
                                                              setActive={(id) => this.addActiveClass(id)}     {...bot}/>)}
                </div>
                <Chatbot></Chatbot>
            </div>

        )
    }
}