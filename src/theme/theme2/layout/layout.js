import React, { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
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
  render() {
    const { isEdit, navItemValue, siteEdit } = this.props;

    const pages =
      siteEdit &&
      themesConstant.find(element => element.name === siteEdit.theme.name)
        .pages;

    return (
      <>
        <Header />
        {isEdit ? (
          <TabItem
            tabValue={navItemValue}
            pages={pages}
            navItems={siteEdit.navItems.filter(item => item.isActive)}
          />
        ) : (
          this.props.children
        )}
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
