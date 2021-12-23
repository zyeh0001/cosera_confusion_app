import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
} from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from './images/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  render() {
    return (
      <>
        <Navbar dark expand='md'>
          <div className='container'>
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className='mr-auto' href='/'>
              <img
                src={logo}
                alt='Ristorante Con Fusion'
                height='30'
                width='41'
              ></img>
            </NavbarBrand>
            <Collapse navbar isOpen={this.state.isNavOpen}>
              <Nav navbar>
                <NavItem>
                  <NavLink className='nav-link' to='/'>
                    <sapn className='fa fa-home fa-lg'></sapn> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/aboutus'>
                    <sapn className='fa fa-info fa-lg'></sapn> About us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/menu'>
                    <sapn className='fa fa-list fa-lg'></sapn> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='nav-link' to='/contactme'>
                    <sapn className='fa fa-address-card fa-lg'></sapn> Contact
                    us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className='container'>
            <div className='row row-header'>
              <div className='col-12 col-sm-6'>
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </>
    );
  }
}

export default Header;
