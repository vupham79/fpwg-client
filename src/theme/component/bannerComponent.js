import { CardMedia, Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";

class BannerComponent extends React.Component {
  renderNewCoversSlider = () => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return <img src={URL.createObjectURL(cover)} alt="" key={index} />;
          } else return <img src={cover} alt="" key={index} />;
        });
      } else {
        return <img src="/images/theme1-banner1.jpg" alt="" />;
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <img src={cover} alt="" key={i} />
        ));
      } else {
        return <img src="/images/theme1-banner1.jpg" alt="" />;
      }
    }
  };

  renderNewCoversCarousel = () => {
    const { isEdit, newCover, siteView, theme } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return (
              <CardMedia
                key={index}
                component="img"
                alt="Contemplative Reptile"
                height={theme ? "600" : "400"}
                image={URL.createObjectURL(cover)}
              />
            );
          } else
            return (
              <CardMedia
                key={index}
                component="img"
                alt="Contemplative Reptile"
                height={theme ? "600" : "400"}
                image={cover}
              />
            );
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <CardMedia
            key={i}
            component="img"
            alt="Contemplative Reptile"
            height={theme ? "600" : "400"}
            image={cover}
          />
        ));
      }
    }
    //mỗi img phải bọc div để component carousel phân biệt chia slide
  };

  renderNewCoversCarouselWithTitle = () => {
    const {
      isEdit,
      newCover,
      siteView,
      siteEdit,
      bodyEdit,
      bodyView,
    } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return (
              <div key={index} style={{ height: "100%", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="400"
                  image={URL.createObjectURL(cover)}
                />
                <p
                  style={{
                    position: "absolute",
                    marginLeft: "15%",
                    width: "70%",
                    backgroundColor: "black",
                    opacity: 0.5,
                    bottom: 30,
                    fontSize: 22,
                    color: "#fff",
                    fontFamily: isEdit
                      ? bodyEdit.fontFamily
                      : bodyView.fontFamily,
                  }}
                >
                  {isEdit && siteEdit && siteEdit.about}
                  {!isEdit && siteView && siteView.about}
                  {isEdit && !siteEdit.about && "Welcome to our website!"}
                  {!isEdit && !siteView.about && "Welcome to our website!"}
                </p>
              </div>
            );
          } else
            return (
              <div key={index} style={{ height: "100%", overflow: "hidden" }}>
                <CardMedia component="img" alt="" height="400" image={cover} />
                <p
                  style={{
                    position: "absolute",
                    marginLeft: "15%",
                    width: "70%",
                    backgroundColor: "black",
                    opacity: 0.5,
                    bottom: 30,
                    fontSize: 22,
                    color: "#fff",
                    fontFamily: isEdit
                      ? bodyEdit.fontFamily
                      : bodyView.fontFamily,
                  }}
                >
                  {isEdit && siteEdit && siteEdit.about}
                  {isEdit && !siteEdit.about && "Welcome to our website!"}
                </p>
              </div>
            );
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, index) => (
          <div key={index} style={{ height: "100%", overflow: "hidden" }}>
            <CardMedia component="img" alt="" height="400" image={cover} />
            <p
              style={{
                position: "absolute",
                marginLeft: "15%",
                width: "70%",
                backgroundColor: "black",
                opacity: 0.5,
                bottom: 30,
                fontSize: 22,
                color: "#fff",
                fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
              }}
            >
              {!isEdit && siteView && siteView.about}
              {!isEdit && !siteView.about && "Welcome to our website!"}
            </p>
          </div>
        ));
      }
    }
  };

  TypeSlider = () => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Slider speed={2000} autoplay autoplaySpeed={2500} arrows={true}>
            {this.renderNewCoversSlider()}
          </Slider>
        </Grid>
      </React.Fragment>
    );
  };

  TypeCarousel = (arrows = true) => {
    return (
      <React.Fragment>
        <Grid item xs={12} className={!arrows ? "slickNoArrow" : ""}>
          <Slider speed={1000} autoplay autoplaySpeed={2500} arrows={arrows}>
            {this.renderNewCoversSlider()}
          </Slider>
        </Grid>
      </React.Fragment>
    );
  };

  TypeCarouselWithTitle = () => {
    const { isEdit, newCover } = this.props;
    return (
      <React.Fragment>
        {isEdit && newCover && newCover.length === 0 ? (
          <div></div>
        ) : (
          <Grid item xs={12}>
            <Carousel
              autoPlay
              infiniteLoop
              centerMode={false}
              showArrows={false}
              showIndicators={false}
              dynamicHeight={false}
              showStatus={false}
              showThumbs={false}
            >
              {this.renderNewCoversCarouselWithTitle()}
            </Carousel>
          </Grid>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { bannerType, arrows } = this.props;

    return (
      <Grid container justify="center">
        {
          {
            0: this.TypeCarousel(arrows),
            1: this.TypeSlider(),
            2: this.TypeCarouselWithTitle(),
            default: this.TypeCarousel(),
          }[bannerType]
        }
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  newCover: state.site.newCover,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(BannerComponent);
