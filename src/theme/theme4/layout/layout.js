import React, { Component } from "react";
import Footer from "../components/Footer";
import HeaderComponent from "../../component/headerComponent";
import { connect } from "react-redux";
import { Grid, CardMedia, withStyles } from "@material-ui/core";
import { themes as themesConstant } from "../../../constant/constant";
import Slider from "react-slick";

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

const useStyle = () => ({
  cardMedia: {
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

class Layout extends Component {
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

  renderNewCoversCarousel = () => {
    const { isEdit, newCover, siteView, theme, classes } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return (
              <CardMedia
                key={index}
                className={classes.cardMedia}
                image={URL.createObjectURL(cover)}
              />
            );
          } else
            return (
              <CardMedia
                key={index}
                className={classes.cardMedia}
                image={cover}
              />
            );
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <CardMedia key={i} className={classes.cardMedia} image={cover} />
        ));
      }
    }
    //mỗi img phải bọc div để component carousel phân biệt chia slide
  };

  render() {
    const { isEdit, titleView, titleEdit, siteView, newCover } = this.props;
    const sliderSettings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 700,
      autoplaySpeed: 3000,
    };
    return (
      <Grid id="topPos">
        <Slider {...sliderSettings}>{this.renderNewCoversCarousel()}</Slider>
        <HeaderComponent
          navPos={"right"}
          displayImg={false}
          navColor={isEdit ? titleEdit.color : titleView.color}
          navTextColor="#1a1919"
        // headerColor="#1a1919"
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
});

export default connect(mapStateToProps, null)(withStyles(useStyle)(Layout));
