import React, { Component } from "react";
import NewPage from "./new";
import {
  setNavItemActive,
  setNavItemInActive,
  getPosts
} from "../../../../actions";
import { connect } from "react-redux";

class PreNewPage extends Component {
  componentDidMount() {
    const {
      site,
      isEdit,
      setNavItemActive,
      setNavItemInActive,
      getPosts,
      sitepath
    } = this.props;
    if (sitepath) {
      getPosts(sitepath);
    }
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.original === "news");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
  }
  render() {
    return <NewPage />;
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
  getPosts: sitepath => dispatch(getPosts(sitepath))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreNewPage);
