import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getDataByPageNumber,
  setNavItemActive,
  setNavItemInActive
} from "../../../../actions";
import HomePage from "./home";

class PreHomePage extends Component {
  componentDidMount() {
    const {
      siteView,
      isEdit,
      setNavItemActive,
      setNavItemInActive
    } = this.props;
    this.setDataToSite();
    if (siteView && !isEdit) {
      if (siteView.navItems) {
        const navItem = siteView.navItems.find(e => e.original === "home");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
  }
  setDataToSite = async () => {
    const { getDataByPageNumber, isEdit, siteView } = this.props;

    if (!isEdit) {
      await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "home"
      });
    }
  };
  render() {
    return <HomePage />;
  }
}

const mapStateToProps = state => ({
  siteView: state.site.siteView,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive()),
  getDataByPageNumber: ({ sitePath, page, siteId }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
