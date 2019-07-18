import React, {Component} from 'react';
import axios from "axios";
import UserProfile from '../userProfile'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './chat_2.png'
import Image from 'react-bootstrap/Image'
import history from "./history";
import servConfig from "../server_config"
import ChatRoom from "./chatroom.js"

class Bot extends Component {
    deleteBot(id){
        var token = localStorage.getItem('csrf_token');
        axios.delete(`${servConfig}bot?bot_id=${id}&user_id=${UserProfile.getId()}`, {withCredentials: true, headers: {'Content-Type' : 'application/json', "X-CSRF-TOKEN": token}}).then(response =>{
            this.props.delete(this.props.index);
        });
    }

    showStatistics(id){
        history.push(`/botStatistics/${id}`);
    }

    showQuestions(id){
        history.push(`/botQuestions/${id}`);
    }

    exportDocker(id){
        axios.get(`${servConfig}build_docker_img?user_id=${UserProfile.getId()}&bot_id=${id}`, {withCredentials: true})
            .then(response => {
                console.log(response);
            });
    }

    render() {
        const botDetails = this.props;
        return (
            <div className={`botButton row ${this.props.active === this.props.id ? 'active' : 'innactive'}`}>
                <div className="col-sm-4 botNameDiv">
                    <span className="botName">{botDetails.name}</span>
                </div>
                <div className="col-sm-8 row botButtonsDiv">
                    <div className="col-sm-2" onClick={() => this.deleteBot(botDetails.id)}><img className="img-bot" src={require(`../assets/img/delete.png`)} alt='Delete Bot' title='Delete bot'/></div>
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/docs.png`)} onClick={(id) => this.showQuestions(botDetails.id)} alt='Questions List' title='Questions List'/></div>
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/docker.png`)} onClick={(id) => this.exportDocker(botDetails.id)} alt='Export docker file' title='Export docker file'/></div>
                    <div className="col-sm-2"><img className="img-bot" src={require(`../assets/img/statistics.png`)} onClick={(id) => this.showStatistics(botDetails.id)} alt='Bot Statistics' title='Bot Statistics'/></div>
                    {this.props.active === this.props.id ? <div className="col-sm-2" onClick={() => this.props.setActive(this.props.id)}><img className="img-bot" src={require(`../assets/img/shutdown.png`)} alt='Toggle Bot Off' title='Toggle Bot Off'/></div> : <div className="col-sm-2" onClick={() => this.props.setActive(this.props.id)}><img className="img-bot" src={require(`../assets/img/start.png`)} alt='Toggle Bot On' title='Toggle Bot On'/></div>}


                </div>
            </div>
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
        if(bot_id !==0) {
            this.setState({active: !this.state.active});

            if (!this.state.active && this.state.messages.length === 0) {
                this.addMessage({
                    align: 'left',
                    text: ''
                });

                axios.get(`${servConfig}get_response?user_id=${UserProfile.getId()}&bot_id=${bot_id}&question=Hello`, {withCredentials: true})
                    .then(response => {
                        this.changeLastMessage(response.data.answer)
                    });
            } else {
                    this.setState({
                        messages: []
                    });
            }
        }
    }

    getResponse(question) {
        axios.get(`${servConfig}get_response?user_id=${UserProfile.getId()}&bot_id=${this.props.bot_id}&question=${question}`, {withCredentials: true})
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

/**Create new component for whole chatbot ui that takes a bot id as a parameter**/
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bots: [],
            active: 0
        };


    }

    addActiveClass(id) {
        if(this.state.active !== id)
            this.setState({active: id});
        else
            this.setState({active: 0})
    }

    deleteBot(index){
        let bots = [...this.state.bots];
        bots.splice(index, 1);
        this.setState({bots: bots});
    }

    componentDidMount(prevProps) {
        axios.get(`${servConfig}get_user_bots?user_id=${UserProfile.getId()}`, {withCredentials: true})
            .then(response => {
                this.setState({
                    bots: response.data.bots
                })
            });
    }

    render() {
        return (

            <div>
                {/*<NavigationBar/>*/}
                <div className="col-md-6 offset-md-3">
                    {this.state.bots.map((bot, index) => <Bot key={bot.id} index={index} active={this.state.active}
                                                              setActive={(id) => this.addActiveClass(id)}  delete={(index) => this.deleteBot(index)}     {...bot}/>)}
                </div>
                <Chatbot bot_id={this.state.active}></Chatbot>
            </div>

        )
    }
}