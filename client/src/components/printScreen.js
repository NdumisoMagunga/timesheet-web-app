import React, { Component } from 'react';
import {Button,Modal,ModalBody,ModalHeader} from 'reactstrap';
import * as actions from '../actions'
import {connect} from 'react-redux';
import "./PrintScreen.css";

import TimeSheet from './Admin/TimesheetTable'

 class TestPrint extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
        this.print = this.print.bind(this);
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
                if (this.props.timesheets.length > 0){
                    return (  
                      <div>
                          {this.props.timesheets.venues}
                      </div>
                    )
                }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <div>
                <Button 
                    style={
                        {
                            'position': 'fixed',
                            'top': '50%',
                            'left': '50%',
                            'transform': 'translate(-50%, -50%)'
                        }
                    } 
                    onClick={this.toggle}
                >
                    Test Modal and Print
                </Button>         
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