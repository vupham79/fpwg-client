import React, { Component } from "react";
import ContactPage from "./contact";
import { setNavItemActive, setNavItemInActive } from "../../../../actions";
import { connect } from "react-redux";
class PreContactPage extends Component {
  render() {
    const { site, isEdit, setNavItemActive, setNavItemInActive } = this.props;
    if (site && !isEdit) {
      if (site.navItems) {
        const navItem = site.navItems.find(e => e.name === "Contact");
        if (!navItem.isActive) {
          setNavItemInActive();
        } else {
          setNavItemActive();
        }
      }
    }
    return <ContactPage />;
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

export default connect(mapStateToProps, mapDispatchToProps)(PreContactPage);
