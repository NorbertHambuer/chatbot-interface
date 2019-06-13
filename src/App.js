import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './components/login'
import Main from './components/main'
import Addbot from './components/addbot'
import Statistics from './components/statistics'
import NavigationBar from './components/navbar'
import BotStatistics from './components/botStatistics'
import ChangePassword from './components/changePassword'


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNavbar: false
        };

        this.showNavigation.bind(this);
    };

    showNavigation(){
        this.setState({
            showNavbar: true
        });
    }

    render() {
        return (
            <div>
                {this.state.showNavbar ? <NavigationBar></NavigationBar> : null}
                <Switch>
                    <Route exact path='/' component={props => <Login loginUpdate={this.showNavigation.bind(this)}/>}/>
                    <Route path="/login" component={props => <Login loginUpdate={this.showNavigation.bind(this)}/>}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/addbot" component={Addbot}/>
                    <Route path="/statistics" component={Statistics}/>
                    <Route path="/botStatistics/:id" component={BotStatistics}/>
                    <Route path="/reset_pass/:token" component={props => <ChangePassword loginUpdate={this.showNavigation.bind(this)} {...props}/>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
