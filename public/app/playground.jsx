"use strict";

import React from 'react';
import { Grid, Row, Col, Table, ListGroup, ListGroupItem, Jumbotron } from 'react-bootstrap';
import { PieTooltip } from 'react-d3-tooltip';
import { PieChart } from 'react-d3-basic';


const ACHIEVED = "green";
const UNACHIEVED = "grey";

var stepData = [
  {"key": "steps", "val": 1000},
  {"key": "unfulfilled", "val": 9000}
];

var stepChartSeries = [
  {"field": "steps", "name": "steps taken", "color": ACHIEVED},
  {"field": "unfulfilled", "name": "steps unfulfilled", "color": UNACHIEVED}
];

var sleepData = [
  {"key": "sound sleep", "val": 6},
  {"key": "unsound sleep", "val": 1}
];

var sleepChartSeries = [
  {"field": "sound sleep", "name": "sound sleep", "color": ACHIEVED},
  {"field": "unsound sleep", "name": "unsound sleep", "color": UNACHIEVED}
]

var getKey = function(d) {
  return d.key;
};

var getVal = function(d) {
  return d.val;
};


export class Playground extends React.Component {
  render () {
    return (
      <Grid>
          <Row>
              <Col md={3}>
                  <Table striped bordered condensed hover>
                      <tbody>
                          <tr>
                              <th>Step</th>
                              <th>1000 steps</th>
                              <th>10000 steps</th>
                          </tr>
                          <tr>
                              <th>Sleep</th>
                              <th>7 hours of sound sleep</th>
                              <th>2 hours of unsound sleep</th>
                          </tr>
                      </tbody>
                  </Table>

                  <PieChart width={300} height={300} innerRadius={30} title="Step" data={stepData} chartSeries={stepChartSeries} name={getKey} value={getVal} />
                  <PieChart width={300} height={300} innerRadius={30} title="Sleep" data={sleepData} chartSeries={sleepChartSeries} name={getKey} value={getVal} />
              </Col>

              <Col md={6}>
                  <Jumbotron style={{"textAlign":"center"}}>
                      <p>dummy</p>
                  </Jumbotron>
              </Col>

              <Col md={3}>
                  <Jumbotron style={{"textAlign":"center"}}>
                      <p>Shop</p>
                  </Jumbotron>
                  <ListGroup>
                      <ListGroupItem>
                          Item 1
                      </ListGroupItem>
                      <ListGroupItem>
                          Item 2
                      </ListGroupItem>
                      <ListGroupItem>
                          Item 3
                      </ListGroupItem>
                  </ListGroup>
              </Col>
          </Row>
      </Grid>
    );
  }
}
