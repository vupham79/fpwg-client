import React, { Component } from "react";
import EventPage from "./event";
import {
  setNavItemActive,
  setNavItemInActive,
  setEventsToSiteEdit,
  setEventsToSiteView,
  getDataByPageNumber
} from "../../../../actions";
import { connect } from "react-redux";

class PreEventPageT1 extends Component {
  componentDidMount() {
    const { site, setNavItemActive, setNavItemInActive, isEdit } = this.props;
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
      setEventsToSiteEdit,
      setEventsToSiteView,
      isEdit,
      siteView,
      siteEdit
    } = this.props;

    if (isEdit) {
      const data = await getDataByPageNumber({
        siteId: siteEdit.id,
        page: "event"
      });
      data && setEventsToSiteEdit(data);
    } else {
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
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  setNavItemInActive: () => dispatch(setNavItemInActive()),
  setNavItemActive: () => dispatch(setNavItemActive()),
  getDataByPageNumber: ({ sitePath, page, siteId }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId })),
  setEventsToSiteEdit: events => dispatch(setEventsToSiteEdit(events)),
  setEventsToSiteView: events => dispatch(setEventsToSiteView(events))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEventPageT1);
