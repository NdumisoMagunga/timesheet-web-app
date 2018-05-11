import React,{Component} from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import ReactTable from "react-table";
import {Form, FormGroup,Input,Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';
import { red50, red900, white } from 'material-ui/styles/colors';

class VenueTable extends Component{
  constructor(props) {
    super(props);

    
    this.state = {
      isOpen: false,
      selectedVenue:false,

    };

    this.toggleModal = this.toggleModal.bind(this);
  }

toggleModal(){
    this.setState({
        isOpen: !this.state.isOpen,
        
    })
}

setSelectedVenue(d){
  
  this.setState({
    selectedVenue:d
  })
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
                        <RaisedButton onClick={ ()=> {
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
                                 <Form method ="put" action ={'/api/update-venue/' + this.state.selectedVenue._id}>
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
                                    <RaisedButton type ="submit"  icon={<FontIcon style={{fontSize:11}} className="fa fa-pencil"/>}   label="Edit"  labelStyle={{fontWeight:"600"}}/>
                                    </FormGroup>
                                 </Form>
                               

                      ):null}
              
                    </ModalBody>
                    <ModalFooter></ModalFooter>
              </Modal>


          </div>
        )
    }
}


export default VenueTable;