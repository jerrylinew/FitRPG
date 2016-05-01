"use strict";

import React from 'react';
import { Grid, Row, Col, Table, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
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

class Game extends React.Component{
  render(){
    return (
      <div className="row">
        <div className="col-md-12 col-xs-12" id="game">
          <img id="enemyImage" src="images/enemy.gif" alt="enemy"/>
          <img id="userImage" src="images/warrior.gif" alt="warrior"/>
          <button id="attackBtn" type="button" className="btn btn-primary btn-large">Attack!</button>
        </div>
      </div>
    );
  }
}

export class Playground extends React.Component {
  render () {
    return (
      <Grid>
        <Row style={{"height":"20px"}}></Row>
        <Row style={{"width":"97%", marginLeft:"20px", marginRight:"20px"}}>
          <Col style={{textAlign:"center"}} md={3}>
            <PieChart width={250} height={250} innerRadius={20} title="Step" data={stepData} chartSeries={stepChartSeries} name={getKey} value={getVal} />
            <PieChart width={250} height={250} innerRadius={20} title="Sleep" data={sleepData} chartSeries={sleepChartSeries} name={getKey} value={getVal} />
          </Col>

          <Col md={6}>
            <Game/>
          </Col>

          <Col md={3}>
            <Panel>Shop</Panel>
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
