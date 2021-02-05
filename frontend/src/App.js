import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
// import Login from './components/Login';
import Registration from './components/Registration';

class App extends Component {
  render(){
    return (

      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/register" component={Registration} />
              {/* <Route exact path="/login" component={Login} />
              <Redirect from="/" to="login" /> */}
          </Switch>
        </div>
      </Router>
      
    );
  };
};

export default App;
