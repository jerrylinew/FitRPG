import React from 'react';
import { Button, ButtonToolbar, Navbar, Nav, NavItem, Col, Row, Grid, Glyphicon} from 'react-bootstrap';
import { ProgressBar } from './progress_bar.jsx'

class InfoBar extends React.Component {
  render (){
    return(
      <Row className="infobar">
        <Col lg={3} sm={3} xs={5} className="infobar-logo-wrapper">
          <span> {"FitRPG"} </span>
        </Col>
        <Col lg={6} sm={5} xs={0}> </Col>
        <Col lg={3} sm={4} xs={7} className="infobar-icon-wrapper">

          <span className="infobar-box infobar-clickable">
            <Glyphicon glyph="off" className="infobar-icon "/>
          </span>
            <span className="infobar-box infobar-clickable">
              <Glyphicon glyph="cog" className="infobar-icon "/>
            </span>
            <span className="infobar-coin-box">
              <span id="nameDisplay" className="infobar-username">
                {this.props.username }
              </span>
              <img src="./assets/gold.png" style={{verticalAlign:"text-top", height: "16px"}}/>
              <span id="coinsDisplay" className="infobar-coin-count">
                {this.props.coins}
              </span>
            </span>
        </Col>
      </Row>
    );
  }
}

class StatsGrid extends React.Component{
  render(){
    return null;
  }
}

class StatsBar extends React.Component{
  constructor(props){
    super(props);
    this.styles = {
      hpColor:"#DA5353" /*Orange*/,
      expColor:"#FFDD35" /*Khaki*/
    };
  }
  render(){
    var hp = this.props.hp,
        exp = this.props.exp;
    var hpPerc = hp[0] / hp[1],
        expPerc = exp[0] / exp[1];
    return (
      <div>

        <div className="statsCol">
          <div className="fa fa-heart statsbar-first-elem" aria-hidden="true"></div>
          <div className="statsbar-second-elem">
            <ProgressBar id="hpBar" color={this.styles.hpColor}
            progress={hpPerc}></ProgressBar>
          </div>
          <div id="HPDisplay" className="statsbar-last-elem">
            100/100
          </div>
        </div>

        <div className="statsCol">
          <div className="fa fa-cubes statsbar-first-elem" aria-hidden="true"></div>
          <div className="statsbar-second-elem">
            <ProgressBar id="expBar" color={this.styles.expColor}
            progress={expPerc}></ProgressBar>
          </div>
          <div id="EXPDisplay" className="statsbar-last-elem">
            0/100
          </div>
        </div>

      </div>
    );
  }
}

class Stats extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Row className="statsRow">
        <Col sm={2} xs={6}>
          <img src="./assets/off.png" style={{verticalAlign:"text-top", height: "40px"}}/>
          <span id="atkDisplay" className="offdefSpan">{this.props.data.offense} </span>
        </Col>
        <Col sm={2} xs={6}>
          <img src="./assets/def.png" style={{verticalAlign:"text-top", height: "40px"}}/>
          <span id="defDisplay" className="offdefSpan">{this.props.data.defense} </span>

        </Col>
        <Col sm={8} xs={12}>
          <StatsBar hp={this.props.data.hp} exp={this.props.data.exp}/>
        </Col>
      </Row>
    );
  }
}

export class Header extends React.Component {
  render(){
    return (
      <div>
        <InfoBar username={this.props.data.username} coins={this.props.mutable.coins}/>
        <Stats data={this.props.mutable}/>
      </div>
    );
  }
    // render () {
    //     /*var ButtonToolBar = ReactBootstrap.ButtonToolBar;
    //      *var Button = ReactBootstrap.Button;*/
    //     return (

    //     );
    // }
}
