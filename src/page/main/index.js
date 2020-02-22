import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import MainPage from "./main";
import { getUserPages, getAllSite } from "../../actions";
class PreMainPage extends Component {
  state = {
    data: []
  };

  getUserInfo = async () => {
    const { isLogin, accessToken, userId, getUserPages } = this.props;
    if (isLogin) {
      await getUserPages({ accessToken, userId });
    }
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const { isLogin, getAllSite, accessToken, userId } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    getAllSite(accessToken, userId);
    return <MainPage />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  getUserPages: accessToken => dispatch(getUserPages(accessToken)),
  getAllSite: (token, id) => dispatch(getAllSite(token, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreMainPage);
