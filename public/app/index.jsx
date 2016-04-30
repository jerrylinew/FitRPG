import React from 'react';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';
import { Header } from './header.jsx';
import { ProgressBar } from './progress_bar.jsx';
import { Playground } from './playground.jsx'


class App extends React.Component {
    constructor(props){
      super(props);
      this.styles = {
        hpColor:"#FEFCD7" /*Orange*/,
        expColor:"#F0E68C" /*Khaki*/
      };

      /* Load game data */
      var game = this.props.data.game;
      console.log(game);
      this.state = {
        hp: game.hp.slice(),
        exp: game.exp.slice()
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
        var hpPercentage = this.state.hp[0] / this.state.hp[1];
        var expPercentage = this.state.exp[0] / this.state.exp[1];
        console.log(hpPercentage, expPercentage);
        return (
            <div>
                {/* <p> Hello React! </p> */}
                <Header/>
                <Playground/>
                <Button onClick={this.attack.bind(this)}> Click Me To Attack </Button>
                <ProgressBar color={this.styles.hpColor} progress={hpPercentage}/>
                <ProgressBar color={this.styles.expColor} progress={expPercentage}/>
            </div>
        );
    }
}

var data = {
  game: {
    hp: [50, 100],
    exp: [5000, 8000]
  }
}

render(<App data={data}/>, document.getElementById('app'));
