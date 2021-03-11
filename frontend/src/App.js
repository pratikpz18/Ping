import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Messages from './components/Messages';

class App extends Component {
  render(){
    return (

      <Router>
        <div className="App">
          <Switch>
              <Route path="/" component = {Landing} exact />
              <Route exact path="/register" component={Registration} exact/>
              <Route exact path="/login" component={Login} exact/>
              <Route exact path="/dashboard" component={Dashboard} exact/>
              <Route exact path="/dashboard/profile/:userid" render={(props) => <Profile {...props} />} exact/>
              <Route exact path="/dashboard/Messages" component={Messages} exact/>
          </Switch>
        </div>
      </Router>
      
    );
  };
};

export default App;
