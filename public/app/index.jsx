import React from 'react';
import { render } from 'react-dom';
import { Button, ButtonToolbar, Navbar, Nav, NavItem } from 'react-bootstrap';


class Header extends React.Component {
    render () {
        /*var ButtonToolBar = ReactBootstrap.ButtonToolBar;
         *var Button = ReactBootstrap.Button;*/
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>FitRPG</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem>Name</NavItem>
                        <NavItem>Coins</NavItem>
                        <NavItem>ATK</NavItem>
                        <NavItem>DEF</NavItem>
                        <NavItem>Help</NavItem>
                        <NavItem>Logout</NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <div>
                {/* <p> Hello React! </p> */}
                <Header/>
            </div>
        );
    }
}


render(<App/>, document.getElementById('app'));
