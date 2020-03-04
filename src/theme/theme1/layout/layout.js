import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { themes as themesConstant } from "../../../constant/constant";

function TabItem({ pages, navItems, tabValue }) {
  return (
    <>
      {navItems.map(
        (item, index) =>
          tabValue === index && (
            <Grid key={index}>
              {pages.find(e => e.name === item.name).component}
            </Grid>
          )
      )}
    </>
  );
}

class Layout extends Component {
  renderTabItem = () => {
    const { navItemValue, siteEdit } = this.props;
    const pages =
      siteEdit &&
      themesConstant.find(element => element.name === siteEdit.theme.name)
        .pages;

    return (
      <TabItem
        tabValue={navItemValue && navItemValue}
        pages={pages}
        navItems={
          siteEdit.navItems && siteEdit.navItems.filter(item => item.isActive)
        }
      />
    );
  };

  render() {
    const { isEdit } = this.props;

    return (
      <>
        <Header />
        {isEdit ? this.renderTabItem() : this.props.children}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  siteEdit: state.site.siteEdit,
  navItemValue: state.tab.navItemValue,
  themes: state.theme.data
});

export default connect(mapStateToProps, null)(Layout);
