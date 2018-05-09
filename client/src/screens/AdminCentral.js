import React, {Component} from 'react';
import {Jumbotron, Row,Col,Button, Container,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';
import ReactTable from "react-table";
import "react-table/react-table.css";


class AdminCentral extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          isOpen: false,
          isOpen1:false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this. toggleVenueModal1 = this.toggleVenueModal1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleVenueModal1(){
        this.setState({
            isOpen1: !this.state.isOpen1
        })
    }

    componentDidMount(){
        this.props.fetchTimesheets();
         this.props.fetchUsers();
    }



      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      handleSubmit(){
          this.setState(
              {
                  isOpen1: false,
                  isOpen: false
                 
              }
          )
      }

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

            <RaisedButton onClick={this.toggleVenueModal1} icon={<FontIcon className="fa fa-paste"/>} label="Add Venue" labelStyle={{fontWeight:"600"}} primary={true} />

            <Container>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        >
                        Venue
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                        Users
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                        >
                        Timesheets
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}
                        >
                        Submitted for Review
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                        <Col sm="12">
                        <ul>

                            {this.props.auth.venues.map((venue,index)=>(
                            <li key={index} value={venue._id}>{venue.name} </li>
                        )
                            )}

                        </ul>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                        <Col sm="6">
                        <ul>
                            {this.props.users.map((data, index)=>(
                                <li key={index}>{data.firstname}  {data.lastname} </li>
                            ))}

                        </ul>
                        
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                        <Col sm="12">
                        <ul>

                            {this.props.timesheets.map((data, index)=>(
                                <li key={index}>{data.firstname} {data.timeIn} {data.timeOut} {data.date} {data.venue} </li>
                            ))}

                        </ul>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                        <Col sm="12">
                            <h4>Tab 4 Contents</h4>
                        </Col>
                        </Row>
                    </TabPane>
                </TabContent>

                <RaisedButton onClick={this.toggleModal} icon={<FontIcon className="fa fa-paste"/>} label="Assign Venue" labelStyle={{fontWeight:"600"}} primary={true} />

                    <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>
                    <ModalHeader>ASSIGN USER TO A VENUE </ModalHeader>
                    <ModalBody>
                    <Form  >

                    <FormGroup>
                        <Label for="venuePicker">SELECT USER</Label>
                        <Input type="select" onChange={(e)=>{this.setState({venue: e.target.value})}} name="email" id="venuePicker" placeholder="select venue" required={true}>
                        
                        {this.props.users.map((data,index)=>(
                            <option key={index} value={data._id}>{data.firstname} {data.lastname}</option>
                        )

                    )}
                        </Input>
                    </FormGroup>


                    <FormGroup>
                        <Label for="venuePicker">SELECT VENUE</Label>
                        <Input type="select" onChange={(e)=>{this.setState({venue: e.target.value})}} name="email" id="venuePicker" placeholder="select venue" required={true}>
                        
                        {this.props.auth.venues.map((venue,index)=>(
                            <option key={index} value={venue._id}>{venue.name} </option>
                        )

                    )}
                        </Input>
                    </FormGroup>

               
                    <FormGroup>
                    <RaisedButton icon={<FontIcon className="fa fa-paste"/>} onClick={this.handleSubmit} label="Assign"  labelStyle={{fontWeight:"600"}} primary={true}/>
                    </FormGroup>
             </Form>
                    
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>

                <Modal  isOpen={this.state.isOpen1} toggle={this.toggleVenueModal1}  backdrop={true}>
                    <ModalHeader>Add New Venue </ModalHeader>
                    <ModalBody>
                    <Form  method="POST" action="/api/venue">

                    <FormGroup>
                        <Label for="Address">Enter Address</Label>
                        <Input type="text"  onChange={(e)=> {this.setState({address:e.target.value})}} name="address" id="address" placeholder="Enter Address" required={true}></Input>
                    </FormGroup>

                     <FormGroup>
                        <Label for="venue">Enter Venue-Name</Label>
                        <Input type="text"  onChange={(e)=> {this.setState({name:e.target.value})}} name="venue-name" id="venue" placeholder="Enter venue name" required={true}></Input>
                    </FormGroup>

                     <FormGroup>
                        <Label for="Address">Enter Location</Label>
                        <Input type="text"  onChange={(e)=> {this.setState({location:e.target.value})}} name="location" id="location" placeholder="Enter location" required={true}></Input>
                    </FormGroup>

                    <FormGroup>
                    <RaisedButton type="submit" icon={<FontIcon className="fa fa-paste"/>}  label="Add Venue"  labelStyle={{fontWeight:"600"}} primary={true}/>
                    </FormGroup>
             </Form>
                    
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>

            </Container>

            
        </div>
    )
}

}
function mapStateToProps({auth, timesheets,users}){
    return {
        auth,
        timesheets,
        users
        
    }
}
export default  connect(mapStateToProps,actions)(AdminCentral);