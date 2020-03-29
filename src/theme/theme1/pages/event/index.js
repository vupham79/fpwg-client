import React, { Component } from "react";
import EventPage from "./event";
import {
  setNavItemActive,
  setNavItemInActive,
  setEventsToSiteView,
  getDataByPageNumber
} from "../../../../actions";
import { connect } from "react-redux";

class PreEventPageT1 extends Component {
  componentDidMount() {
    const {
      siteView,
      setNavItemActive,
      setNavItemInActive,
      isEdit
    } = this.props;
    this.setDataToSite();
    if (siteView && !isEdit) {
      if (siteView.navItems) {
        const navItem = siteView.navItems.find(e => e.original === "event");
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
      setEventsToSiteView,
      isEdit,
      siteView
    } = this.props;

    if (!isEdit) {
      const data = await getDataByPageNumber({
        sitePath: siteView.sitePath,
        page: "event"
      });
      data && setEventsToSiteView(data);
    }
  };

  render() {
    return <EventPage />;
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
  setEventsToSiteView: events => dispatch(setEventsToSiteView(events))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEventPageT1);
