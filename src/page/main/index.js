import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserPages, getUserSites } from "../../actions";
import MainPage from "./main";
class PreMainPage extends Component {
  state = {
    isEdit: false
  };

  getAllUserSites = async () => {
    const { accessToken, profile, getUserSites } = this.props;
    await getUserSites(profile.id, accessToken);
  };

  async componentDidMount() {
    const { isLogin, profile } = this.props;
    if (isLogin && profile) {
      this.getAllUserSites();
    }
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
  accessToken: state.user.accessToken,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  getUserPages: ({ accessToken, userId }) =>
    dispatch(getUserPages({ accessToken, userId })),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreMainPage);
