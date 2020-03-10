import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import { setNavItemInActive, setNavItemActive } from "../../../../actions";

class PreHomePage extends Component {
  componentDidMount() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.name === "Home");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
  }
  render() {
    return <HomePage />;
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

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
