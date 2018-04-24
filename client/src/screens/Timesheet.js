import React from 'react';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';

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

            </Jumbotron>
            </Col>

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