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
import AdminCentral from './screens/AdminCentral';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import * as actions from './actions';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <BrowserRouter>
      <div>
      <Navigation />
      {this.props.auth ? (<Route component={Timesheet} exact path={'/'}/>):(<Route component={Home} exact path={'/'}/>)}
      <Route component={Login} exact path={'/login'}/>
      <Route component={Register} exact path={'/register'}/>
      <Route component={Profile} exact path={'/profile'}/>
        {this.props.auth.isAdmin ? (<Route component={AdminCentral} exact path={'/admin'}/>):null}
      </div>
      </BrowserRouter>
      </MuiThemeProvider>
     
    );
  }
}

function mapStateToProps({auth}){
  return {
    auth
  }
}

export default connect(mapStateToProps,actions)(App);
