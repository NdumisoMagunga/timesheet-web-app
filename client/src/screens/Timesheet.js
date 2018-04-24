import React from 'react';
import { Container, Row, Col, Jumbotron, Button, Fade, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Timesheet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fadeIn: false,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        })
    }




    render(){
        return(
            <div>
                <Container>
                <Row>
                    <Col xs='6'>
                        <h2 style={{textAlign: 'center'}} className="display-3">CHECK-IN</h2>
                        <p className="lead">
                            <Button style={{width: 200, marginLeft: 160}} color="primary" onClick={this.toggle}>IN</Button>
                            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                <Form>
                                    <FormGroup>
                                        <Input type="textarea" name="time" id="exampleTime" placeholder="Time" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="date" id="exampleDate" placeholder="Date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="location" id="exampleLocation" placeholder="Location" />
                                    </FormGroup>
                                </Form>
                            </Fade>
                        </p>

                    </Col>

                    <Col xs='6'>
                        <h2 style={{textAlign: 'center'}} className="display-3">CHECK-OUT</h2>
                        <p className="lead">
                            <Button disabled={this.state.fadeIn} style={{width: 200, marginLeft: 160}} color="primary" onClick={this.toggle}>OUT</Button>
                            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                <Form>
                                    <FormGroup>
                                        <Input type="textarea" name="time" id="time" placeholder="Time" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="date" id="date" placeholder="Date" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="location" id="location" placeholder="Location" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input type="textarea" name="hours" id="hours" placeholder="Total hours " />
                                    </FormGroup>
                                </Form>
                            </Fade>
                        </p>

                    </Col>

                </Row>
                    <Jumbotron>
                            <h1 className="display-3">Summary</h1>
                            <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                            <hr className="my-2" />
                            <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>

                    </Jumbotron>
                </Container>
            </div>
        )
    }
}