import React, {Component} from 'react';
import { Tabbordion, TabPanel, TabLabel, TabContent } from 'react-tabbordion'
class AdminCentral extends Component {

render(){
    return (
        <div>
            <p> Admin Central </p>
           <Tabbordion className="tabs" name="tabs">
                <TabPanel>
                    <TabLabel>My title</TabLabel>
                    <TabContent>
                        <h2>Sample</h2>
                        <p>Content</p>
                    </TabContent>
                </TabPanel>
                <TabPanel>
                    <TabLabel>Another title</TabLabel>
                    <TabContent>
                        <h2>Another Sample</h2>
                        <p>Some other kind of content</p>
                    </TabContent>
                </TabPanel>
    </Tabbordion> 
        </div>
    )
}

}

export default AdminCentral;