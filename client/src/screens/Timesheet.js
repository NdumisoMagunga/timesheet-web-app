<<<<<<< HEAD
import React, {Component} from 'react';
import { Grid, Image, Icon, Card } from 'semantic-ui-react'
=======
import React from 'react';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
>>>>>>> 7e0dab0a29f4a3aa08d082975f056f7ffc77f7ba

const Timesheet = (props) => {
  return (
    <Container>
        <Row>
            <Col>
            <Jumbotron>
            <p className="lead">
                <h2 className="display-3">CHECK-IN</h2>
                <Button color="primary">IN</Button>
                </p>

                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>

<<<<<<< HEAD
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
=======
            </Jumbotron>
            </Col>
>>>>>>> 7e0dab0a29f4a3aa08d082975f056f7ffc77f7ba

            <Col>
            <Jumbotron>
            <p className="lead">
                <h2 className="display-3">CHECK-OUT</h2>
                <Button style={{alignSelf: 'center'}} color="primary">OUT</Button>
                </p>

                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>

            </Jumbotron>
            </Col>
        </Row>
    </Container>
  );
};

export default Timesheet;