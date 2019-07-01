import React, {Component} from "react";
import axios from "axios";
import UserProfile from "../userProfile";
import servConfig from "../server_config"
import "./bot_questions.css";
import ChatbotAddInterface from "./addChatbotInterface"

class Question extends Component {
    render() {
        return (
            <div>
                <div className="statement col-md-6"><span>{this.props.question}</span></div>
                <div className="statement col-md-6"><span>{this.props.answer}</span></div>
            </div>
        )
    }
}

export default class QuestionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionsList: []
        }


    };

    componentDidMount(prevProps) {

        axios.get(`${servConfig}bot_questions?user_id=${UserProfile.getId()}&bot_id=${this.props.match.params.id}`, {withCredentials: true})
            .then(response => {
                this.setState({
                    questionsList: response.data
                });
                console.log(response);
            });
    }

    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3">
                    {this.state.questionsList.map((question, index) => <Question key={index} question={question[0]}
                                                                                 answer={question[1]}/>)}
                </div>
                <ChatbotAddInterface bot_id={this.props.match.params.id}></ChatbotAddInterface>
            </div>
        )
    }
}