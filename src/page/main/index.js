import React, { Component } from "react";
import { connect } from "react-redux";
import { pages } from "../../constant/constant";
class PreMainPage extends Component {
  render() {
    const { isLogin } = this.props;
    console.log("pre main page: " + isLogin);
    const loginPage = pages.find(element => element.name === "Login");
    const mainPage = pages.find(element => element.name === "Main");
    return <>{isLogin ? mainPage.component : loginPage.component} </>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

export default connect(mapStateToProps, null)(PreMainPage);
