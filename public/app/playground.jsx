"use strict";

import React from 'react';
import { Grid, Row, Col, Table, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { PieChart } from 'react-d3-basic';
import { ProgressBar} from './progress_bar.jsx'

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

class Game extends React.Component {
  render () {
    return (
      <div className="row">
        <button className="btn btn-primary btn-lg" id="startBattle">
            Enter the arena!
        </button>
        <div className="col-md-12 col-xs-12" id="game">
          <div id="enemyHPWrapper" style={{position:"absolute", display:"none"}}>
            <ProgressBar color="red" progress="1.0" shape="thin"/>
          </div>
          <img id="enemyImage" src="images/enemy.gif" alt="enemy"/>
          <img id="userImage" src="images/warrior.gif" alt="warrior"/>
        </div>
        <button id="attackBtn" type="button" className="btn btn-primary btn-lg">Attack!</button>
      </div>
    );
  }
}

class ShopItem extends React.Component {
  render () {
    return (
      <div id="shopContainer"></div>
    );
  }
}

export class Playground extends React.Component {
  render () {
    return (
      <Grid style={{"width":"97%", marginLeft:"20px", marginRight:"20px"}}>
        <Row style={{"height":"20px"}}></Row>
        <Row>
          <Col md={3}>
            <div id="stepState" />
            <br/>
            <div id="sleepState" />

            {/* <PieChart width={250} height={250} innerRadius={20} title="Step" data={stepData} chartSeries={stepChartSeries} name={getKey} value={getVal} /> */}
            {/* <PieChart width={250} height={250} innerRadius={20} title="Sleep" data={sleepData} chartSeries={sleepChartSeries} name={getKey} value={getVal} /> */}
          </Col>

          <Col md={6}>
            <Game/>
          </Col>

          <Col style={{"textAlign":"center"}} md={3}>
            <Panel style={{"fontSize":"25px", "fontWeight":"400", "boxShadow":"1px 1px 3px 1px #aaa", "background":"repeating-linear-gradient(to right, #f6ba52, #f6ba52 10px, #ffd180 10px, #ffd180 20px)"}}>
              <span>Shop</span>
            </Panel>
            <div>
              <div id="shopContainer" style={{"margin":"0 auto"}} />
            </div>

          </Col>
        </Row>
      </Grid>
    );
  }
}
