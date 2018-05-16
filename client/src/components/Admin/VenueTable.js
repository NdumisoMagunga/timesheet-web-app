import React,{Component} from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import ReactTable from "react-table";
import {Form, FormGroup,Input,Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import { red50, red900, white } from 'material-ui/styles/colors';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class VenueTable extends Component{
  constructor(props) {
    super(props);

    
    this.state = {
      isOpen: false,
      RemoveVenue:false,
      selectedVenue:false,

    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleRemoveVenue = this.toggleRemoveVenue.bind(this);
  }

toggleModal(){
    this.setState({
        isOpen: !this.state.isOpen,
        
    })
}
toggleRemoveVenue(){
  this.setState({
    RemoveVenue: !this.state.RemoveVenue,
      
  })
}

setSelectedVenue(d){
  
  this.setState({
    selectedVenue:d
  })
}

componentDidMount(){
  this.props.fetchUsers();
  this.props.fetchVenues();
}

handleSubmit(){
  this.toggleModal();

  let obj ={
      "venue": this.state.selectedVenue._id
  }

  fetch('http://localhost:80/api/update-venue/', {
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json'
  },        
  body: JSON.stringify(obj),

}).then((response)  => {
  console.log('response', obj)
  

  if (response.status == 200){
      
      this.createNotification('success');
      return response.JSON();
      
  }

}).catch(err => err);
}

handleRemove(){
  this.toggleRemoveVenue();

  let obj ={
      "venue": this.state.selectedVenue._id
  }

  fetch('http://localhost:80/api/remove-venue/', {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json'
  },        
  body: JSON.stringify(obj),

}).then((response)  => {
  console.log('response', response)
  

  if (response.status == 200){
      
      return response.JSON();
      
  }

}).catch(err => err);
}
  
    render(){
        return (
          <div>
            <ReactTable 
            style={{margin:20}}

            headerStyle={{backgroundColor:'white'}}

            data={this.props.venues}
            
            columns={[
              {
                columns: [
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                    {
                        Header: "Address",
                        id:'venue',
                        accessor: d => d.address
                      }
                  ,
                  {
                    Header: "No. People Assigned",
                    id:"assigned",
                    accessor: a => a.assignedPeople.length
                  },
                  {
                      Header:"Action(s)",
                      id:"actions",
                      accessor: d => d,
                      Cell: row => (
                          <div>
                        <RaisedButton onClick={()=>{ 
                          this.setSelectedVenue(row.value);
                          this.toggleModal();
                        }}
                        icon={<FontIcon style={{fontSize:11}} className="fa fa-pencil"/>} label="Edit" style={{fontSize:11}} labelStyle={{fontWeight:"600", fontSize:8, color:white}} primary={false} buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} />
                        <RaisedButton onClick={()=>{ 
                          this.setSelectedVenue(row.value);
                          this.toggleRemoveVenue();
                        }} 

                        icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>} label="Remove" style={{fontSize:11}} labelStyle={{fontWeight:"600", fontSize:8, color:white}} buttonStyle={{backgroundColor:"#cc0000", marginLeft:10}} />
                        </div>
                      )
                  }
                ]
              }
            ]}
            defaultPageSize={5}
            className="-highlight"
          />

              <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>
                    <ModalHeader>EDIT VENUE </ModalHeader>
                    <ModalBody>
                   
                      {this.state.selectedVenue ? (
                                 <Form >
                                    <FormGroup>
                                    <Label for="addressname">Address Name</Label>
                                        <Input type="text" onChange={(e)=>{this.setState({name: e.target.value})}} name="name" id="name" placeholder={ this.state.selectedVenue.name}  required={true}>
                                        </Input>
                                    </FormGroup>
              
                                    <FormGroup>
                                    <Label for="Streetaddress">Street Address</Label>
                                        <Input type="address" onChange={(e)=>{this.setState({address: e.target.value})}} name="address" id="address" placeholder ={this.state.selectedVenue.address}  required={true}>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="location">Location</Label>
                                      <Input type="address" onChange={(e)=>{this.setState({location: e.target.value})}} name="location" id="location" placeholder ={this.state.selectedVenue.location} >
                                      </Input>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="altitude">Altitude</Label>
                                      <Input type="text" onChange={(e)=>{this.setState({altitude: e.target.value})}} name="altitude" id="altitude" placeholder ={this.state.selectedVenue.altitude}>
                                      </Input>
                                    </FormGroup>
                              
                                    <FormGroup>
                                    <RaisedButton onClick={ () => this.handleSubmit() }  icon={<FontIcon style={{fontSize:11}} className="fa fa-pencil"/>}   label="Edit"  labelStyle={{fontWeight:"600"}}/>
                                    </FormGroup>
                                 </Form>
                               

                      ):null}
              
                    </ModalBody>
                    <ModalFooter></ModalFooter>
              </Modal>
              
                    <Modal  isOpen={this.state.RemoveVenue} toggle={this.toggleRemoveVenue}  backdrop={true}>
                        <ModalHeader icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>}>Remove </ModalHeader>
                        <ModalBody>
                          <p>Are you sure you want to remove this Venue?</p>
                          <FormGroup>
                              <RaisedButton icon={<FontIcon style={{fontSize:11}} onClick={ () => this.handleRemove() } className="fa fa-trash"/>}   label="Yes"  labelStyle={{fontWeight:"600"}}/>
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </Modal>

          </div>
        )
    }
}

function mapStateToProps({users, venues}){
  return {
      users,
      venues,
      
  }
}
export default connect(mapStateToProps,actions)(VenueTable);