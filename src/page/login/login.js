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
      .then(async function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = result.credential.accessToken;
        // The signed-in user info.
        var profile = result.additionalUserInfo.profile;
        await login({ accessToken, profile });
        return <Redirect to={"/view"} />;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        className={styles.body}
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/images/background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          item
          container
          lg={3}
          md={4}
          sm={5}
          xs={10}
          justify="center"
          style={{
            height: "50vh",
            alignSelf: "center",
            backgroundColor: "rgb(222,228,231, 0.2)",
            borderRadius: "2rem",
            padding: "1.5rem",
          }}
        >
          <Grid item xs={12}>
            <Typography className={styles.title} variant="h6">
              FPWG
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.content1} variant="body1">
              WELCOM TO OUR WEBSITE
            </Typography>
            <Typography className={styles.content2} variant="body2">
              Please login with facebook to access your account page.
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ accessToken, profile }) =>
    dispatch(login({ accessToken, profile })),
});

export default withFirebaseAuth({
  provider,
  firebaseAppAuth,
})(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
