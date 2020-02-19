import React, { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { themes } from "../../../constant/constant";

function TabItem(props) {
  return (
    <>
      {props.tabValue === 0 && <Grid>{props.home}</Grid>}
      {props.tabValue === 1 && <Grid>{props.about}</Grid>}
      {props.tabValue === 2 && <Grid>{props.gallery}</Grid>}
      {props.tabValue === 3 && <Grid>{props.event}</Grid>}
      {props.tabValue === 4 && <Grid>{props.contact}</Grid>}
      {props.tabValue === 5 && <Grid>{props.news}</Grid>}
    </>
  );
}

class Layout extends Component {
  render() {
    const { isEdit, navItemValue, themeName } = this.props;
    const pages = themes.find(element => (element.name = themeName)).pages;
    const home = pages.find(element => element.name === "home");
    const event = pages.find(element => element.name === "event");
    const about = pages.find(element => element.name === "about");
    const contact = pages.find(element => element.name === "contact");
    const gallery = pages.find(element => element.name === "gallery");
    const news = pages.find(element => element.name === "new");

    return (
      <>
        <Header />
        {isEdit ? (
          <TabItem
            tabValue={navItemValue}
            home={home.component}
            event={event.component}
            contact={contact.component}
            gallery={gallery.component}
            about={about.component}
            news={news.component}
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
  themeName: state.theme.name
});

export default connect(mapStateToProps, null)(Layout);
