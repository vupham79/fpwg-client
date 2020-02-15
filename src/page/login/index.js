import React, { Component } from "react";
import { connect } from "react-redux";
import { pages } from "../../constant/constant";
class PreLoginPage extends Component {
  render() {
    const { isLogin } = this.props;
    const loginPage = pages.find(element => element.name === "Login");
    const preMainPage = pages.find(element => element.name === "PreMain");
    return <>{isLogin ? preMainPage.component : loginPage.component} </>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

export default connect(mapStateToProps, null)(PreLoginPage);
