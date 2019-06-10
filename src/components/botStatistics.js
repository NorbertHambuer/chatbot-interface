import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import React, {Component} from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from "axios";
import UserProfile from "../userProfile";


export default class botStatistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: []
        };
    }

    componentDidMount(prevProps) {
        axios.get(`http://127.0.0.1:5000/most_asked_questions?user_id=${UserProfile.getId()}&bot_id=${this.props.bot_id}`, {withCredentials: true})
            .then(response => {
                console.log(response);
                this.setState({
                    questions: response.data
                })
            });
    }


    /*<ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={10}
                    transitionName='loadComponent'
                >
                        <div className="statistics">
                            <Bar
                                data={[1,2,3,4]}
                                width={100}
                                height={50}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                </ReactCSSTransitionGroup>*/

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: [
                        '#e34222',
                        '#E37215',
                        '#a9a233',
                        '#32CD32',
                        '#232AA9',
                        '#32a5a9',
                        '#a91b9e',
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
                    data: [1,2,3,4,5,6,7]
                }
            ]
        };
        return (

            <div className="statistics">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
                <Pie ref="chart" data={data} />
            </div>
        )
    }
}