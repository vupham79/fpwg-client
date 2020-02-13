// import {
//   faChevronLeft,
//   faChevronRight
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./index.module.css";

// const ArrowButtonStyles = {
//   color: "whitesmoke"
// };

const imgUrl = [
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/coffee-918926_1920.jpg",
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/cover-1589426_1920.jpg",
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/alcohol-1869282_1920.jpg"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "95vh"
};

class CarouselImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };
  }

  previousSlide = () => {
    const lastIndex = imgUrl.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    this.setState({
      currentImageIndex: index
    });
  };

  nextSlide = () => {
    const lastIndex = imgUrl.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    this.setState({
      currentImageIndex: index
    });
  };

  componentDidMount() {
    this.startCarousel();
  }

  startCarousel = () => {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  };

  componentWillUnmount() {
    clearInterval(this.carouselInterval);
  }

  render() {
    const { themeFontBody } = this.props;

    const changeStyle = {
      fontFamily: themeFontBody
    };
    return (
      <Grid container alignItems="center">
        {/* <div className={styles.arrow_left}>
          <Button style={ArrowButtonStyles}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="5x"
              onClick={this.previousSlide}
            />
          </Button>
        </div> */}
        <Grid item xs={12} className={styles.images_slider}>
          <img
            src={imgUrl[this.state.currentImageIndex]}
            alt=""
            style={imgStyles}
          />
        </Grid>
        <div className={styles.info} style={changeStyle}>
          Welcome to our website! Take a look around and feel free to contact us
          for more information.
        </div>
        {/* <div className={styles.arrow_right}>
          <Button style={ArrowButtonStyles}>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="5x"
              onClick={this.nextSlide}
            />
          </Button>
        </div> */}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  themeFontBody: state.theme.fontBody
});

export default connect(mapStateToProps, null)(CarouselImages);
