import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./index.module.css";
import Slider from "react-slick";
const imgUrl = [
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/coffee-918926_1920.jpg",
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/cover-1589426_1920.jpg",
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/alcohol-1869282_1920.jpg"
];

class CarouselImages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderNewCovers = () => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return <img src={URL.createObjectURL(cover)} alt="" key={index} />;
          } else return <img src={cover} alt="" key={index} />;
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <img src={cover} alt="" key={i} />
        ));
      }
    }
    if (newCover && newCover.length <= 0) {
      return imgUrl.map((url, i) => <img src={url} alt="" key={i} />);
    }
  };
  render() {
    const { siteEdit, siteView, bodyEdit, bodyView, isEdit } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={styles.carousel_wrapper}
      >
        <Grid item sm={12} className={styles.images_slider}>
          <Slider autoplay>{this.renderNewCovers()}</Slider>
        </Grid>
        <Grid
          item
          sm={10}
          xs={12}
          className={styles.info}
          style={isEdit ? bodyEdit : bodyView}
        >
          {isEdit
            ? siteEdit && siteEdit.about
              ? siteEdit.about
              : "Welcome to our website! Take a look around and feel free to contact us for more information."
            : siteView && siteView.about
            ? siteView.about
            : "Welcome to our website! Take a look around and feel free to contact us for more information."}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  newCover: state.site.newCover
});

export default connect(mapStateToProps, null)(CarouselImages);
