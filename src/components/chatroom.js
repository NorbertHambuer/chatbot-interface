import React, {Component} from 'react';
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FadeIn from 'react-fade-in';

class Spinner extends Component {
    render() {
        return (
            <span className='spinme'>
                <div className='spinner'>
                    <div className='bounce1'></div>
                    <div className='bounce2'></div>
                    <div className='bounce3'></div>
                </div>
            </span>
        );
    }
}

class Message extends Component {
    render() {
        return (
            <li className={`message-${this.props.align} ms11`}>
                <div className='messageinner-ms11'>
                    <span className='message-text'>
                        {this.props.text === '' ? <Spinner></Spinner> : this.props.text}
                    </span>
                </div>
            </li>
        );
    }
}

export default class ChatRoom extends Component {
    constructor(props) {
        console.log("chatroom");
        super(props);
        this.state = {
            question: '',
            annimationStarted: false
        };
        this.sendQuestion = this.sendQuestion.bind(this);
    }

    inputValueChange(event) {
        this.setState({question: event.target.value});

        if (!this.state.annimationStarted) {
            this.setState({
                annimationStarted: true
            });
            this.props.addMessage({
                align: 'right',
                text: ''
            });
        }
    }

    sendQuestion(event) {
        if (event.key === 'Enter' && this.state.question !== "") {
            if (this.state.annimationStarted) {
                this.setState({
                    annimationStarted: false
                });
            }

            this.props.getResponse(this.state.question);
            this.setState({
                question: ''
            });
        }
    }

    render() {
        return (
            <FadeIn transitionDuration='800'>
                <div className='chatroom form-group'>
                    <div id='chatroomHeader'>
                        <h1 id='headerText'>Chatroom</h1>
                    </div>
                    <div id='chatroomBody'>
                        <ul id='message_list' className='chat-message-list'>
                            {this.props.messages.map((message, index) => <Message key={index} align={message.align}
                                                                                  text={message.text}/>)}
                        </ul>
                    </div>
                    <div id='chatroomInput'>
                        <input type="text" id='message' className='messageInput' placeholder='Type the message'
                               value={this.state.question}
                               autoComplete='off'
                               onChange={event => this.inputValueChange(event)}
                               onKeyDown={this.sendQuestion}/>
                    </div>
                </div>
            </FadeIn>
        )
    }
}