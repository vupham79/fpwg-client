import React, { Component } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import styles from "./login.module.css";
import Link from "../../component/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";
import { login } from "../../actions";
import { Redirect } from "react-router-dom";
import { firebaseAppAuth, provider } from "../../utils/firebase";
import withFirebaseAuth from "react-with-firebase-auth";
class LoginPage extends Component {
  handleLogin = () => {
    const { login } = this.props;
    firebaseAppAuth
      .signInWithPopup(provider)
      .then(async function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = result.credential.accessToken;
        // The signed-in user info.
        var profile = result.additionalUserInfo.profile;
        await login({ accessToken, profile });
        return <Redirect to={"/view"} />;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

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
            <Button
              className={styles.login_button}
              onClick={() => this.handleLogin()}
            >
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

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  login: ({ accessToken, profile }) => dispatch(login({ accessToken, profile }))
});

export default withFirebaseAuth({
  provider,
  firebaseAppAuth
})(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
