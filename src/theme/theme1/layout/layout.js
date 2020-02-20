import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { themes } from "../../../constant/constant";

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
    const { isEdit, navItemValue, themeName, navItems } = this.props;

    const pages = themes.find(element => element.name === themeName).pages;

    const pageIndex0 = pages.find(element => element.name === navItems[0].name);
    const pageIndex1 = pages.find(element => element.name === navItems[1].name);
    const pageIndex2 = pages.find(element => element.name === navItems[2].name);
    const pageIndex3 = pages.find(element => element.name === navItems[3].name);
    const pageIndex4 = pages.find(element => element.name === navItems[4].name);
    const pageIndex5 = pages.find(element => element.name === navItems[5].name);

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
  isEdit: state.user.isEdit,
  navItemValue: state.tab.navItemValue,
  themeName: state.theme.name,
  navItems: state.theme.navItems
});

export default connect(mapStateToProps, null)(Layout);
