import React, {Component} from 'react';
import {Jumbotron, Row,Col,Button, Container, TabPane, Nav,Table, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
//import { Grid,Button, Divider, Icon } from 'semantic-ui-react'
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';
import Tabs from 'react-responsive-tabs';
import { red50, red900, white } from 'material-ui/styles/colors';

import VenueTable from '../components/Admin/VenueTable';
import UserTable from '../components/Admin/UserTable';
import TimesheetTable from '../components/Admin/TimesheetTable';
import ReviewableSessions from '../components/Admin/ReviewableSessions';
import AddVenue from '../components/addVenueModal';

                               



import AssignVenue from '../components/Admin/AssignVenue';


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
                    <ReviewableSessions timesheets ={this.props.timesheets.filter((shift)=> shift.inReview === true )} />
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
          addVenue: false,
          isOpen: false,
          user: null,
          venue: null,
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
           
          <AddVenue />
           
           <AssignVenue />
            
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