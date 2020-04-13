import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  getDataByPageNumber,
  setGalleriesToSiteView,
  setEventsToSiteView,
  setPostsToSiteView,
} from "../../../../actions";

class PreHomePageT4 extends Component {
  componentDidMount() {
    const {
      siteView,
      setNavItemActive,
      setNavItemInActive,
      isEdit,
    } = this.props;
    this.setDataToSite();
    if (siteView && !isEdit) {
      if (siteView.navItems) {
        const navItem = siteView.navItems.find((e) => e.original === "home");
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
      isEdit,
      siteView,
      setGalleriesToSiteView,
      setEventsToSiteView,
      setPostsToSiteView,
    } = this.props;

    if (!isEdit) {
      await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "home",
      });

      const galleries = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "gallery",
      });
      galleries && setGalleriesToSiteView(galleries);

      const events = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "event",
      });
      events && setEventsToSiteView(events);

      const news = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "news",
      });
      news && setPostsToSiteView(news);
    }
  };
  render() {
    return <HomePage />;
  }
}

const mapStateToProps = (state) => ({
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
});

const mapDispatchToProps = (dispatch) => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive()),
  getDataByPageNumber: ({ sitePath, page, siteId }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId })),
  setGalleriesToSiteView: (galleries) =>
    dispatch(setGalleriesToSiteView(galleries)),
  setEventsToSiteView: (events) => dispatch(setEventsToSiteView(events)),
  setPostsToSiteView: (posts) => dispatch(setPostsToSiteView(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePageT4);
