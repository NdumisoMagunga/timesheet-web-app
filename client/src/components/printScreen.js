import React, { Component } from 'react';
import {Button,Modal,ModalBody,ModalHeader} from 'reactstrap';
import * as actions from '../actions'
import {connect} from 'react-redux';
import * as moment from 'moment';
import TimeSheet from './Admin/TimesheetTable'
import index from 'react-notifications';
import {FontIcon, RaisedButton} from 'material-ui';

 class TestPrint extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
        this.print = this.print.bind(this);
    }

    componentDidMount(){
        this.props.fetchTimesheets();
    }

    calcDuration({date,timeIn,timeOut}){
        var now = date +" "+timeOut;
        var then = date +" "+timeIn;
    
        var ms = moment(now, "DD/MM/YYYY HH:mm").diff(moment(then, "DD/MM/YYYY HH:mm"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) +" hour(s) "+ moment.utc(ms).format("mm") + " minutes"
        return s;
    }

    print() {
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    renderContent() {
               return(
                   <div>
                       <table style={{fontFamily:" arial, sans-serif", borderCcollapse: "collapse",  width:" 100%"}}>
                            <tr>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Firstname</th>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Lastname</th>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Date</th>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Time-in</th>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Time-out</th>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Duration</th>
                                <th style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>Venue</th>
                            </tr>

                            {this.props.timesheets.map((data,index) => (
                                 <tr key={index}>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>{data.user.firstname} </td>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}> {data.user.lastname}</td>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>{data.date}</td>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>{data.timeIn}</td>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>{data.timeOut}</td>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>{this.calcDuration(data)}</td>
                                 <td style={{ border: "1px solid #dddddd", textAlign:"left", padding:"8px"}}>{data.venue.name}</td>
                             </tr>
                            ))} 
                        </table>
                   </div>
               )
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>

                <RaisedButton 
                   onClick={this.toggle}
                    icon={<FontIcon style={{fontSize:11}} 
                    className="fa fa-print"/>} 
                    label="Print Timesheet" 
                    style={{fontSize:11}} 
                    labelStyle={{fontWeight:"600", 
                    fontSize:8, color: 'white'}} 
                    primary={false} 
                    buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} 
                />
 
                <Modal 
                    size='lg' 
                    isOpen={this.state.modal} 
                    toggle={this.toggle} 
                    className='results-modal'
                >  
                    <ModalHeader toggle={this.toggle}>
                        Test Printing
                    </ModalHeader>
                    <iframe id="ifmcontentstoprint" style={{
                        height: '0px',
                        width: '0px',
                        position: 'absolute'
                    }}></iframe>      
                    <Button onClick={this.print}>Print</Button>
                    <ModalBody id='printarea'>              
                        {this.renderContent()}
                    </ModalBody>
                </Modal>
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

export default connect(mapStateToProps,actions) (TestPrint);