import React, { Component } from "react";
import AboutPage from "./about";
import { connect } from "react-redux";
import { setNavItemActive, setNavItemInActive } from "../../../../actions";

class PreAboutPageT1 extends Component {
  componentDidMount() {
    const { site, setNavItemActive, setNavItemInActive, isEdit } = this.props;
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.original === "about");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
  }
  render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(PreAboutPageT1);
