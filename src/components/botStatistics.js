import React, {Component} from "react";
import { Line, Polar, Doughnut } from 'react-chartjs-2';
import axios from "axios";
import UserProfile from "../userProfile";
import servConfig from "../server_config"

export default class BotStatistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mostAskedQuestions: {},
            mostAskedTopics: {},
            usageStats: {}
        }


    };

    componentDidMount(prevProps) {
        axios.get(`${servConfig}most_asked_questions?user_id=${UserProfile.getId()}&bot_id=${this.props.match.params.id}`, {withCredentials: true})
            .then(response => {
                let labels = response.data.map(question => question[0]);
                let data = response.data.map(question => question[1]);

                let dataset = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'My First dataset',
                            fill: false,
                            weight:10,
                            lineTension: 0.1,
                            backgroundColor: [
                                '#e34222',
                                '#E37215',
                                '#a9a233',
                                '#32CD32',
                                '#232AA9',
                                '#32a5a9',
                                '#a91b9e',
                                '#E0E308',
                                '#C6DDE3'
                            ],
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: data,
                        }
                    ]
                };
                this.setState({
                    mostAskedQuestions: dataset
                })
            });

        axios.get(`${servConfig}most_asked_topics_bot?user_id=${UserProfile.getId()}&bot_id=${this.props.match.params.id}`, {withCredentials: true})
            .then(response => {
                let labels = response.data.map(question => question[0]);
                let data = response.data.map(question => question[1]);

                let dataset = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'My First dataset',
                            fill: false,
                            weight:10,
                            lineTension: 0.1,
                            backgroundColor: [
                                '#e34222',
                                '#E37215',
                                '#a9a233',
                                '#32CD32',
                                '#232AA9',
                                '#32a5a9',
                                '#a91b9e',
                                '#E0E308',
                                '#C6DDE3'
                            ],
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: data
                        }
                    ]
                };
                this.setState({
                    mostAskedTopics: dataset
                })
            });

        axios.get(`${servConfig}bot_usage?user_id=${UserProfile.getId()}&bot_id=${this.props.match.params.id}`, {withCredentials: true})
            .then(response => {
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                let labels = response.data.map(question => monthNames[parseInt(question[0])-1]);
                let data = response.data.map(question => question[1]);

                if(labels.length === 1){
                    labels.push(labels[0]);
                    data.push(data[0]);
                }

                let dataset = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Montly Usage',
                            fill: false,
                            weight: 10,
                            lineTension: 0.1,
                            backgroundColor: [
                                '#e34222'
                            ],
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: data
                        }
                    ]
                };
                this.setState({
                    usageStats: dataset
                })
            });
    }

    render() {

        return (

            <div className="statistics col-sm-6 offset-md-3">
                <h1>Most asked questions</h1>
                <Doughnut ref="chart" data={this.state.mostAskedQuestions} />
                <h1>Most asked topics</h1>
                <Polar data={this.state.mostAskedTopics} /*options={chartOptions}*//>
                <h1>Usage</h1>
                <Line data={this.state.usageStats} /*options={chartOptions}*//>
            </div>
        )
    }
}