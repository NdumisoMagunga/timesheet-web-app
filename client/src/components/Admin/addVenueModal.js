import React, {Component} from 'react';
import {Jumbotron, Row,Col,Button, Container,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import * as moment from 'moment';
import * as actions from '../../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';

class AddVenue extends Component{
    constructor(props) {
        super(props);


        this.state = {
          isOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
      }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    render(){

        return(
            <Container>
                 <RaisedButton 
                    onClick={this.toggleModal} 
                    icon={<FontIcon style={{fontSize:11}} 
                    className="fa fa-pencil"/>} 
                    label="Add Venue" 
                    style={{fontSize:11}} 
                    labelStyle={{fontWeight:"600", 
                    fontSize:8, color: 'white'}} 
                    primary={false} 
                    buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} 
                />
                 <Modal  isOpen={this.state.isOpen} toggle={this.toggleModal}  backdrop={true}>
                    <ModalHeader>Add New Venue </ModalHeader>
                    <ModalBody> 
                    <Form  method="POST" action="/api/venue">

                    <FormGroup>
                        <Label for="address">Enter Address</Label>
                        <Input type="text"  onChange={(e)=> {this.setState({address:e.target.value})}} name="address" id="address" placeholder="Address" required={true}></Input>
                    </FormGroup>

                     <FormGroup>
                        <Label for="name">Enter Venue Name</Label>
                        <Input type="text"  onChange={(e)=> {this.setState({name:e.target.value})}} name="name" id="name" placeholder="Venue name" required={true}></Input>
                    </FormGroup>

                     <FormGroup>
                        <Label for="location">Enter Location</Label>
                        <Input type="address"  onChange={(e)=> {this.setState({location:e.target.value})}} name="location" id="location" placeholder="Location"></Input>
                    </FormGroup>

                    <FormGroup>
                    <RaisedButton type="submit" icon={<FontIcon className="fa fa-home"/>}  label="Add Venue"  labelStyle={{fontWeight:"600"}} primary={true}/>
                    </FormGroup>
                    </Form>
                    
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
                </Container>
        )
    }
}



export default AddVenue;