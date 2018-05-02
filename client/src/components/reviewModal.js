import React, {Component} from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter, Container, Row, Col, Jumbotron, Button, Fade, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui'
import * as moment from 'moment';
class ReviewModal extends Component{
constructor(props){
    super(props);
    
}
render(){
    
    return(
     <Modal toggle={this.props.reviewToggle} isOpen={this.props.isReviewOpen} backdrop={true}>
        {this.props.data ?
        (
            <div>
            <ModalHeader>Submit Time Entry For Review.</ModalHeader>
            <ModalBody>
            
            <Form  >
            <FormGroup>
            <Label for="date">DATE</Label>
            <Input type="text"  value={this.props.data.date} name="date" id="date" placeholder="select venue" required={true} disabled />
          
        </FormGroup>
    
        <FormGroup>
        <Row>
        <Col>
        <Label for="time">TIME-IN</Label>
        <Input type="text" value={this.props.data.timeIn} name="time" id="time" placeholder="select venue" required={true} disabled/>
        </Col>
        <Col>
        <Label for="timeOut">TIME-OUT</Label>
        <Input type="text" value={this.props.data.timeOut}  name="timeOut" id="timeOut" placeholder="select venue" required={true} disabled/>
        
        </Col>
     
      
        </Row>
    </FormGroup>
            <FormGroup>
                <Label for="venuePicker">VENUE</Label>
                <Input type="text" value={this.props.data.venue.name} required={true} disabled/>
            </FormGroup>
       
            <FormGroup>
            <Label> Reasons (or Comment) </Label>
            <Input type="textarea" />
            </FormGroup>
            <FormGroup>
    
            <RaisedButton icon={<FontIcon className="fa fa-paste"/>} onClick={this.props.reviewToggle} label="Cancel & Close"  labelStyle={{fontWeight:"600"}}/>
            <RaisedButton icon={<FontIcon className="fa fa-paste"/>} onClick={this.handleSubmit} label="Submit For Review"  labelStyle={{fontWeight:"600"}}/>
            </FormGroup>
     </Form>
            
            </ModalBody>
            <ModalFooter></ModalFooter>
            </div>
        ):null }
      
       
        </Modal>
    )
}
}

export default ReviewModal;