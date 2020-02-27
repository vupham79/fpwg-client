import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getUserPages,
  getUserSites,
  showLoading,
  closeLoading
} from "../../actions";
import MainPage from "./main";

class PreMainPage extends Component {
  getUserPages = async () => {
    const { accessToken, userId, getUserPages } = this.props;
    await getUserPages({ accessToken, userId });
  };

  getAllUserSites = async () => {
    const { accessToken, userId, getUserSites } = this.props;
    await getUserSites(userId, accessToken);
  };

  async componentDidMount() {
    const { isLogin, showLoading, closeLoading } = this.props;
    if (isLogin) {
      showLoading();
      await this.getUserPages();
      await this.getAllUserSites();
      closeLoading();
    }
  }

  render() {
    const { isLogin, loading } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    if (loading) {
      return <></>;
    }
    return <MainPage />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
  loading: state.spinner.loading
});

const mapDispatchToProps = dispatch => ({
  getUserPages: ({ accessToken, userId }) =>
    dispatch(getUserPages({ accessToken, userId })),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
  closeLoading: () => dispatch(closeLoading()),
  showLoading: () => dispatch(showLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreMainPage);
