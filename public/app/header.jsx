import React from 'react';
import { Button, ButtonToolbar, Navbar, Nav, NavItem } from 'react-bootstrap';


/*class Name extends React.Component {
 *
 *}*/


export class Header extends React.Component {
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
