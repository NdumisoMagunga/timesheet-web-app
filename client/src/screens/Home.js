import React, {Component} from 'react';
import {Jumbotron, Row,Col, Container} from 'reactstrap';
import * as actions from '../actions'

import {connect} from 'react-redux';

class Home extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
constructor(props){
    super(props);
}


render(){
    return (
        <div>
        <Jumbotron className="welcome-jumbotron" >
        <div className="cover">
        <div className="container">
        <div className="row">
            <div className="" style={{padding:90}}>
                <h1 className="orange" style={{fontWeight:"300"}}>Welcome to Itthynk Timesheet</h1>
                <p className="lead white-text">Managing Timesheets made practical.</p>
                <a className="main-button icon-button" href="/register">Get Started!</a>
            </div>
        </div>
    </div>
    </div>
        </Jumbotron>
        <Container>
        <Row>
        <Col md={4}>
        <div className="feature">
            <i className="feature-icon fa fa-magic"></i>
            <div className="feature-content">
                <h4>Easy To Use </h4>
                <p>Fill out your timesheets easily and accurately with our incomplecated user interface.</p>
            </div>
        </div>
        </Col>

        <Col md={4}>
        <div className="feature">
            <i className="feature-icon fa fa-database"></i>
            <div className="feature-content">
                <h4>Accurate Statistics </h4>
                <p>Get Feedback and Reports of employee attendance from a single reliable source.</p>
            </div>
        </div>
        </Col>

        <Col md={4}>
        <div className="feature">
            <i className="feature-icon fa fa-plug"></i>
            <div className="feature-content">
                <h4>No Paper - No Fuss </h4>
                <p>Everything is done digitally and there's no need for a physical file system.</p>
            </div>
        </div>
        </Col>

        </Row>
        </Container>

        
        
        </div>
    )
}

}
function mapStateToProps(state){
    return {
      auth:state.auth
    }
  }
export default connect(mapStateToProps, actions)(Home);