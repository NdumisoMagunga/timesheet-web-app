import React,{Component} from 'react';
import ReactTable from "react-table";
import {FontIcon, RaisedButton} from 'material-ui';
import * as moment from 'moment';


class ReviewableSessions extends Component{

    calcDuration({date,timeIn,timeOut}){
        var now = date +" "+timeOut;
        var then = date +" "+timeIn;
    
        var ms = moment(now, "DD/MM/YYYY HH:mm").diff(moment(then, "DD/MM/YYYY HH:mm"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) +" hour(s) "+ moment.utc(ms).format("mm") + " minutes"
        return s;
    }
    render(){

        
        return (
            <ReactTable 
                        style={{margin:20}}

                        headerStyle={{backgroundColor:'white'}}

                        data={this.props.timesheets}
                        columns={[
                          {
                            columns: [
                                {
                                    Header: "User(s)",
                                    id:"users",
                                    accessor: d => d.user. firstname +' '+ d.user.lastname
                                  },
                              {
                                Header: "Date",
                                accessor: "date"
                              },
                                {
                                    Header: "Venue",
                                    id:'venue',
                                    accessor: d => d.venue.name
                                  }
                              ,
                              {
                                Header: "Times",
                                id:"times",
                                accessor: d => d.timeIn +' - '+d.timeOut
                              },
                              {
                                  Header:"Duration",
                                  id:"duration",
                                  accessor: d => this.calcDuration(d),
                              },
                              {
                                Header:"Message",
                                id:"message",
                                accessor: "comment",
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

export default ReviewableSessions;