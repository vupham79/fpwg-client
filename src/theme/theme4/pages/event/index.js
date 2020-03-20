import React, { Component } from "react";
import EventPage from "./event";
import {
  setNavItemActive,
  setNavItemInActive,
  getEvents
} from "../../../../actions";
import { connect } from "react-redux";

class PreEventPageT4 extends Component {
  componentDidMount() {
    const {
      site,
      setNavItemActive,
      getEvents,
      sitepath,
      setNavItemInActive,
      isEdit
    } = this.props;
    if (sitepath) {
      getEvents(sitepath);
    }
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
  render() {
    return <EventPage />;
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
  getEvents: sitepath => dispatch(getEvents(sitepath))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEventPageT4);
