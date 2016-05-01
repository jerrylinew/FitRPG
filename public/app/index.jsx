import React from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
import { Header } from './header.jsx';
import { ProgressBar } from './progress_bar.jsx';
import { Playground } from './playground.jsx'


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
                <Button onClick={this.attack.bind(this)} />
                <Playground/>
            </div>
        );
    }
}

var data = {
  username: "colinxy",
  profile: {
    hp: [50, 100],
    exp: [5000, 8000],
    lvl: 3,
    offense: 10,
    defense: 20,
    coins: 177,
  },
  expList: [100, 300, 500, 1000, 2000, 4000, 8000],
  step: 1000,
  sleep: 7.5
}

render(<App data={data}/>, document.getElementById('app'));
