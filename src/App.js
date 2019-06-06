import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Login from './components/login'
import Main from './components/main'
import Addbot from './components/addbot'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                  <Route exact path='/' component={ Login } />
                  <Route path="/login" component={Login} />
                  <Route path="/main" component={Main} />
                  <Route path="/addbot" component={Addbot} />
              </div>
          </Router>

        {/*<Switch>*/}
        {/*  <Route path='/index' component={ Index } />*/}
        {/*</Switch>*/}
      </div>
    );
  }
}

export default App;
