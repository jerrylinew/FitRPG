
import React from 'react';

class Main extends React.Component {
    render () {
        return (
            <div>
                <Col xs={6} md={4}>
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

                <Col xs={6} md={4}>
                </Col>

                <Col xs={6} md={4}>
                </Col>
            </div>
        )
    }

}
