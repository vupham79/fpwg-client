import {
  Grid,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
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
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <img src={cover} alt="" key={i} />
        ));
      }
    }
  };

  renderNewCoversCarousel = () => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return (
              <div key={index} style={{ height: 400, overflow: "hidden" }}>
                <img src={URL.createObjectURL(cover)} alt="" key={index} />
              </div>
            );
          } else
            return (
              <div key={index} style={{ height: 400, overflow: "hidden" }}>
                <img src={cover} alt="" key={index} />
              </div>
            );
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <div style={{ height: 400, overflow: "hidden" }}>
            <img src={cover} alt="" key={i} />
          </div>
        ));
      }
    }
    //mỗi img phải bọc div để component carousel phân biệt chia slide
  };

  renderNewCoversCarouselWithTitle = () => {
    const { isEdit, newCover, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return (
              <div key={index} style={{ height: 400, overflow: "hidden" }}>
                <img src={URL.createObjectURL(cover)} alt="" key={index} />
                <p className="legend">
                  {isEdit && siteEdit && siteEdit.about}
                  {!isEdit && siteView && siteView.about}
                  {isEdit && !siteEdit.about && "Welcome to our website!"}
                  {!isEdit && !siteView.about && "Welcome to our website!"}
                </p>
              </div>
            );
          } else
            return (
              <div key={index} style={{ height: 400, overflow: "hidden" }}>
                <img src={cover} alt="" key={index} />
                <p className="legend">
                  {isEdit && siteEdit && siteEdit.about}
                  {!isEdit && siteView && siteView.about}
                  {isEdit && !siteEdit.about && "Welcome to our website!"}
                  {!isEdit && !siteView.about && "Welcome to our website!"}
                </p>
              </div>
            );
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <div style={{ height: 400, overflow: "hidden" }}>
            <img src={cover} alt="" key={i} />
          </div>
        ));
      }
    }
  };

  TypeSlider = () => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Slider fade speed={2000} autoplay>{this.renderNewCoversSlider()}</Slider>
        </Grid>
      </React.Fragment>
    );
  }

  TypeCarousel = () => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Carousel
            autoPlay
            infiniteLoop
            centerMode={false}
            showArrows={false}
            showIndicators={true}
            dynamicHeight={false}
            showStatus={false}
            showThumbs={false}
          >
            {this.renderNewCoversCarousel()}
          </Carousel>
        </Grid>
      </React.Fragment>
    );
  }

  TypeCarouselWithTitle = () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  render() {
    const useStyles = () => ({
      changableLink: {
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20
      },
    });
    const classes = useStyles();
    const {
      bannerType
    } = this.props;

    return (
      <Grid
        container
        xs={12}
        justify="center"
      >
        {
          {
            0: this.TypeCarousel(),
            1: this.TypeSlider(),
            2: this.TypeCarouselWithTitle(),
            default: this.TypeCarousel()
          }[bannerType]
        }

      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
});

export default connect(
  mapStateToProps,
  null
)(BannerComponent);
