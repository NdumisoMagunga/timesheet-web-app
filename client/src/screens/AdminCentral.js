import React, {Component} from 'react';
import {Jumbotron, Row,Col, Container,TabContent, TabPane, Nav,Table, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import { Grid,Button, Divider, Icon } from 'semantic-ui-react'
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';

const bstyles = {
    button: {
      margin: 12,
      left: 12,
      alignSelf: 'center'
    }}

class AdminCentral extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          addVenue: false,
          isOpen: false,
          venue: this.props.venues.name,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.toggleAddVenue =  this.toggleAddVenue.bind(this);
      }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleAddVenue(){
        this.setState({
            addVenue: !this.state.addVenue
        })
    }

    componentDidMount(){
        this.props.fetchTimesheets();
        this.props.fetchUsers();
        this.props.fetchVenues();
    }



      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
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

           

            <Container>
                    <Button basic color='orange' onClick={this.toggleModal} floated='right'>
                    <Icon name='home' />
                     Assign Venue
                
                    </Button>
                    <Button basic color='orange' onClick={this.toggleAddVenue} floated='left'>
                    <Icon name='plus' />
                    Add Venue
                    </Button>
                
                <Divider hidden="true"/>
                <Divider hidden="true"/>
                <Divider hidden="true"/>
                
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
                        <Table hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Venue</th>
                                
                            </tr>
                            </thead>

                            <tbody>
                                {this.props.venues.map((data,index)=>(
                                <tr key ={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
     
                                </tr>
                                ))}
                            </tbody>
                        </Table>

                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                        <Col sm="6">
                        <Table hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.props.users.map((data, index)=>(
                                <tr key ={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
     
                                </tr>
                                ))}
                            </tbody>
                        </Table>

                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                        <Col sm="12">
                        <Table hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Time In</th>
                                <th>Time out</th>
                                <th>Date</th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.props.timesheets.map((data, index)=>(
                                <tr key ={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.timeIn}</td>
                                <td>{data.timeOut}</td>
                                <td>{data.date} </td>      
                                </tr>
                                ))}
                            </tbody>
                            <Button color='orange' basic floated='left'>
                                <Icon name='print' />
                                Print
                            </Button>
                        </Table>
                        </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                        <Col sm="12">
                        <Table hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Reviewed Status</th>
                                <th>Date</th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.props.timesheets.map((data, index)=>(
                                <tr key ={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.inReview}</td>
                                <td>{data.date} </td>      
                                </tr>
                                ))}
                            </tbody>
                            

                        </Table>
                        </Col>
                        </Row>
                    </TabPane>
                </TabContent>

                
                    <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>
                    <ModalHeader>ASSIGN USER TO A VENUE </ModalHeader>
                    <ModalBody>
                    <Form method="PUT" action="/api/assign-user" >

                    <FormGroup>
                        <Label for="venuePicker">SELECT VENUE</Label>
                        <Input type="select" onChange={(e)=>{this.setState({venue: e.target.value})}} name="venue" id="venuePicker" placeholder="select venue" required={true}>
                        
                        {this.props.venues.map((data,index)=>(
                            <option key={index} value={data._id}>{data.name}</option> 
                        )

                    )}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="userPicker">SELECT USER</Label>
                        <Input type="select" onChange={(e)=>{this.setState({user: e.target.value})}} name="user" id="userPicker" placeholder="select user" required={true}>
                        
                        {this.props.users.map((data,index)=>(
                            <option key={index} value={data._id}>{data.firstname} {data.lastname}</option>
                        )

                    )}
                        </Input>
                    </FormGroup>
               
                    <FormGroup>
                    <RaisedButton icon={<FontIcon className="fa fa-paste"/>} type="submit" label="Assign"  labelStyle={{fontWeight:"600"}}/>
                    </FormGroup>
                    </Form>
                    
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>


                 <Modal  isOpen={this.state.addVenue} toggle={this.toggleAddVenue}  backdrop={true}>
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

            
        </div>
    )
}

}
function mapStateToProps({auth, timesheets,users, venues}){
    return {
        auth,
        timesheets,
        users,
        venues,
        
    }
}
export default  connect(mapStateToProps,actions)(AdminCentral);