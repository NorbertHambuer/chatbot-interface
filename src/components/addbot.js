import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import {Redirect} from 'react-router-dom'
import "./addbot.css";
import axios from 'axios';
import UserProfile from '../userProfile'
import NavigationBar from './navbar'

class KnowledgeItem extends Component{
    constructor(props) {
        super(props);

        this.state = {
            active: false,
        };
    }
    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };


    render(){
        return(
            <li className={this.state.active ? 'knowledgeItem': null}
                onClick={this.toggleClass.bind(this)}
            >
                {this.props.name}
            </li>
        )
    }
}

class KnowledgeSelector extends Component{
    constructor(props) {
        super(props);

        this.state = {
           knowledgeList: ['AI','Profile','Computers','Emotion','Food','Gossip','Greetings','Health','History','Humor','Literature','Money','Movies','Politics','Psychology','Science','Sports','Trivia'],
            showList: false
        };

        this.showList.bind(this);
    }

    showList(){
        this.setState({
            showList: !this.state.showList
        })
    }

    render(){
        return(
            <div id='knowledgeSelector'>
                <Button
                    block
                    size="lg"
                    type="button"
                    onClick={this.showList.bind(this)}
                >
                    Ai
                </Button>
                {this.state.showList ? <ul>
                    {this.state.knowledgeList.map((knowledge, index) => <KnowledgeItem key={index} name={knowledge}/>)}
                </ul> : null}
            </div>
        )
    }
}

export default class Addbot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            knowledge: [],
            toIndex: props.toIndex
        };
    }

    validateForm() {
        return this.state.name.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    addNewBot = event => {
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
        return (<div className="AddbotForm">
            <NavigationBar></NavigationBar>
            <form onSubmit={this.addNewBot}>
                <FormGroup controlId="name">
                    <FormLabel >Name</FormLabel>
                    <FormControl

                        autoFocus
                        type="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <KnowledgeSelector></KnowledgeSelector>
                <Button
                    block
                    size="lg"
                    disabled={!this.validateForm()}
                    type="button"
                >
                    Create
                </Button>
            </form>
        </div>)
    }
}