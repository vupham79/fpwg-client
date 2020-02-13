import { Grid } from "@material-ui/core";
import React from "react";
import LoginButtonFacebook from "./LoginFBButton";
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
    <Grid container className={styles.navbar_editor}>
      <Grid container item md={10} xs={12} alignItems="center">
        <Grid item md={1} xs={2} className={styles.brand}>
          <h3>FPWG</h3>
        </Grid>
        <Grid container justify={"space-between"} item sm={2} xs={10}>
          {navItems.map((item, index) => (
            <Grid
              // className={styles.nav_item}
              item
              xs={3}
              sm={1}
              key={index}
            >
              <Link className={styles.links} to={item.link}>
                {item.title}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container item md={2} xs={12} justify={"flex-end"}>
        <LoginButtonFacebook />
      </Grid>
    </Grid>
  );
};

export default CustomNavBarEditor;
