import React, { Component } from "react";
import AboutPage from "./about";
import { connect } from "react-redux";
import { openSnackBar, closeSnackBar } from "../../../../actions/snackbar";

class PreAboutPage extends Component {
  render() {
    const { site, openSnackBar, closeSnackBar } = this.props;
    if (site) {
      const navItem = site.navItems.find(e => e.name === "About");
      if (!navItem.isActive) {
        openSnackBar("This page had been UnActive.", "warning");
      } else {
        closeSnackBar();
      }
      return <AboutPage />;
    }
    return <AboutPage />;
  }
}

const mapStateToProps = state => ({
  site: state.site.siteView
});

const mapDispatchToProps = dispatch => ({
  openSnackBar: (message, type) => dispatch(openSnackBar(message, type)),
  closeSnackBar: () => dispatch(closeSnackBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreAboutPage);
