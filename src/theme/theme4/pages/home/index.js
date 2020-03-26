import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  getDataByPageNumber
} from "../../../../actions";

class PreHomePageT4 extends Component {
  componentDidMount() {
    const { site, setNavItemActive, setNavItemInActive, isEdit } = this.props;
    this.setDataToSite();
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.original === "home");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
  }
  setDataToSite = async () => {
    const { getDataByPageNumber, isEdit, siteView, siteEdit } = this.props;

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
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive()),
  getDataByPageNumber: ({ sitePath, page, siteId }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePageT4);
