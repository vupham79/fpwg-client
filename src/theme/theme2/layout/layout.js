import React, { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { themes as themesConstant } from "../../../constant/constant";

function TabItem(props) {
  return (
    <>
      {props.tabValue === 0 && <Grid>{props.tabValue0}</Grid>}
      {props.tabValue === 1 && <Grid>{props.tabValue1}</Grid>}
      {props.tabValue === 2 && <Grid>{props.tabValue2}</Grid>}
      {props.tabValue === 3 && <Grid>{props.tabValue3}</Grid>}
      {props.tabValue === 4 && <Grid>{props.tabValue4}</Grid>}
      {props.tabValue === 5 && <Grid>{props.tabValue5}</Grid>}
    </>
  );
}

class Layout extends Component {
  render() {
    const { isEdit, navItemValue, siteEdit } = this.props;
    let {
      pageIndex0,
      pageIndex1,
      pageIndex2,
      pageIndex3,
      pageIndex4,
      pageIndex5
    } = "";
    if (isEdit) {
      const pages =
        siteEdit &&
        themesConstant.find(element => element.name === siteEdit.theme.name)
          .pages;

      pageIndex0 = pages.find(
        element => element.name === siteEdit.navItems[0].name
      );
      pageIndex1 = pages.find(
        element => element.name === siteEdit.navItems[1].name
      );
      pageIndex2 = pages.find(
        element => element.name === siteEdit.navItems[2].name
      );
      pageIndex3 = pages.find(
        element => element.name === siteEdit.navItems[3].name
      );
      pageIndex4 = pages.find(
        element => element.name === siteEdit.navItems[4].name
      );
      pageIndex5 = pages.find(
        element => element.name === siteEdit.navItems[5].name
      );
    }

    return (
      <>
        <Header />
        {isEdit ? (
          <TabItem
            tabValue={navItemValue}
            tabValue0={pageIndex0.component}
            tabValue1={pageIndex1.component}
            tabValue2={pageIndex2.component}
            tabValue3={pageIndex3.component}
            tabValue4={pageIndex4.component}
            tabValue5={pageIndex5.component}
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
