import React, { Component } from "react";
import GalleryPage from "./gallery";
import {
  setNavItemActive,
  setNavItemInActive,
  getGalleries
} from "../../../../actions";
import { connect } from "react-redux";

class PreGalleryPageT4 extends Component {
  componentDidMount() {
    const {
      site,
      setNavItemActive,
      sitepath,
      getGalleries,
      setNavItemInActive,
      isEdit
    } = this.props;
    if (sitepath) {
      getGalleries(sitepath);
    }
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
  render() {
    return <GalleryPage />;
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
  getGalleries: sitepath => dispatch(getGalleries(sitepath))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreGalleryPageT4);
