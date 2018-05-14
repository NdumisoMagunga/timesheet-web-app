import React,{Component} from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import ReactTable from "react-table";
import {Form, FormGroup,Input,Modal,ModalBody,ModalHeader,ModalFooter, Fade, Label, FormText 
} from 'reactstrap';

import { red50, red900, white } from 'material-ui/styles/colors';
import index from 'react-resize-detector';

class UserTable extends Component{
    constructor(props) {
        super(props);
    
        
        this.state = {
          isOpen: false,
          selectedUser:'',

    
        };
    
        this.toggleModal = this.toggleModal.bind(this);
        this.setSelectedUser = this.setSelectedUser.bind(this);
      }
    
    toggleModal(){
        this.setState({
            isOpen: !this.state.isOpen,
            
        })
    }
    
    setSelectedUser(d){
      
      this.setState({
        selectedUser:d
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
          <ModalHeader>Datails </ModalHeader>
          <ModalBody>
         
            {this.state.selectedUser ? (
                       <div>
                           { this.state.selectedUser.firstname}  { this.state.selectedUser.lastname}<br/>
                           { this.state.selectedUser.email}<br/>
                          
                           {
                            (()=>{
                                if(this.state.selectedUser.venues.length > 0){
                                return(
                                this.state.selectedUser.venues.map((venue,index)=>{
                                {
                                    return(
                                        <p key={index}>{venue.name}</p>
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
    </div>
        )
    }
}


export default UserTable;