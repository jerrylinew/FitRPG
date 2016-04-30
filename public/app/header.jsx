import React from 'react';
import { Button, ButtonToolbar, Navbar, Nav, NavItem } from 'react-bootstrap';


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
                    <Nav justified>
                        <NavItem>name{/* {this.props.name} */}</NavItem>
                        <NavItem>coins{/* {this.props.coins} */}</NavItem>
                        <NavItem>atk{/* {this.props.attack} */}</NavItem>
                        <NavItem>def{/* {this.props.defense} */}</NavItem>
                        <NavItem href="">Help</NavItem>
                        <NavItem href="">Logout</NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
