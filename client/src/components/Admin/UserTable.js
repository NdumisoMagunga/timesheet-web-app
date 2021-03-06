import React,{Component} from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import ReactTable from "react-table";
import {Form, FormGroup,Input,Modal,ModalBody,ModalHeader,ModalFooter,Table, Fade, Label, FormText 
} from 'reactstrap';

import { red50, red900, white } from 'material-ui/styles/colors';
import index from 'react-resize-detector';
import * as moment from 'moment';
import * as actions from '../../actions';
import {connect} from 'react-redux'

class UserTable extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
          isOpen: false,
          RemoveUser:false,
          selectedUser:'',
    
        };
    
        this.toggleModal = this.toggleModal.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
        this.toggleRemoveUser = this.toggleRemoveUser.bind(this);
        this.handleRemoveUser = this.handleRemoveUser.bind(this)
      }

      handleRemoveUser(){
        this.toggleRemoveUser()
        let obj={
            "user":this.state.selectedUser._id
          }
    
          fetch('http://localhost:80/api/delete-user/' + obj.user, {
          method: 'POST',       
  
      }).then((response)  =>  response.json())
      .then(result => this.props.fetchUsers())
      .catch(err => err);
      }


      

    componentDidUpdate(){
        this.props.myTimesheets(this.state.selectedUser._id);
    }

    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen,
            
        })
    }
    toggleRemoveUser(){
        this.setState({
            RemoveUser: !this.state.RemoveUser,
            
        })
    }
    
    setSelectedUser(d){
      this.setState({
        selectedUser:d,
      })
    }

    render(){
        console.log("user details",this.state.selectedUser)
        return (
            <div>
                
            <ReactTable 
            style={{margin:20}}

            headerStyle={{backgroundColor:'white'}}

            data={this.props.users}
            columns={[
              {
                columns: [
                  {
                    Header: "Name",
                    id:"name",
                    accessor: d => d.firstname +' '+ d.lastname
                  },
                    {
                        Header: "email",
                        id:'email',
                        accessor: d => d.email
                      }
                  ,
                  {
                    Header: "Venues Assigned ",
                    id:"venues",
                    accessor: a => {
                        let venues ="";

                        for(var i =0; i < a.venues.length; i++){
                            if (i < (a.venues.length -1) ){
                                venues += a.venues[i].name +", "
                            }else{
                                venues += a.venues[i].name
                            }
                            
                        }
                        return venues;

                        
                    }
                  },
                  {
                      Header:"Action(s)",
                      id:"actions",
                      accessor: d => d,
                      Cell: row => (
                          <div>
                         < RaisedButton onClick={()=>{ 
                          this.setSelectedUser(row.value);
                          this.toggleModal();
                        }} 
                        icon={<FontIcon style={{fontSize:11}} className="fa fa-paste"/>} label="Details" style={{fontSize:11}} labelStyle={{fontWeight:"600", fontSize:8, color:white}} primary={false} buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} />
                        < RaisedButton onClick={()=>{ 
                          this.setSelectedUser(row.value);
                          this.toggleRemoveUser();
                        }} 
                        icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>} label="Remove" style={{fontSize:11}} labelStyle={{fontWeight:"600", fontSize:8, color:white}} buttonStyle={{backgroundColor:"#cc0000", marginLeft:10}} />
                        </div>
                      )
                  }
                ]
              }
            ]}
            defaultPageSize={15}
            className="-highlight"
          />
        
          <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true} size ="lg">
          <ModalHeader>Details </ModalHeader>
          <ModalBody>
         
            {this.state.selectedUser ? (
                       <div>
                           <Table>
                               <thead>
                                   <tr>
                                       <td>First Name</td>
                                       <td>Last Name</td>
                                       <td>Email</td>
                                       <td>Venue(s)</td>
                                   </tr>
                               </thead>
                               <tbody>
                                    <tr>
                                       <td>{ this.state.selectedUser.firstname}</td>
                                       <td>{ this.state.selectedUser.lastname}</td>
                                       <td>{ this.state.selectedUser.email}</td>
                                       {
                                        (()=>{
                                            if(this.state.selectedUser.venues.length > 0){
                                            return(
                                            this.state.selectedUser.venues.map((venue,index)=>{
                                            {
                                                return(
                                                    <li key={index}>{venue.name}</li>
                                            )

                                                }})
                                            )
                                            }
                                            })()
                                        }
                                        {this.props.mysheets.map((data, index) => {
                                            <td>{data.venue.name}   {data.timeIn}   {data.timeOut}  {data.date}</td>
                                        })}

                                   </tr>
                               </tbody>
                           </Table>
                           <Table>
                                <thead>
                                    <tr>
                                        <td>Venue</td>
                                        <td>Time In</td>
                                        <td>Time Out</td>
                                        <td>Date</td>

                                    </tr>
                                </thead>
                                <tbody>

                                        {this.props.mysheets.map((data, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{data.venue.name}</td>
                                                    <td>{data.timeIn}</td>
                                                    <td>{data.timeOut}</td>
                                                    <td>{data.date}</td>
                                                </tr>
                                            )
                                        })}

                                </tbody>
                           </Table>

                       </div>
                     

            ):null}
    
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>

        <Modal  isOpen={this.state.RemoveUser} toggle={this.toggleRemoveUser}  backdrop={true}>
            <ModalHeader icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>}>Remove </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to remove this User?</p>
                    <FormGroup>
                        <RaisedButton   icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>}   label="Yes"  labelStyle={{fontWeight:"600"}} onClick ={this.handleRemoveUser}/>
                    </FormGroup>
                 </ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
    </div>
        )
    }
}
function mapStateToProps({auth,timesheets, mysheets}){
    return {
        auth,
        mysheets,
        timesheets,
        
        
    }
}


export default connect(mapStateToProps,actions)(UserTable);