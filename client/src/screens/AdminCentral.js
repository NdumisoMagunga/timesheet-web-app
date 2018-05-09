import React, {Component} from 'react';
import {Jumbotron, Row,Col,Button, Container,TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText,Form, FormGroup,Input,
    Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import classnames from 'classnames';


class AdminCentral extends Component {
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
                        <ul>

                            {this.props.timesheets.map((data, index)=>(
                                <li key={index}>{data.email} {data.timeIn} {data.timeOut} {data.date} {data.venue} </li>
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