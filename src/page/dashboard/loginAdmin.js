import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Avatar
} from "@material-ui/core";
import { connect } from "react-redux";
import { loginAdmin } from "../../actions";
import { Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class LoginPageAdmin extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = async () => {
    const { loginAdmin } = this.props;
    const { username, password } = this.state;
    const login = await loginAdmin({ username, password });
    if (login) {
      return <Redirect to={"/admin"} />;
    }
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Username"
                  name="Username"
                  inputProps={{
                    maxLength: 20
                  }}
                  autoComplete="email"
                  onChange={this.handleChangeUsername}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  inputProps={{
                    maxLength: 20
                  }}
                  autoComplete="current-password"
                  onChange={this.handleChangePassword}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.handleLogin()}
            >
              Login
            </Button>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loginAdmin: (username, password) => dispatch(loginAdmin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LoginPageAdmin));
