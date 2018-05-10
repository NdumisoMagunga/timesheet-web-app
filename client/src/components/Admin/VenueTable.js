import React,{Component} from 'react';
import {FontIcon, RaisedButton} from 'material-ui';
import ReactTable from "react-table";

import { red50, red900, white } from 'material-ui/styles/colors';

class VenueTable extends Component{

  
    render(){
        return (
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
                        <RaisedButton onClick={ ()=> {
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
        )
    }
}


export default VenueTable;