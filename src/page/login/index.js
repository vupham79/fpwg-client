import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPage from "./login";
import { Redirect } from "react-router-dom";
class PreLoginPage extends Component {
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

export default connect(mapStateToProps, null)(PreLoginPage);
