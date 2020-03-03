import React, { Component } from "react";
import ContactPage from "./contact";
import { closeSnackBar, openSnackBar } from "../../../../actions/snackbar";
import { connect } from "react-redux";
class PreContactPage extends Component {
  render() {
    const { site, openSnackBar, closeSnackBar, isEdit } = this.props;
    if (site && !isEdit) {
      const navItem = site.navItems.find(e => e.name === "Contact");
      if (!navItem.isActive) {
        openSnackBar("This page is currently inactive.", "info");
      } else {
        closeSnackBar();
      }
    }
    return <ContactPage />;
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

export default connect(mapStateToProps, mapDispatchToProps)(PreContactPage);
