
import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap';


export class Playground extends React.Component {
    render () {
        return (
            <Grid>
                <Row>
                    <Col md={4}>
                        <ListGroup>
                            <ListGroupItem>
                                Item 1
                            </ListGroupItem>
                            <ListGroupItem>
                                Item 1
                            </ListGroupItem>
                            <ListGroupItem>
                                Item 1
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <ListGroup>
                            <ListGroupItem>
                                dummy
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <ListGroup>
                            <ListGroupItem>
                                dummy
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
