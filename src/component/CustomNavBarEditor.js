import { AppBar, Grid } from "@material-ui/core";
import React from "react";
import LoginButtonFacebook from "../theme/theme1/components/LoginButtonFB";
import styles from "./index.module.css";
import Link from "./link";

const navItems = [
  {
    title: "Design",
    link: "/edit"
  },
  {
    title: "Pages",
    link: "/pages"
  },
  {
    title: "Settings",
    link: "/settings"
  }
];

const CustomNavBarEditor = () => {
  return (
    <AppBar className={styles.app_bar} position="sticky">
      <Grid container justify="space-between">
        <Grid container item xs={8} sm={11} alignItems="center">
          <Grid item sm={1} xs={2} className={styles.name}>
            <img
              src="./images/v-icon.png"
              width="30"
              height="30"
              alt=""
              className="d-inline-block align-center"
            />
            ampPage
          </Grid>
          <Grid container justify="space-around" item sm={2} xs={10}>
            {navItems.map((item, index) => (
              <Grid className={styles.nav_item} item xs={3} sm={1} key={index}>
                <Link className={styles.links} to={item.link}>
                  {item.title}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3} sm={1}>
          <LoginButtonFacebook />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default CustomNavBarEditor;
