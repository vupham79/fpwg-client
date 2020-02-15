import React, { Component } from "react";
import { connect } from "react-redux";
import { pages } from "../../constant/constant";
class PreEditPage extends Component {
  render() {
    const { isLogin } = this.props;
    const loginPage = pages.find(element => element.name === "Login");
    const editPage = pages.find(element => element.name === "Edit");
    return <>{isLogin ? editPage.component : loginPage.component} </>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

export default connect(mapStateToProps, null)(PreEditPage);
