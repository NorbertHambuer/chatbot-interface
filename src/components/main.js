import React, {Component} from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";
import UserProfile from '../userProfile'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './chat_2.png'
import Image from 'react-bootstrap/Image'
import FadeIn from 'react-fade-in';
import NavigationBar from './navbar'


{/*<Button
    block
    size="lg"
    type="button"
    className={`botButton ${this.props.active === this.props.id ? 'active' : 'innactive'}`}
    onClick={() => this.props.setActive(this.props.id)}
>
    {botDetails.name}
</Button>*/}

class Bot extends Component {

    render() {
        const botDetails = this.props;
        return (
            <div class="botButton row">
                <div className="col-sm-4 botNameDiv">
                    <span className="botName">{botDetails.name}</span>
                </div>
                <div className="col-sm-8 row botButtonsDiv">
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/delete.png`)} alt=''/></div>
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/docs.png`)} alt=''/></div>
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/docker.png`)} alt=''/></div>
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/statistics.png`)} alt=''/></div>
                    <div  className="col-sm-2"><img className="img-bot" src={require(`../assets/img/start.png`)} alt=''/></div>
                    {/*<img className="img-bot" src={require(`../assets/img/docs.png`)} alt=''/>
                    <img className="img-bot" src={require(`../assets/img/docker.png`)} alt=''/>
                    <img className="img-bot" src={require(`../assets/img/statistics.png`)} alt=''/>
                    <img className="img-bot" src={require(`../assets/img/shutdown.png`)} alt=''/>
                    <img className="img-bot" src={require(`../assets/img/start.png`)} alt=''/>*/}

                </div>
            </div>
        )
    }
}


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

class ChatRoom extends Component {
    constructor(props) {
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
        if (event.key === 'Enter') {
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

    /*onFocus={}*/

    render() {
        return (
            <FadeIn transitionDuration='800'>
                <div className='chatroom form-group'>
                    <div id='chatroomHeader'>
                        <h1 id='headerText'>React simple chatbot</h1>
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


class Chatbot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            bot_id: 0,
            messages: []
        };
    }

    openChatRoom(bot_id) {
        this.setState({active: !this.state.active});

        this.addMessage({
            align: 'left',
            text: ''
        });

        if (!this.state.active) {
            axios.get(`http://127.0.0.1:5000/get_response?user_id=${UserProfile.getId()}&bot_id=${bot_id}&question=Hello`, {withCredentials: true})
                .then(response => {
                    this.changeLastMessage(response.data.answer)
                });
        } else {
            console.log("closed");
        }
    }

    getResponse(question) {
        axios.get(`http://127.0.0.1:5000/get_response?user_id=${UserProfile.getId()}&bot_id=${this.props.bot_id}&question=${question}`, {withCredentials: true})
            .then(response => {
                this.changeLastMessage(question);
                this.addMessage({
                    align: 'left',
                    text: response.data.answer});
            });
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
                <NavigationBar/>
                <div className="col-md-6 offset-md-3">
                    {this.state.bots.map((bot, index) => <Bot key={bot.id} index={index} active={this.state.active}
                                                              setActive={(id) => this.addActiveClass(id)}     {...bot}/>)}
                </div>
                <Chatbot bot_id={this.state.active}></Chatbot>
            </div>

        )
    }
}