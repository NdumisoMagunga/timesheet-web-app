import React, { Component } from 'react';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText 
} from 'reactstrap';
import {FontIcon, RaisedButton} from 'material-ui';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class AssignVenue extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }


    handleAssign(){
        let obj ={
            "venue": this.state.venue,
            "user": this.state.user,
        }

        fetch('/api/assign-user', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify(obj),

    }).then((response)  => {   

        if (response.status == 200){ 
            this.toggleModal();
            return response.JSON();  
        } 
        
    }).catch(err => err);
    }

    componentDidMount(){
        this.props.fetchUsers();
        this.props.fetchVenues();
    }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    handleUnassign(){

        let obj ={
            "user": this.state.user,
        }

        fetch('/api/remove-user/'+ this.state.venue, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify(obj),

    }).then((response)  => {   
        console.log('submitted');
        if (response.status == 200){ 
            this.toggleModal();
            console.log('done');
            return response.JSON();  
        }
        
    }).catch(err => err);
    }

    render(){
        return(
            <div>
                <RaisedButton 
                    onClick={this.toggleModal} 
                    icon={<FontIcon style={{fontSize:11}} 
                    className="fa fa-pencil"/>} 
                    label="Assign Venue" 
                    style={{fontSize:11}} 
                    labelStyle={{fontWeight:"600", 
                    fontSize:8, color: 'white'}} 
                    primary={false} 
                    buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} 
                />
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>

                <div>
                <ModalHeader>ASSIGN USER TO A VENUE </ModalHeader>
                <ModalBody>
                <Form>
    
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
                    <RaisedButton icon={<FontIcon className="fa fa-paste"/>} onClick={ () => this.handleAssign() } label="Assign"  labelStyle={{fontWeight:"600"}}/>
                </FormGroup>


                <FormGroup>
                    <RaisedButton icon={<FontIcon className="fa fa-paste"/>} onClick={ () => this.handleUnassign() } label="Unassign"  labelStyle={{fontWeight:"600"}}/>
                </FormGroup>

                
                </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>

                </div>

            </Modal>


            </div>
        );
    }
}

function mapStateToProps({users, venues}){
    return {
        users,
        venues,
        
    }
}
export default connect(mapStateToProps,actions)(AssignVenue);