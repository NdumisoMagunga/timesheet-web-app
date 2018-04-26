import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button,Row,Col, Container} from 'reactstrap';


class Profile extends Component {
constructor(props){
    super(props);
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
            <CardTitle>Ndumiso Magunga</CardTitle>
             <CardText>Magunga55@gmail.com</CardText>
            <CardText><Button color="success">Edit Profile</Button></CardText>
      </Col>
      </Row>
        </Container>
        </div>
    )
}

}

export default Profile;