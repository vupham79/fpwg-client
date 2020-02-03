import React, { Component } from "react";
import { Grid, Typography, Divider, Box } from "@material-ui/core";
import styles from "./about.module.css";

export default class AboutPage extends Component {
  render() {
    console.log("about page");

    return (
      <Grid container justify="center" className={styles.about_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
          >
            About
          </Typography>
          <Divider className="divider" variant="center" />
        </Grid>
        <Grid item sm={10} xs={10} justify="flex-start">
          <Typography variant="body1" color="textPrimary">
            <Box lineHeight={5}>Welcome to our website!</Box>
            <Box>
              Take a look around and feel free to contact us for more
              information.
            </Box>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
