import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditPage from "./edit";
class PreEditPage extends Component {
  render() {
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    return <EditPage />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

export default connect(mapStateToProps, null)(PreEditPage);
