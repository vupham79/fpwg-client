import { Grid } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Link from "../component/link";
import LoginButtonFacebook from "../theme/theme1/components/LoginButtonFB";
import styles from "./index.module.css";

const CustomNavBarEditor = () => {
  return (
    <Grid>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <img
            src="./images/v-icon.png"
            width="30"
            height="30"
            className="d-inline-block align-center"
          />
          ampPage
        </Navbar.Brand>
        <Nav variant="tabs" defaultActiveKey={window.location.pathname}>
          <Nav.Item>
            <Link to="/edit" className={styles.links}>
              Design
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/pages" className={styles.links}>
              Pages
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/settings" className={styles.links}>
              Settings
            </Link>
          </Nav.Item>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"> </Nav>
          <LoginButtonFacebook />
        </Navbar.Collapse>
      </Navbar>
    </Grid>
  );
};

export default CustomNavBarEditor;
