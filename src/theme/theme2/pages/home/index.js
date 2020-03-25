import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import {
  setNavItemInActive,
  setNavItemActive,
  getDataByPageNumber
} from "../../../../actions";
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
    const { getDataByPageNumber, isEdit, siteView, siteEdit } = this.props;

    if (!isEdit) {
      const data = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "home"
      });
      console.log(data);
      // data && setGalleriesToSiteView(data);
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

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
