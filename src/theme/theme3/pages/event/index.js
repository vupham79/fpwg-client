import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setNavItemActive,
  setNavItemInActive,
  setEventsToSiteView,
  getDataByPageNumber
} from "../../../../actions";
import EventPage from "./event";

class PreEventPage extends Component {
  componentDidMount() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    this.setDataToSite();
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.original === "event");
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

export default connect(mapStateToProps, mapDispatchToProps)(PreEventPage);
