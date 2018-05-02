import React from 'react';
import {Modal,ModalBody,ModalHeader,ModalFooter, Container, Row, Col, Jumbotron, Button, Fade, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {FontIcon,Paper,List,ListItem, Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn, RaisedButton} from 'material-ui'
import * as moment from 'moment';
import * as actions from '../actions'
import {connect} from 'react-redux';
import ReviewModal from '../components/reviewModal';

 class Timesheet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            inActive: false,
            isReviewOpen:false,
            fadeOut: true,
            data:{timeIn:'',timeOut:'',date:'', venue:{name:''}},
            outActive: false,
            isOpen :false,
            timeIn:moment().format('HH:mm'),
            date:moment().format('DD-MM-YYYY'),
            venue: this.props.auth.venues.length > 0 ? this.props.auth.venues[0]._id :null,
            user:this.props.auth._id
        }

        
        this.toggleIn = this.toggleIn.bind(this)
        this.toggleOut = this.toggleOut.bind(this)
        this.toggleModal= this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reviewToggle = this.reviewToggle.bind(this);
        this.setData = this.setData.bind(this);
    }

    componentDidMount(){
        this.props.myTimesheets(this.props.auth._id);
    }

    setData(shift){
        this.setState({
            data:shift
        })
    }
    reviewToggle(shift){
        this.setState({
            data:shift,
            isReviewOpen:!this.state.isReviewOpen
            
        })
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

handleCheckOut({user,date, venue,timeIn}){
    let obj= {
        user,
        date,
        timeIn,
        venue: venue._id,
        timeOut: moment().format('HH:mm')
    };
    
    this.props.CheckOut(obj);
    this.props.myTimesheets(this.props.auth._id);
}

handleSubmit()
{
    console.log(this.state);
    this.props.CheckIn(this.state);
    this.toggleModal();
    this.props.myTimesheets(this.props.auth._id);

}

calcDuration({date,timeIn,timeOut}){
    var now = date +" "+timeOut;
    var then = date +" "+timeIn;

    var ms = moment(now, "DD/MM/YYYY HH:mm").diff(moment(then, "DD/MM/YYYY HH:mm"));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) +" hour(s) "+ moment.utc(ms).format("mm") + " minutes"
    return s;
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
                 <ListItem primaryText="Active Timesheets" style={{color:'black' , fontWeight:"600"}} />
            </Paper>
            
            <Table style={{marginBottom:50}}>
            <TableHeader>
            <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Checked-In (Time)</TableHeaderColumn>
            <TableHeaderColumn>Action</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody>
            {this.props.mysheets ? 
                this.props.mysheets.map((shift,index)=> {
                    if (shift.isActive){
                        return (
                            <TableRow selectable={false}>
                            <TableRowColumn>{shift.date}</TableRowColumn>
                            <TableRowColumn>{shift.venue.name}</TableRowColumn>
                            <TableRowColumn>{shift.timeIn}</TableRowColumn>
                            <TableRowColumn><RaisedButton onClick={()=> this.handleCheckOut(shift)} icon={<FontIcon className="fa fa-clock-o"/>} label="Checkout" labelStyle={{fontWeight:"600"}} primary={true} /></TableRowColumn>
                            </TableRow>
                        )
                    }
                })
               :
                
                (
                    <TableRow>
                   
                    <TableRowColumn>no timesheets submitted</TableRowColumn>
                    
                    </TableRow>

                )}
          
         
            </TableBody>
            </Table>

            <Paper rounded={false} zDepth={4} >
            <ListItem primaryText="My Timesheet" style={{color:'black' ,fontWeight:"600"}} />
            </Paper>

            <Table style={{marginBottom:50}}>
            <TableHeader>
            <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
            <TableHeaderColumn>Checked-In (Time)</TableHeaderColumn>
            <TableHeaderColumn>Checked-Out (Time)</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
            <TableHeaderColumn>Action(s)</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody>
            {this.props.mysheets ? 
                this.props.mysheets.map((shift,index)=> {
                    if (!shift.isActive){
                        return (
                            <TableRow selectable={false}>
                            <TableRowColumn>{shift.date}</TableRowColumn>
                            <TableRowColumn>{shift.venue.name}</TableRowColumn>
                            <TableRowColumn>{shift.timeIn}</TableRowColumn>
                            <TableRowColumn>{shift.timeOut}</TableRowColumn>
                            <TableRowColumn>{this.calcDuration(shift)}</TableRowColumn>
                             <TableRowColumn><RaisedButton onClick={ ()=> {
                                                                this.setData(shift);
                                                                this.reviewToggle()

                                                            }} 
                                                            icon={<FontIcon style={{fontSize:11}} className="fa fa-paste"/>} label="Submit for Review" style={{fontSize:11}} labelStyle={{fontWeight:"600", fontSize:8}} primary={false} /></TableRowColumn>
                            </TableRow>
                        )
                    }
                })
               :
                
                (
                    <TableRow>
                   
                    <TableRowColumn>no timesheets records found</TableRowColumn>
                    
                    </TableRow>

                )}
          
         
            </TableBody>

            </Table>
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
                
                <ReviewModal reviewToggle={this.reviewToggle} isReviewOpen={this.state.isReviewOpen} data={this.state.data}/>
            </div>
        )
    }
}


function mapStateToProps({auth, mysheets}){
    return {
        auth,
        mysheets
    }
}
export default  connect(mapStateToProps,actions) (Timesheet);