import React, {Component} from 'react';
import axios from "axios";
import UserProfile from '../userProfile'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './chat_2.png'
import Image from 'react-bootstrap/Image'
import servConfig from "../server_config"
import ChatRoom from "./chatroom.js"

export default class ChatbotAddInterface extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            bot_id: 0,
            messages: []
        };
    }

    openChatRoom(bot_id) {
        if(bot_id !==0) {
            this.setState({active: !this.state.active});

            if (!this.state.active && this.state.messages.length === 0) {
                this.addMessage({
                    align: 'left',
                    text: 'Enter your question.'
                });
            } else {
                this.setState({
                    messages: []
                });
            }
        }
    }

    getResponse(question) {
        if(this.state.messages[this.state.messages.length - 2].text === 'Enter your question.'){
            this.changeLastMessage(question);

            this.addMessage({
                align: 'left',
                text: 'Enter the response'});
        }else{
            this.changeLastMessage(question);
            this.addMessage({
                align: 'left',
                text: 'Enter your question.'
            });

            let question_answer = [this.state.messages[this.state.messages.length - 3].text, question];

           /* axios.get(`${servConfig}get_response?user_id=${UserProfile.getId()}&bot_id=${this.props.bot_id}&question=${question}`, {withCredentials: true})
                .then(response => {
                    this.addMessage({
                        align: 'left',
                        text: response.data.answer});
                });*/
        }


    }

    addMessage(message) {
        const messageList = this.state.messages.concat(message);
        this.setState({
            messages: messageList
        });
    }

    changeLastMessage(text) {
        const messageList = [...this.state.messages];

        messageList[messageList.length - 1].text = text;

        this.setState({
            messages: messageList
        });
    }

    render() {
        return (
            <div id='chatbotComponent'>
                {this.state.active &&
                <ChatRoom messages={this.state.messages} addMessage={(message) => this.addMessage(message)} getResponse={(question) => this.getResponse(question)}/>}
                <div className='chatbotButton'>
                    <Image src={logo} roundedCircle className='chatbotIcon'
                           onClick={() => this.openChatRoom(this.props.bot_id)}/>
                </div>
            </div>
        )
    }
}