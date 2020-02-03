import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { AppBar } from "@material-ui/core";
import styles from "./index.module.css";
import Link from '../components/link'

const navItems = ["Home", "About", "Gallery", "Events", "Contact", "News"];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { navItems };
  }
  render() {
    return (
      <AppBar position="fixed" className={styles.app_bar}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={2}>
            <p className={styles.shopName}>Foody</p>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container justify="flex-end">
              {this.state.navItems.map((item, index) => (
                <Grid className={styles.nav_item} item xs={2} sm={1} key={index}>
                  <Link className={styles.links} to={item}>{item}</Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

export default Header;
