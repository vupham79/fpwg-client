import React, { Component } from "react";
import AboutPage from "./about";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  getAbout
} from "../../../../actions";

class PreAboutPageT4 extends Component {
  componentDidMount() {
    const {
      site,
      setNavItemActive,
      setNavItemInActive,
      isEdit,
      getAbout,
      sitepath
    } = this.props;
    if (sitepath) {
      getAbout(sitepath);
    }
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
  isEdit: state.site.isEdit,
  sitepath: state.path.currentSitepath
});

const mapDispatchToProps = dispatch => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive()),
  getAbout: sitepath => dispatch(getAbout(sitepath))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreAboutPageT4);
