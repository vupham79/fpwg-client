import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/header";
import { connect } from "react-redux";
import { Grid, CardMedia, withStyles } from "@material-ui/core";
import { themes as themesConstant } from "../../../constant/constant";
import Slider from "react-slick";
import HomePage from "../pages/home/index";

const useStyle = () => ({
  cardMedia: {
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

class Layout extends Component {
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
        <Header
          navPos={"right"}
          displayImg={false}
          navColor={isEdit ? titleEdit.color : titleView.color}
          navTextColor="#1a1919"
        />
        <HomePage />
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
