import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPage from "./login";
import { closeSnackBar } from "../../actions";
import { Redirect } from "react-router-dom";
class PreLoginPage extends Component {
  componentDidMount() {
    const { closeSnackBar } = this.props;
    closeSnackBar();
  }
  render() {
    const { isLogin } = this.props;
    if (isLogin) {
      return <Redirect to="/view" />;
    }
    return <LoginPage />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar())
});
export default connect(mapStateToProps, mapDispatchToProps)(PreLoginPage);
