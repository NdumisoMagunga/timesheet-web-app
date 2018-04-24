import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navbar';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Timesheet from './screens/Timesheet';
import Profile from './screens/Profile';
import Register from './screens/Register';





class App extends Component {
  render() {
    return (
      <div>
      <Navigation />
    
      <BrowserRouter>
      
      <div>

      <Route component={Home} exact path={'/'}/>
      <Route component={Login} exact path={'/login'}/>
      <Route component={Timesheet} exact path={'/timesheet'}/>
      <Route component={Register} exact path={'/register'}/>
      <Route component={Profile} exact path={'/profile'}/>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
