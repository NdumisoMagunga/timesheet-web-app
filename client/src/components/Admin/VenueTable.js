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
      Remove:false,
      selectedVenue:false,

    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleRemove= this.toggleRemove.bind(this);
  }

toggleModal(){
    this.setState({
        isOpen: !this.state.isOpen,
        
    })
}
toggleRemove(){
  this.setState({
    Remove: !this.state.Remove,
      
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
      console.log("edit venue")

      let obj ={
          "venue": this.state.selectedVenue._id
      }
      console.log(obj)

      fetch('/api/update-venue/' + obj, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },        
      body: JSON.stringify(obj),

    }).then((response)  => {
      console.log('response', obj)
    
      if (response.status == 200){
          
          return response.JSON();
      }

    }).catch(err => err);
    }

    handleRemove(){
        this.toggleRemoveVenue();
        console.log('it works');
        let obj={
          "venue":this.state.selectedVenue._id
        }
        console.log(obj)

        fetch('http://localhost:80/api/remove-venue/' + obj, {
        method: 'DELETE',       

    }).then((response)  => {

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
                        icon={<FontIcon style={{fontSize:11}} className="fa fa-pencil"/>} 
                        label="Edit" style={{fontSize:11}} 
                        labelStyle={{fontWeight:"600", fontSize:8, color:white}}
                        primary={false}
                        buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} 
                        />
                        
                        <RaisedButton onClick={()=>{ 
                          this.setSelectedVenue(row.value);
                          this.toggleRemove();
                        }} 

                        icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>}
                        label="Remove" style={{fontSize:11}} 
                        labelStyle={{fontWeight:"600", fontSize:8, color:white}}
                        buttonStyle={{backgroundColor:"#cc0000", marginLeft:10}} 
                        />
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
                  <div>
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
                    </div>
              </Modal>
  
              <Modal  Remove={this.state.Remove} toggle={this.toggleRemove}  backdrop={true}>
                  <ModalHeader >Remove </ModalHeader>
                      <ModalBody>
                        <p>Are you sure you want to remove this Venue?</p>
                        <FormGroup>
                          <RaisedButton onClick={ () => this.handleRemove() } icon={<FontIcon style={{fontSize:11}}  className="fa fa-trash"/>}   label="Yes"  labelStyle={{fontWeight:"600"}}/>
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