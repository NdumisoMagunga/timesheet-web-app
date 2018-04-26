import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import * as actions from '../actions';

import {connect} from 'react-redux';

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
        <Col md={6}>
        <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            </CardBody>
      </Card>
      </Col>
      </Row>
        </Container>
        
        
        
        </div>
    )
}

}

export default connect(null,actions)(Profile);