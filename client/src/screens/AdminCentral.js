import React, {Component} from 'react';
import {Jumbotron, Row,Col, Container} from 'reactstrap';
import * as actions from '../actions'
import {connect} from 'react-redux';

class AdminCentral extends Component {

render(){
    return (
        <div>
            <Jumbotron className="welcome-jumbotron" >
                <div className="cover">
                    <div className="container">
                    <div className="row">
                        <div className="" style={{padding:90}}>
                            <h1 className="orange" style={{fontWeight:"300"}}>Welcome, {this.props.auth.firstname} {this.props.auth.lastname}</h1>
                            <p className="lead white-text">Managing Timesheets made practical.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </Jumbotron>
        </div>
    )
}

}
function mapStateToProps({auth, mysheets}){
    return {
        auth
        
    }
}
export default  connect(mapStateToProps,actions)(AdminCentral);