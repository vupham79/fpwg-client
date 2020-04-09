import React, { Component } from "react";
import Footer from "../components/Footer";
import HeaderComponent from "../../component/headerComponent";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { themes as themesConstant } from "../../../constant/constant";

function TabItem({ pages, navItems, tabValue }) {
  return (
    <>
      {navItems &&
        navItems.map(
          (item, index) =>
            tabValue === index && (
              <Grid key={index}>
                {pages.find(e => e.name === item.original).component}
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
      themesConstant.find(element => element.id === siteEdit.theme._id).pages;
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
    const { isEdit, titleView, titleEdit } = this.props;

    return (
      <Grid id="topPos">
        <HeaderComponent
          navPos={"right"}
          displayImg={false}
          navColor={isEdit ? titleEdit.color : titleView.color}
          navTextColor="#b3b2b2"
          headerColor="#1a1919"
        />
        {isEdit ? this.renderTabItem() : this.props.children}
        <Footer />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  siteEdit: state.site.siteEdit,
  navItemValue: state.tab.navItemValue,
  themes: state.theme.data,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit
});

export default connect(mapStateToProps, null)(Layout);
