import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import { closeSnackBar, openSnackBar } from "../../../../actions/snackbar";

class PreHomePage extends Component {
  render() {
    const { site, openSnackBar, closeSnackBar } = this.props;
    if (site) {
      const navItem = site.navItems.find(e => e.name === "Home");
      if (!navItem.isActive) {
        openSnackBar("This page had been UnActive.", "warning");
      } else {
        closeSnackBar();
      }
    }
    return <HomePage />;
  }
}

const mapStateToProps = state => ({
  site: state.site.siteView
});

const mapDispatchToProps = dispatch => ({
  openSnackBar: (message, type) => dispatch(openSnackBar(message, type)),
  closeSnackBar: () => dispatch(closeSnackBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
