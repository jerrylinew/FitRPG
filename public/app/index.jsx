import React from 'react';
import { render } from 'react-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';


class Header extends React.Component {
    render () {
        /*var ButtonToolBar = ReactBootstrap.ButtonToolBar;
         *var Button = ReactBootstrap.Button;*/
        return (
            <div>
                <ButtonToolbar>
                    <Button>Name</Button>
                    <Button>Coins</Button>
                    <Button>ATK</Button>
                    <Button>DEF</Button>
                    <Button>Help</Button>
                    <Button>Logout</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <div>
                <p> Hello React! </p>
                <Header/>
            </div>
        );
    }
}


render(<App/>, document.getElementById('app'));
