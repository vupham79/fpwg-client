import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, Form, Button, Nav } from 'react-bootstrap';
import LoginButtonFacebook from './LoginButtonFB';
import {Link} from "react-router-dom";

const CustomNavBarEditor = () => { 
  var Style = {
    zIndex: 1000,
    left: 0,
    right: 0,
    position: "fixed"   
  };
    return (
      <div style = {Style}>
        <Navbar bg="light" variant="light">
            <Navbar.Brand > 
                <img src="./images/v-icon.png" width="30" height="30" className="d-inline-block align-center"/>
                ampPage
            </Navbar.Brand>
        <Nav variant="tabs" defaultActiveKey={window.location.pathname}>
          <Nav.Item>
          <Nav.Link eventKey="/design" style={{height: 60}} ><Link to="/design" style={{color: "black", textDecoration: 'none'}} >Design</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/pages" style={{height: 60}} ><Link to="/pages" style={{color: "black", textDecoration: 'none'}} >Pages</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/settings" style={{height: 60}} ><Link to="/settings" style={{color: "black", textDecoration: 'none'}} >Settings</Link></Nav.Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"> </Nav>         
          <LoginButtonFacebook/>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }

export default CustomNavBarEditor