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
     Alert,
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
    this.state = {
        visible: false
    }
    this.onDismiss = this.onDismiss.bind(this);
}

onDismiss() {
  this.setState({ visible: false });
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
                    <Alert color={this.state.status} isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.state.message}
                    </Alert>
                        <h4>Edit Profile</h4>
                            <FormGroup row> 
                                <Col sm= "10">
                                    <Input type="text" onChange={(e)=>{this.setState({firstname: e.target.value})}} name="firstname" id="firstname" defaultValue={this.props.auth.firstname}  />  
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm= "10">
                                    <Input type="text"  onChange={(e)=>{this.setState({lastname: e.target.value})}} name="lastname" id="lastname" defaultValue={this.props.auth.lastname}/> 
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm= "10">
                                    <Input type="email" onChange={(e)=>{this.setState({email: e.target.value})}} name="email" id="email" defaultValue= {this.props.auth.email}/>
                                </Col> 
                            </FormGroup>
                            <Button onClick={this.updateProfile.bind(this)} color="success">Edit Profile</Button>
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

async updateProfile(){
    let obj = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email
    }

    try{
    let response = await fetch('/api/edit-profile', {
        credentials: "include",
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    let result = await response.json();
    this.props.fetchUser();
    this.setState({
        visible: true,
        message: result.success,
        status: "success"
    })
        }catch(err){
            this.setState({
                visible: true,
                message: err.message,
                status: "danger"
            })
    }

}

}
function mapStateToProps({auth}){
    return {
        auth
    }
}
export default connect(mapStateToProps,actions)(Profile);