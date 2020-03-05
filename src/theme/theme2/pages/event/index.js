import React, { Component } from "react";
import { connect } from "react-redux";
import { setNavItemActive, setNavItemInActive } from "../../../../actions";
import EventPage from "./event";

class PreEventPage extends Component {
  render() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.name === "Event");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
    return <EventPage />;
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

export default connect(mapStateToProps, mapDispatchToProps)(PreEventPage);
