import React from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter, Container, Row, Col, Jumbotron, Button, Fade, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {FontIcon,Paper,List,ListItem, Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn, RaisedButton} from 'material-ui'
import * as moment from 'moment';
import {connect} from 'react-redux';
 class Timesheet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            inActive: false,
            fadeOut: true,
            outActive: false,
            isOpen :false,
            time:moment().format('HH:mm'),
            date:moment().format('DD-MM-YYYY'),
            venue:''
        }
        this.toggleIn = this.toggleIn.bind(this)
        this.toggleOut = this.toggleOut.bind(this)
        this.toggleModal= this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        console.log('user', this.props.auth)
    }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleIn() {
        this.setState({
            inActive: !this.state.inActive,
            fadeOut: !this.state.fadeOut
        })
    }

    toggleOut() {
        this.setState({
            outActive: !this.state.outActive
        })
    }


handleSubmit()
{
    console.log(this.state);
}
    render(){
        return(
            <div>
            <Jumbotron className="timesheet-jumbotron">
            <div className="timesheet-cover">
            <div className="" style={{padding:90}}>
            <h1 className="orange" style={{fontWeight:"300"}}>Welcome, {this.props.auth.firstname} {this.props.auth.lastname}</h1>
            <p className="lead white-text">This Dashboard Will allow you to manage your current, and previous timesheet sessions.</p>
 
        </div>
            </div>
            </Jumbotron>

            <Container>
            <Row style={{marginBottom:10}}>
            <Col></Col>
            <Col></Col>
            <Col></Col>
                <Col>
                <RaisedButton onClick={this.toggleModal} icon={<FontIcon className="fa fa-clock-o"/>} label="Start New Time Session"  labelStyle={{fontWeight:"600"}}/>
            
                </Col>

            </Row>
           
            <Paper rounded={false} zDepth={4} >
            <ListItem primaryText="Active Timesheets" style={{color:'black' ,fontWeight:"600"}} />

            
            </Paper>
            
            <Table>
            <TableHeader>
            <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Checked-in (Time)</TableHeaderColumn>
            <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody>

            <TableRow>
            <TableRowColumn>25-04-2018</TableRowColumn>
            <TableRowColumn>Itthynk Smart Solutions</TableRowColumn>
            <TableRowColumn> 09:00</TableRowColumn>
            <TableRowColumn><RaisedButton icon={<FontIcon className="fa fa-clock-o"/>} label="Checkout" labelStyle={{fontWeight:"600"}} primary={true} /></TableRowColumn>
            </TableRow>
            <TableRow>
            <TableRowColumn>25-04-2018</TableRowColumn>
            <TableRowColumn>Itthynk Smart Solutions</TableRowColumn>
            <TableRowColumn> 09:00</TableRowColumn>
            <TableRowColumn><RaisedButton icon={<FontIcon className="fa fa-clock-o"/>} label="Checkout" labelStyle={{fontWeight:"600"}} primary={true} /></TableRowColumn>
            </TableRow>
            </TableBody>
            </Table>
            </Container>
         




                <Container>
                <Row>
                    <Col xs='6'>
                        <h3 style={{textAlign: 'center'}} className="display-3">CHECK-IN</h3>
                        <p className="lead">
                            <Button style={{width: 200, marginLeft: 160}} color="primary" onClick={this.toggleIn}>IN</Button>
                            <Fade in={this.state.inActive} tag="h5" className="mt-3">
                                <Form>
                                    <FormGroup>
                                        <Input type="textarea" name="time" id="exampleTime" placeholder="Time" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="date" id="exampleDate" placeholder="Date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="location" id="exampleLocation" placeholder="Location" />
                                    </FormGroup>
                                </Form>
                            </Fade>
                        </p>

                    </Col>

                    <Col xs='6'>
                        <h3 style={{textAlign: 'center'}} className="display-3">CHECK-OUT</h3>
                        <p className="lead">
                            <Button disabled={this.state.fadeOut} style={{width: 200, marginLeft: 160}} color="primary" onClick={this.toggleOut}>OUT</Button>
                            <Fade in={this.state.outActive} tag="h5" className="mt-3">
                                <Form>
                                    <FormGroup>
                                        <Input type="textarea" name="time" id="time" placeholder="Time" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="date" id="date" placeholder="Date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="location" id="location" placeholder="Location" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="hours" id="hours" placeholder="Total hours " />
                                    </FormGroup>
                                </Form>
                            </Fade>
                        </p>

                    </Col>

                </Row>
                    <Jumbotron>
                            <h1 className="display-3">Summary</h1>
                            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                            <hr className="my-2" />
                            <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>

                    </Jumbotron>
                </Container>


                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>
                    <ModalHeader>START NEW TIME SESSION </ModalHeader>
                    <ModalBody>
                    <Form  >
                    <FormGroup>
                    <Label for="date">DATE</Label>
                    <Input type="text"  onChange={(e)=> {this.setState({date:e.target.value})}} value={moment().format('DD-MM-YYYY')} name="date" id="date" placeholder="select venue" required={true} disabled />
                  
                </FormGroup>

                <FormGroup>
                <Label for="time">TIME</Label>
                <Input type="text"  onChange={(e)=> {this.setState({time:e.target.value})}} value={moment().format('HH:mm')} name="time" id="time" placeholder="select venue" required={true} disabled/>
                
               
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
                    <RaisedButton icon={<FontIcon className="fa fa-clock-o"/>} onClick={this.handleSubmit} label="Start Tracking"  labelStyle={{fontWeight:"600"}}/>
                    </FormGroup>
             </Form>
                    
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
                
            </div>
        )
    }
}


function mapStateToProps({auth}){
    return {
        auth
    }
}
export default  connect(mapStateToProps,null) (Timesheet);