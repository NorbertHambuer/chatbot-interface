import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import React, {Component} from "react";
import { Bar, Line } from 'react-chartjs-2';


export default class Statistics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };
    }

    sendPasswordRecovery() {

    }

    validateForm() {
        return this.state.email.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


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
                    backgroundColor: 'rgba(75,192,192,0.4)',
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
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        return (

        <div className="statistics">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
            <Line ref="chart" data={data} />
        </div>
        )
    }
}