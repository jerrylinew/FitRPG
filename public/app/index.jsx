import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import { Header } from './header.jsx';
import { ProgressBar } from './progress_bar.jsx';
import { Playground } from './playground.jsx'
import { createStore}  from 'redux';

class App extends React.Component {
    constructor(props){
      super(props);

      /* Load game data */
      var profile = this.props.data.profile;
      console.log(profile);
      this.state = {
        hp: profile.hp.slice(),
        exp: profile.exp.slice(),
        offense: profile.offense,
        defense: profile.defense,
        coins: profile.coins,
      };

    }

    componentWillUnMount(){

    }
    componentDidMount(){
    //  setInterval(this.loadData, +this.props.pollInterval);
    //  this.props.handle.addListener(this.onChange);
    }

    onChange(data){
      console.log("On change");
      this.setState({
        hp: data.profile.hp.slice(),
        exp: data.profile.exp.slice(),
        offense: data.profile.offense,
        defense: data.profile.defense,
        coins: data.profile.coins
      });
    }

    attack(event, damage) {
      /* decreases hp by one and increases exp by 100 */
      var damage = damage || 1;
      this.setState({
        hp: [this.state.hp[0] - damage, this.state.hp[1]],
        exp: [this.state.exp[0] + damage * 100, this.state.exp[1]]
      });
    }

    render () {
        return (
            <div>
                <Header data={this.props.data} mutable={this.state}/>
                {/* <Button onClick={this.attack.bind(this)} /> */}
                <Playground/>
            </div>
        );
    }
}

var data = {
  username: "colinxy",
  profile: {
    hp: [100, 100],
    exp: [0, 8000],
    lvl: 3,
    offense: 10,
    defense: 20,
    coins: 0
  },
  expList: [100, 300, 500, 1000, 2000, 4000, 8000],
  step: 1000,
  sleep: 7.5
};


class Store{
  constructor(data){
    this.data = Object.assign({}, data);
    this.dest = null;
  }

  addListener(func){
    this.dest = func;
  }

  makeChange(func){
    func(this.data);
    this.broadcastChange();
  }

  broadcastChange(){
    this.dest(this.data);
  }
}

class Handle{
  constructor(store){
    this.store = store;
  }
  addListener(func){
    this.store.addListener(func);
  }
}

var store = new Store(data);
var handle = new Handle(store);

var app = <App data={data} handle={handle}/>;
ReactDOM.render(app, document.getElementById('app'));
