import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import styles from "./404.module.css";

export default class NotFound extends Component {
  render() {
    return (
      <Grid container justify="center" className={styles.body}>
        <Grid item xs={12}>
          <Typography className={styles.title} variant="h5">
            Welcome to our Website
          </Typography>
          <Typography className={styles.content} variant="body1">
            Please login with facebook to access your account page.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
