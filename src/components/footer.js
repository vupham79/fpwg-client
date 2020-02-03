import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import styles from "./index.module.css";
import {
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import {
  Grid,
  Typography,
  Box,
  Input,
  Button,
  Divider,
  Fab
} from "@material-ui/core";

const links = ["Home", "About", "Gallery", "Events", "Contact", "News"];

const txtStyles = {
  backgroundColor: "white",
  marginTop: "5vh",
  height: "7.5vh",
  width: "85%",
  padding: "2vh 4vh"
};

const iconStyles = {
  color: "white",
  marginTop: "6vh"
};

class FooterPage extends Component {
  constructor(props) {
    super(props);
    this.state = { links };
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        className={styles.footer}
      >
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography variant="h5" color="textSecondary">
            ABOUT
          </Typography>
          <Typography component="div">
            <Box lineHeight={4}>Welcome to our website!</Box>
            <Box>
              Take a look around and feel free to contact us for more
              information.
            </Box>
          </Typography>
          <Divider className="divider" variant="fullWidth" />
          <FontAwesomeIcon style={iconStyles} icon={faFacebookF} size="2x" />
        </Grid>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography variant="h5" color="textSecondary">
            QUICK LINKS
          </Typography>
          <Grid container justify="flex-start" direction="column">
            {this.state.links.map((link, index) => (
              <Grid item xs={2} sm={1} key={index}>
                <Box lineHeight={2}>{link}</Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography variant="h5" color="textSecondary">
            SIGN UP FOR OUR NEWSLETTER
          </Typography>
          <Typography variant="body1">
            Get exclusive updates and promotions straight to your email.
          </Typography>
          <Input
            style={txtStyles}
            variant="outlined"
            placeholder="Email"
            autoComplete="true"
            inputProps={{ "aria-label": "description" }}
          />
          <Button className={styles.btn_signUp} variant="outlined">
            Sign UP
          </Button>
        </Grid>
        <Divider className={styles.bot_divider} variant="middle" />
        <Grid item sm={12} xs={12} container className={styles.bot_footer}>
          <Grid item sm={9} container justify="flex-start">
            <Typography variant="body1">© Foody</Typography>
          </Grid>
          <Grid item sm={3} container justify="center">
            <Typography variant="body1">POWERED BY</Typography>
          </Grid>
        </Grid>
        <Fab variant="extended" color="secondary" position="right-bottom">
          <FontAwesomeIcon icon={faEllipsisH} />
        </Fab>
      </Grid>
    );
  }
}

export default FooterPage;
