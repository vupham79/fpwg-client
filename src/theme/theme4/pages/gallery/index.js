import React, { Component } from "react";
import GalleryPage from "./gallery";
import { setNavItemActive, setNavItemInActive } from "../../../../actions";
import { connect } from "react-redux";

class PreGalleryPageT4 extends Component {
  componentDidMount() {
    const { site, setNavItemActive, setNavItemInActive, isEdit } = this.props;
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
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreGalleryPageT4);
