import React, {Component} from 'react';
import {Jumbotron, Row,Col,Button, Container,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';

class AddVenue extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
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

   
    componentDidMount(){
        this.props.fetchTimesheets();
         this.props.fetchUsers();
    }


    render(){

        return(
            <Container>
                 <RaisedButton onClick={this.toggleModal} icon={<FontIcon className="fa fa-paste"/>} label="Add Venue" labelStyle={{fontWeight:"600"}} primary={true} />
            <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>
                    <ModalHeader>Add a Venue </ModalHeader>
                    <ModalBody>
                    <Form>

                    <FormGroup>
                        <Label for="Address">Enter Address</Label>
                        <Input type="text" name="address" id="address" placeholder="Enter Address" required={true}></Input>
                    </FormGroup>

                     <FormGroup>
                        <Label for="venue">Enter Venue-Name</Label>
                        <Input type="text" name="venue-name" id="venue" placeholder="Enter venue name" required={true}></Input>
                    </FormGroup>

                     <FormGroup>
                        <Label for="Address">Enter Location</Label>
                        <Input type="text" name="location" id="location" placeholder="Enter location" required={true}></Input>
                    </FormGroup>

                    <FormGroup>
                    <RaisedButton icon={<FontIcon className="fa fa-paste"/>} onClick={this.handleSubmit} label="Add Venue"  labelStyle={{fontWeight:"600"}} primary={true}/>
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