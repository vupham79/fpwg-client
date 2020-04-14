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
    const { siteEdit, postView } = this.props;
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
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };
  render() {
    const { isEdit, titleView, titleEdit } = this.props;
    return (
      <Grid
        id="topPos"
        style={{ backgroundColor: "#000", position: "relative" }}
      >
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
  newLogo: state.site.newLogo,
});

export default connect(mapStateToProps, null)(Layout);
