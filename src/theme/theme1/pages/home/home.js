import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BannerComponent from "../../../component/bannerComponent";
import AboutPage from "../about/about";
import ContactPage from "../contact/contact";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import NewsPage from "../new/new";
import { Parallax, Background } from 'react-parallax';

class Theme1Home extends React.Component {
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };

  getCover = (index) => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover[index]) {
        if (
          newCover[index] &&
          typeof newCover[index] === "object" &&
          newCover[index].size > 0
        ) {
          return URL.createObjectURL(newCover[index]);
        } else return newCover[index];
      } else {
        return "/images/theme1-banner3.jpg";
      }
    } else {
      if (siteView.cover && siteView.cover[index]) {
        return siteView.cover[index];
      } else {
        return "/images/theme1-banner3.jpg";
      }
    }
  };

  render() {
    const { siteEdit, isEdit, siteView, titleEdit, titleView } = this.props;

    const isShowStory = () => {
      if (isEdit) {
        if (siteEdit && siteEdit.showDetailSetting.showStory) {
          if (siteEdit.story && siteEdit.story.title) {
            return true;
          }
        }
      } else if (siteView && siteView.showDetailSetting.showStory) {
        if (siteView.story && siteView.story.title) {
          return true;
        }
      }
      return false;
    };

    return (
      <Grid container style={{ minHeight: "50vh" }}>
        <Grid item xs={12}>
          <BannerComponent bannerType={0} />
          <div style={{ width: 348, position: "relative", opacity: 0.9, zIndex: 99, backgroundColor: isEdit ? titleEdit.color : titleView.color, height: 450, marginTop: -400, marginLeft: "20%", padding: 20, overflowY: "auto", display: isShowStory() ? "block" : "none" }}>
            <p style={{ color: "#ffffff", lineHeight: "1.5em", fontSize: 30, fontWeight: 700 }}>
              Our Story
              </p>
            <p style={{ color: "#ffffff", lineHeight: "1.5em", fontSize: 16 }}>
              {isEdit
                ? siteEdit && siteEdit.story && siteEdit.story.composedText
                : siteView && siteView.story && siteView.story.composedText}
            </p>
          </div>
        </Grid>
        {isEdit &&
          siteEdit &&
          siteEdit.homepage.map(
            (row, index) =>
              ({
                about: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <AboutPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <EventPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <GalleryPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <Grid item xs={12} style={{ marginTop: 70 }}>
                      <Parallax
                        blur={0}
                        bgImage={this.getCover(0)}
                        bgImageAlt=""
                        strength={300}
                        bgImageStyle={{ width: "100%" }}
                      >
                        <div style={{ height: '450px', width: '100%', backgroundColor: isEdit ? titleEdit.color : titleView.color, opacity: 0.6 }}>

                        </div>
                      </Parallax>
                    </Grid>
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <NewsPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
              }[row.original])
          )
        }

        {
          !isEdit &&
          siteView &&
          siteView.homepage.map(
            (row, index) =>
              ({
                about: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <AboutPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <EventPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <GalleryPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <Grid item xs={12} style={{ marginTop: 70 }}>
                      <Parallax
                        blur={0}
                        bgImage={this.getCover(0)}
                        bgImageAlt=""
                        strength={300}
                        bgImageStyle={{ width: "100%" }}
                      >
                        <div style={{ height: '450px', width: '100%', backgroundColor: isEdit ? titleEdit.color : titleView.color, opacity: 0.6 }}>

                        </div>
                      </Parallax>
                    </Grid>
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none", marginTop: 70 }}
                  >
                    <NewsPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
              }[row.original])
          )
        }



      </Grid >
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover,
});

export default connect(mapStateToProps, null)(Theme1Home);
