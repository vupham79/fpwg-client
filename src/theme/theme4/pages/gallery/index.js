import React, { Component } from "react";
import GalleryPage from "./gallery";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  setGalleriesToSiteEdit,
  setGalleriesToSiteView,
  getDataByPageNumber
} from "../../../../actions";

class PreGalleryPageT4 extends Component {
  componentDidMount() {
    const { site, setNavItemActive, setNavItemInActive, isEdit } = this.props;
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

    if (isEdit) {
      // const data = await getDataByPageNumber({
      //   siteId: siteEdit.id,
      //   page: "gallery"
      // });
      // data && setGalleriesToSiteEdit(data);
    } else {
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
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive()),
  getDataByPageNumber: ({ sitePath, page, siteId }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId })),
  setGalleriesToSiteEdit: galleries =>
    dispatch(setGalleriesToSiteEdit(galleries)),
  setGalleriesToSiteView: galleries =>
    dispatch(setGalleriesToSiteView(galleries))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreGalleryPageT4);
