import React, { Component } from "react";
import NewPage from "./new";
import { openSnackBar, closeSnackBar } from "../../../../actions/snackbar";
import { connect } from "react-redux";

class PreNewPage extends Component {
  render() {
    const { site, openSnackBar, closeSnackBar } = this.props;
    if (site) {
      const navItem = site.navItems.find(e => e.name === "News");
      if (!navItem.isActive) {
        openSnackBar("This page had been UnActive.", "warning");
      } else {
        closeSnackBar();
      }
    }
    return <NewPage />;
  }
}

const mapStateToProps = state => ({
  site: state.site.siteView
});

const mapDispatchToProps = dispatch => ({
  openSnackBar: (message, type) => dispatch(openSnackBar(message, type)),
  closeSnackBar: () => dispatch(closeSnackBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreNewPage);
