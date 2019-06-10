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
import UserProfile from './userProfile'

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
        console.log(UserProfile.getId());
        console.log(this.state.showNavbar);
        return (
            <div>
                {this.state.showNavbar ? <NavigationBar></NavigationBar> : null}
                <Switch>
                    <Route exact path='/' component={props => <Login loginUpdate={this.showNavigation.bind(this)}/>}/>
                    <Route path="/login" component={props => <Login loginUpdate={this.showNavigation.bind(this)}/>}/>
                    <Route path="/main" component={Main}/>
                    <Route path="/addbot" component={Addbot}/>
                    <Route path="/statistics" component={Statistics}/>
                </Switch>
            </div>
        );
    }
}

export default App;
