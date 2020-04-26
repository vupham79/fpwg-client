import React, { Component } from "react";
import HeaderComponent from "../../component/headerComponent";
import Footer from "../components/Footer";
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
                {pages.find((e) => e.name === item.original).component}
              </Grid>
            )
        )}
    </>
  );
}

function renderFB() {
  let cropImgFile = new Promise(async (resolve, reject) => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    setTimeout(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
        resolve(true);
      }
    }, 1000);
  });
}

class Layout extends Component {
  componentDidMount() {
    renderFB();
  }

  renderTabItem = () => {
    const { navItemValue, siteEdit } = this.props;
    const pages =
      siteEdit &&
      themesConstant.find((element) => element.id === siteEdit.theme._id).pages;

    return (
      <TabItem
        tabValue={navItemValue && navItemValue}
        pages={pages}
        navItems={
          siteEdit.navItems && siteEdit.navItems.filter((item) => item.isActive)
        }
      />
    );
  };

  render() {
    const { isEdit, titleView, titleEdit } = this.props;

    return (
      <Grid id="topPos" style={{ backgroundColor: "#fff" }}>
        <HeaderComponent
          navPos={"left"}
          displayImg={false}
          headerColor="white"
          navColor={isEdit ? titleEdit.color : titleView.color}
          // navTextColor="#535353"
        />
        {isEdit ? this.renderTabItem() : this.props.children}
        <Footer />
        <div className="fb-customerchat" page_id="333667506731947"></div>
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
});

export default connect(mapStateToProps, null)(Layout);
