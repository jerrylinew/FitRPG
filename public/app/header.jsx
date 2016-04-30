import React from 'react';
import { Button, ButtonToolbar, Navbar, Nav, NavItem } from 'react-bootstrap';


export class Header extends React.Component {


    render () {
        /*var ButtonToolBar = ReactBootstrap.ButtonToolBar;
         *var Button = ReactBootstrap.Button;*/
        return (
            <div>
                <Navbar bsStyle="inverse" justified fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>FitRPG</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem>Help</NavItem>
                            <NavItem>Logout</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Nav bsStyle="tabs" justified style={{background:"black"}}>
                    <NavItem>
                        name {/* {this.props.name} */}
                    </NavItem>
                    <NavItem>
                        coins {/* {this.props.coins} */}
                    </NavItem>
                    <NavItem>
                        atk {/* {this.props.attack} */}
                    </NavItem>
                    <NavItem>
                        def {/* {this.props.defense} */}
                    </NavItem>
                </Nav>
            </div>
        );
    }
}
