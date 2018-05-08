import React, {Component} from 'react';
import {Table} from 'reactstrap';

class AdminCentral extends Component {

render(){
    return (
        <div>
            <Table borderless>
        <thead>
          <tr>
            
            <th>Venue</th>
            <th>Users</th>
            <th>TimeSheet</th>
            <th>Submit Review</th>
          </tr>
        </thead>
        <tbody>
          <tr>
           
            <td>leogem</td>
            <td>Ndumiso</td>
            <td>TimeSheet</td>
            <td>focus</td>
          </tr>
         
        </tbody>
      </Table>
        </div>
    )
}

}

export default AdminCentral;