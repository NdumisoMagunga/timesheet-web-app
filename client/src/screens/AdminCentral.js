import React, {Component} from 'react';
import {Jumbotron, Row,Col,Button, Container, TabPane, Nav,Table, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';
import Tabs from 'react-responsive-tabs';


import VenueTable from '../components/Admin/VenueTable';
import UserTable from '../components/Admin/UserTable';
import TimesheetTable from '../components/Admin/TimesheetTable';
import ReviewableSessions from '../components/Admin/ReviewableSessions';

                               





const blockElements = {
    content: 'tabs-content',
    panel: 'tabs-panel',
    label: 'tabs-title'
}

class AdminCentral extends Component {

     tabsObject =[{
        name:'Venues',
         description:'This is where you will manage Venues (Coming soon)',
         mainComponent: this.getVenuesTab()
        },
        {
        name:'Users',
        description:'This is where you will manage Users (Coming soon)',
        mainComponent: this.getUsersTab()
        },
        {
        name:'All Time sessions' ,
        description:'This is where you will manage Active Sessions (Coming soon)',
        mainComponent:this.getTimesheetTab()
        },
        {
        name:'Submitted For Review',
        description:'This is where you will manage reviewable time sheets (Coming soon)',
        mainComponent:this.getReviewTab()
        }]

       
        getReviewTab(){
            if (this.props.timesheets.length > 0){
                return (
                    <ReviewableSessions timesheets ={this.props.timesheets.filter((shift)=> shift.inReview == true )} />
                )
            }

        }

        getUsersTab(){
            if (this.props.users.length > 0){
                return (<UserTable users={this.props.users}/>)
            }
        }


        getVenuesTab(){
            if (this.props.venues.length > 0){
                return (
                   (<VenueTable venues ={this.props.venues.length > 0 ? this.props.venues:[{}]}/>)
                )
            }
           
        }
          
        getTimesheetTab(){
            if (this.props.timesheets.length > 0){
                return (
                    <TimesheetTable timesheets ={this.props.timesheets} />
                )
            }
        }
        

        


    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          isOpen: false,
          venue: this.props.venues.name,
        };

        this.toggleModal = this.toggleModal.bind(this);
      }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    componentDidMount(){

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
      
            <Jumbotron className="dashboard-jumbotron" >
                <div className="cover">
                    <div className="container">
                    <div className="row">
                        <div className="" style={{padding:90, paddingTop:50}}>
                            <h1 className="orange" style={{fontWeight:"300"}}>Welcome, {this.props.auth.firstname} {this.props.auth.lastname}</h1>
                            <p className="lead white-text">Managing Timesheets made practical.</p>
                        </div>
                    </div>
                    </div>
                </div>
            </Jumbotron>

           <Container>

           <Tabs items={
             this.tabsObject.map((tab,index) => ({
                key: index, // Optional. Equals to tab index if this property is omitted
                tabClassName: 'tab', // Optional
                panelClassName: 'panel', // Optional
                title: tab.name,
                getContent: () => tab.mainComponent,
              }))
           }  
           
           showInkBar={true}/>


           {/* 
            <RaisedButton onClick={this.toggleModal} icon={<FontIcon className="fa fa-book-o" style ={{alignSelf:"flex-end"}}/>}  label="Assign Venue" labelStyle={{fontWeight:"600"}} primary={true} />
               
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

                            {this.props.venues.map((data,index)=>(
                            <li key={index} value={data._id}>{data.name} </li>
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
                        <Table>
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
                        </Table>
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
                    <Form method="PUT" action="/api/assign-user" >

                    <FormGroup>
                        <Label for="venuePicker">SELECT USER</Label>
                        <Input type="select" onChange={(e)=>{this.setState({venue: e.target.value})}} name="email" id="user" placeholder="select user" required={true}>
                        
                        {this.props.users.map((data,index)=>(
                            <option key={index} value={data._id}>{data.firstname} {data.lastname}</option>
                        )

                    )}
                        </Input>
                    </FormGroup>


                    <FormGroup>
                        <Label for="venuePicker">SELECT VENUE</Label>
                        <Input type="select" onChange={(e)=>{this.setState({venue: e.target.value})}} name="email" id="venuePicker" placeholder="select venue" required={true}>
                        
                        {this.props.venues.map((data,index)=>(
                            <option key={index} value={data._id}>{data.name}</option> 
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
                */}
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