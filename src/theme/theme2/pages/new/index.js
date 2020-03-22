import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  getDataByPageNumber,
  setPostsToSiteEdit,
  setPostsToSiteView
} from "../../../../actions";
import NewPage from "./new";

class PreNewPage extends Component {
  componentDidMount() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    this.setDataToSite();
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

  setDataToSite = async () => {
    const {
      getDataByPageNumber,
      setPostToSiteEdit,
      setPostToSiteView,
      isEdit,
      siteView,
      siteEdit
    } = this.props;

    if (isEdit) {
      const data = await getDataByPageNumber({
        siteId: siteEdit.id,
        page: "news"
      });
      data && setPostToSiteEdit(data);
    } else {
      const data = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "news"
      });
      data && setPostToSiteView(data);
    }
  };

  render() {
    return <NewPage />;
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
  setPostToSiteEdit: posts => dispatch(setPostsToSiteEdit(posts)),
  setPostToSiteView: posts => dispatch(setPostsToSiteView(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreNewPage);
