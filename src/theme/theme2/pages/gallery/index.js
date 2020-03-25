import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  setGalleriesToSiteView,
  getDataByPageNumber
} from "../../../../actions";
import GalleryPage from "./gallery";

class PreGalleryPage extends Component {
  componentDidMount() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    this.setDataToSite();
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.original === "gallery");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
  }

  setDataToSite = async () => {
    const {
      getDataByPageNumber,
      setGalleriesToSiteEdit,
      setGalleriesToSiteView,
      isEdit,
      siteView,
      siteEdit
    } = this.props;

    if (!isEdit) {
      const data = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "gallery"
      });
      data && setGalleriesToSiteView(data);
    }
  };

  render() {
    return <GalleryPage />;
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
    dispatch(getDataByPageNumber({ sitePath, page, siteId })),
  setGalleriesToSiteView: galleries =>
    dispatch(setGalleriesToSiteView(galleries))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreGalleryPage);
