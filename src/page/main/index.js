import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MainPage from "./main";
import { getUserPages } from "../../actions";
class PreMainPage extends Component {
  state = {
    data: []
  };

  getUserInfo = async () => {
    const { isLogin, token, getUserPages } = this.props;
    if (isLogin) {
      await getUserPages(token);
    }
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    return <MainPage />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  token: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  getUserPages: accessToken => dispatch(getUserPages(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreMainPage);
