import React, {Component} from 'react';
import { Grid, Image, Icon, Card } from 'semantic-ui-react'

class Timesheet extends Component {
constructor(props){
    super(props);
}


render(){
    return (
        <div>
        <Grid container columns={2}>
            <Grid.Column>
                <Card>
                    <Image src='/assets/images/avatar/large/daniel.jpg' />
                    <Card.Content>
                        <Card.Header>Daniel</Card.Header>
                        <Card.Meta>Joined in 2016</Card.Meta>
                        <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        10 Friends
                    </a>
                    </Card.Content>
                </Card>
            </Grid.Column>

            <Grid.Column>
                <Card>
                    <Image src='/assets/images/avatar/large/daniel.jpg' />
                    <Card.Content>
                        <Card.Header>Daniel</Card.Header>
                        <Card.Meta>Joined in 2016</Card.Meta>
                        <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        10 Friends
                    </a>
                    </Card.Content>
                </Card>
            </Grid.Column>
            
        </Grid>
        
        </div>
    )
}

}

export default Timesheet;