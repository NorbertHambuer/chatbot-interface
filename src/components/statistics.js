import React, {Component} from "react";
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import servConfig from "../server_config";
import UserProfile from "../userProfile";


export default class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usageStats: {}
        };
    }

    componentDidMount() {
        axios.get(`${servConfig}user_bots_usage?user_id=${UserProfile.getId()}`, {withCredentials: true})
            .then(response => {
                let labels = response.data.map(botDetails => botDetails.bot);
                let data = response.data.map(botDetails => botDetails.questions);

                let dataset = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Bots usage",
                            fillColor: "rgba(19,180,255,0.75)",
                            strokeColor: "rgba(19,180,255,0.75)",
                            highlightFill: "rgba(19,180,255,0.75)",
                            highlightStroke: "rgba(19,180,255,0.75)",
                            backgroundColor: "rgba(19,180,255,0.75)",
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
            <h1>Bots Usage</h1>
            <Bar data={this.state.usageStats} /*options={chartOptions}*//>
        </div>
        )
    }
}