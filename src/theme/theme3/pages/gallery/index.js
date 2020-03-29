import React, { Component } from "react";
import { connect } from "react-redux";
import GalleryPage from "./gallery";
import {
  setNavItemActive,
  setNavItemInActive,
  setGalleriesToSiteView,
  getDataByPageNumber
} from "../../../../actions";

class PreGalleryPage extends Component {
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
        const navItem = siteView.navItems.find(e => e.original === "gallery");
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
      setGalleriesToSiteView,
      isEdit,
      siteView
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
