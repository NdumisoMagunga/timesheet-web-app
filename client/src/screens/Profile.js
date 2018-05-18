import React, {Component} from 'react';
import { Card,
     CardImg,
     CardText,
     CardBody,
     CardTitle,
     CardSubtitle,
     Form,
     FormGroup,
     Button,
     Row,
     Col,
     Label, 
     Input,
     Container} from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from '../actions';
import { Grid, Image } from 'semantic-ui-react';
import Gravatar from 'react-gravatar';

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
            <Grid container columns={2}>
                <Grid.Column>
                    <Form>
                        <h4>Edit Profile</h4>
                            <FormGroup row> 
                                <Col sm= "10">
                                    <Input type="text" onChange={(e)=>{this.setState({firstname: e.target.value})}} name="firstname" id="firstname"placeholder={this.props.auth.firstname}  />  
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm= "10">
                                    <Input type="text"  onChange={(e)=>{this.setState({lastname: e.target.value})}} name="lastname" id="lastname" placeholder={this.props.auth.lastname}/> 
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm= "10">
                                    <Input type="email" onChange={(e)=>{this.setState({email: e.target.value})}} name="email" id="email" placeholder= {this.props.auth.email}/>
                                </Col> 
                            </FormGroup>
                            <Button color="success" type="submit" >Edit Profile</Button>
                    </Form>
                </Grid.Column>
                  
                <Grid.Column>
                    <h4>Your Profile</h4>
                        
                        <Gravatar top width="100%" email="magunga55@gmail.com" style={{ borderTopLeftRadius: 20,borderTopRightRadius: 20,borderBottomLeftRadius: 20,borderBottomRightRadius: 20,overflow: 'hidden',height: 205,width:230}}/>
                        <CardBody>
                            <CardTitle>{this.props.auth.firstname} {this.props.auth.lastname}</CardTitle>
                            <CardSubtitle>{this.props.auth.email}</CardSubtitle>
                            
                        </CardBody>
                </Grid.Column>
            </Grid>
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