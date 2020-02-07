import React, { Component } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import styles from "./login.module.css";
import Link from "../../component/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

export default class LoginPage extends Component {
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
        <Grid item>
          <Link to="/view">
            <Button className={styles.login_button}>
              <FontAwesomeIcon
                icon={faFacebookSquare}
                className={styles.facebook_icon}
              />
              Continues with facebook
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}
