import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { themes as themesConstant } from "../../../constant/constant";
import Footer from "../components/Footer";
import Header from "../components/header";

function TabItem({ pages, tabValue }) {
  return (
    <>
      {tabValue === 0 && (
        <Grid>{pages.find((e) => e.name === "home").component}</Grid>
      )}
      {tabValue === 1 && (
        <Grid>{pages.find((e) => e.name === "news").component}</Grid>
      )}
    </>
  );
}

class Layout extends Component {
  renderTabItem = () => {
    const { navItemValue, siteEdit, postView } = this.props;
    const pages =
      siteEdit &&
      themesConstant.find((element) => element.id === siteEdit.theme._id).pages;
    let itemValue = 0;
    if (postView) {
      itemValue = 1;
    } else {
      itemValue = 0;
    }
    return <TabItem tabValue={itemValue} pages={pages} />;
  };
  render() {
    const { isEdit, titleView, titleEdit } = this.props;
    return (
      <Grid id="topPos" style={{ backgroundColor: "rgb(237, 222, 234)" }}>
        <Header
          navPos={"right"}
          displayImg={false}
          navColor={isEdit ? titleEdit.color : titleView.color}
          navTextColor="#1a1919"
        />
        {isEdit ? this.renderTabItem() : this.props.children}
        <Footer />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  siteEdit: state.site.siteEdit,
  navItemValue: state.tab.navItemValue,
  themes: state.theme.data,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  newCover: state.site.newCover,
  siteView: state.site.siteView,
  postView: state.post.postView,
});

export default connect(mapStateToProps, null)(Layout);
