import React, { Component } from "react";
import AboutPage from "./about";
import { connect } from "react-redux";
import { openSnackBar, closeSnackBar } from "../../../../actions/snackbar";

class PreAboutPage extends Component {
  render() {
    const { site, openSnackBar, closeSnackBar, isEdit } = this.props;
    if (site && !isEdit) {
      const navItem = site.navItems.find(e => e.name === "About");
      if (!navItem.isActive) {
        openSnackBar("This page is currently inactive.", "info");
      } else {
        closeSnackBar();
      }
    }
    return <AboutPage />;
  }
}

const mapStateToProps = state => ({
  site: state.site.siteView,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  openSnackBar: (message, type) => dispatch(openSnackBar(message, type)),
  closeSnackBar: () => dispatch(closeSnackBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreAboutPage);
