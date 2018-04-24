import React from 'react';
import { Container, Row, Col, Jumbotron, Button, Fade, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Timesheet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            inActive: false,
            fadeOut: true,
            outActive: false
        }
        this.toggleIn = this.toggleIn.bind(this)
        this.toggleOut = this.toggleOut.bind(this)
    }

    toggleIn() {
        this.setState({
            inActive: !this.state.inActive,
            fadeOut: !this.state.fadeOut
        })
    }

    toggleOut() {
        this.setState({
            outActive: !this.state.outActive
        })
    }




    render(){
        return(
            <div>
                <Container>
                <Row>
                    <Col xs='6'>
                        <h3 style={{textAlign: 'center'}} className="display-3">CHECK-IN</h3>
                        <p className="lead">
                            <Button style={{width: 200, marginLeft: 160}} color="primary" onClick={this.toggleIn}>IN</Button>
                            <Fade in={this.state.inActive} tag="h5" className="mt-3">
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
                        <h3 style={{textAlign: 'center'}} className="display-3">CHECK-OUT</h3>
                        <p className="lead">
                            <Button disabled={this.state.fadeOut} style={{width: 200, marginLeft: 160}} color="primary" onClick={this.toggleOut}>OUT</Button>
                            <Fade in={this.state.outActive} tag="h5" className="mt-3">
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