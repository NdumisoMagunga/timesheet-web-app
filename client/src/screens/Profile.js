import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button,Row,Col, Container} from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {
constructor(props){
    super(props);
}

componentDidMount(){
    this.props.fetchUser();
}

render(){
    return (
        <div>    
        <Container>

            <Row>
            <Col md={6} >
            <h4>Your Profile</h4>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" 
            style={{ borderTopLeftRadius: 20,borderTopRightRadius: 20,borderBottomLeftRadius: 20,borderBottomRightRadius: 20,overflow: 'hidden',height: 205,width:230}}
             />
            <CardTitle>{this.props.auth.firstname} {this.props.auth.lastname}</CardTitle>
             <CardText>{this.props.auth.email}</CardText>
            <CardText><Button color="success">Edit Profile</Button></CardText>
      </Col>
      </Row>
        </Container>
        </div>
    )
}

}
function mapStateToProps({auth}){
    return {
        auth
    }
}
export default connect(mapStateToProps,actions)(Profile);