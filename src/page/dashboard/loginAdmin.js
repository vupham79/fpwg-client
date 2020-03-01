import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { InputBase, Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { loginAdmin } from "../../actions";
import PreDashBoardPage from "./index";

const useStyles = theme => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 150,
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
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
      return <PreDashBoardPage />;
    }
  };

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="username"
            onChange={this.handleChangeUsername}
          />
          <InputBase
            className={classes.input}
            placeholder="password"
            type="password"
            onChange={this.handleChangePassword}
          />
          <Button color="primary" onClick={() => this.handleLogin()}>
            Login
          </Button>
        </Paper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  username: state.admin.username,
  password: state.admin.password
});

const mapDispatchToProps = dispatch => ({
  loginAdmin: (username, password) => dispatch(loginAdmin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(LoginPageAdmin));
