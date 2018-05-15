import React,{Component} from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import ReactTable from "react-table";
import {Form, FormGroup,Input,Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
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
      }

    //   componentDidMount(){
    //     this.props.myTimesheets(this.props.selectedUser._id);
    // }
    
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
        
      }),()=>(console.log("users",d))
      
    }

  
    render(){
        console.log("users",this.state.selectedUser)
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
                        icon={<FontIcon style={{fontSize:11}} className="fa fa-paste"/>} label="Datails" style={{fontSize:11}} labelStyle={{fontWeight:"600", fontSize:8, color:white}} primary={false} buttonStyle={{backgroundColor:"#0000cc", marginLeft:5}} />
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
            defaultPageSize={5}
            className="-highlight"
          />
        
          <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop={true}>
          <ModalHeader>Datails </ModalHeader>
          <ModalBody>
         
            {this.state.selectedUser ? (
                       <div>
                           <h4>{ this.state.selectedUser.firstname}  { this.state.selectedUser.lastname}</h4>
                           <h6>{ this.state.selectedUser.email}</h6><br/>
                          
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
                        <RaisedButton   icon={<FontIcon style={{fontSize:11}} className="fa fa-trash"/>}   label="Yes"  labelStyle={{fontWeight:"600"}}/>
                    </FormGroup>
                 </ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
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


export default connect(mapStateToProps,actions)(UserTable);