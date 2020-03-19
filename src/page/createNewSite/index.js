import React, { Component } from "react";
import CreateNewSite from "./createNewSite";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserPages, getUserSites } from "../../actions";

class index extends Component {
  componentDidMount() {
    this.getUserPages();
  }

  getUserPages = async () => {
    const { accessToken, profile, getUserPages } = this.props;
    await getUserPages({ accessToken, userId: profile.id });
  };

  render() {
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    return <CreateNewSite />;
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

export default connect(mapStateToProps, mapDispatchToProps)(index);
