import React, { Component } from "react";
import { connect } from "react-redux";
import { setNavItemActive, setNavItemInActive } from "../../../../actions";
import AboutPage from "./about";

class PreAboutPage extends Component {
  render() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.name === "About");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
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
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreAboutPage);
