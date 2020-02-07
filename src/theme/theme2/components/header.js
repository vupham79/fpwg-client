import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { AppBar } from "@material-ui/core";
import styles from "./index.module.css";
import Link from "../../../component/link";

class Header extends Component {
  render() {
    const navItems = ["Home", "About", "Gallery", "Event", "Contact", "New"];

    return (
        <AppBar className={styles.app_bar} position="sticky">
          <Grid container alignItems="center">
            <Grid item xs={12} sm={2}>
              <p className={styles.shopName}>Foody</p>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Grid container justify="flex-end">
                {navItems.map((item, index) => (
                  <Grid
                    className={styles.nav_item}
                    item
                    xs={2}
                    sm={1}
                    key={index}
                  >
                    <Link className={styles.links} to={item}>
                      {item}
                    </Link>
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
