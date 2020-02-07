import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, Form, Button, Nav } from 'react-bootstrap';
import LoginButtonFacebook from './LoginButtonFB';

const CustomNavBar = () => { 
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand > 
                <img src="./images/v-icon.png" width="30" height="30" className="d-inline-block align-center"/>
                ampPage
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="./index">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>            
          </Nav>         
          <LoginButtonFacebook/>
        </Navbar.Collapse>
      </Navbar>
    )
  }

export default CustomNavBar