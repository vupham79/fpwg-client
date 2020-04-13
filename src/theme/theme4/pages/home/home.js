import { CardMedia, Grid, withStyles } from "@material-ui/core";
import React from "react";
import { Parallax } from "react-parallax";
import { connect } from "react-redux";
import AboutPage from "../about/about";
import ContactPage from "../contact/contact";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import NewsPage from "../new/new";

const useStyles = (theme) => ({
  title: {
    fontSize: 36,
    [theme.breakpoints.up("md")]: {
      fontSize: 58,
    },
  },
});

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
    const {
      siteEdit,
      isEdit,
      titleView,
      titleEdit,
      siteView,
      bodyEdit,
      bodyView,
      newCover,
      classes,
    } = this.props;
    let coverIndex = 1;

    const titleStyle = () => ({
      changableLink: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20,
      },
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: "#E8634E",
        fontWeight: "600",
        letterSpacing: "0.1em",
        whiteSpace: "no-wrap",
        overflow: "hidden",
        textAlign: "center",
        position: "absolute",
        top: "55%",
        lineHeight: "1.5em",
      },
    });

    const parallaxStyle = {
      width: "100%",
      height: "90vh",
    };
    const style = titleStyle();
    return (
      <Grid
        container
        style={{
          minHeight: "60vh",
        }}
        id="home"
      >
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "5rem 0",
          }}
          justify="center"
          alignItems="center"
        >
          <Grid
            container
            justify="center"
            item
            xs={12}
            style={{ position: "relative" }}
          >
            <Grid item xs={10} sm={7} md={5} style={{ padding: "2rem" }}>
              <CardMedia
                image={this.renderImage()}
                style={{ paddingTop: "100%", borderRadius: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={10}
              style={style.changableTitle}
              className={classes.title}
            >
              {isEdit ? siteEdit && siteEdit.title : siteView && siteView.title}
            </Grid>
          </Grid>
        </Grid>
        {isEdit
          ? newCover &&
            newCover.length > 0 && (
              <Grid item xs={12}>
                <Parallax
                  bgImage={this.getCover(0)}
                  bgImageAlt="the Banner"
                  strength={200}
                  style={{
                    width: "100%",
                  }}
                >
                  <div style={parallaxStyle} />
                </Parallax>
              </Grid>
            )
          : siteView &&
            siteView.cover.length > 0 && (
              <Grid item xs={12}>
                <Parallax
                  bgImage={this.getCover(0)}
                  bgImageAlt="the Banner"
                  strength={200}
                  style={{
                    width: "100%",
                  }}
                >
                  <div style={parallaxStyle} />
                </Parallax>
              </Grid>
            )}

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
                    xs={12}
                    style={{
                      display: row.isActive ? "block" : "none",
                      minHeight: 200,
                      paddingTop: "2rem",
                    }}
                    id="about"
                  >
                    {/* <Grid item xs={12}>
                      <Parallax
                        bgImage={
                          row.original === "about" &&
                          row.isActive &&
                          this.getCover(coverIndex++)
                        }
                        bgImageAlt="the cat"
                        strength={200}
                        style={{
                          width: "100%",
                          display: row.isActive ? "block" : "none",
                        }}
                      >
                        <div style={parallaxStyle} />
                      </Parallax>
                    </Grid> */}
                    <Grid container justify="center" item xs={12}>
                      <AboutPage homeTitle={row.name} />
                    </Grid>
                  </Grid>
                ),
                event: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="event"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "event" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <EventPage
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    key={index}
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="gallery"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "gallery" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <GalleryPage
                      homeList={row.filter.items}
                      homeTitle={row.name}
                    />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    key={index}
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="contact"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "contact" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <ContactPage homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    key={index}
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="news"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "news" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <NewsPage
                      // fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
              }[row.original])
          )}

        {!isEdit &&
          siteView &&
          siteView.homepage.map(
            (row, index) =>
              ({
                about: (
                  <Grid
                    container
                    item
                    key={index}
                    xs={12}
                    style={{
                      display: row.isActive ? "block" : "none",
                      minHeight: 200,
                      paddingTop: "2rem",
                    }}
                    justify="center"
                    id="about"
                  >
                    <Grid item xs={12}>
                      {/* <Parallax
                        bgImage={
                          row.original === "about" &&
                          row.isActive &&
                          this.getCover(coverIndex++)
                        }
                        bgImageAlt="the cat"
                        strength={500}
                        style={{
                          width: "100%",
                          display: row.isActive ? "block" : "none",
                        }}
                      >
                        <div style={{ height: "500px", width: "100%" }} />
                      </Parallax> */}
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <AboutPage fromHome homeTitle={row.name} />
                    </Grid>
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="event"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "event" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <EventPage
                      homeTitle={row.name}
                      // homeList={row.filter.items}
                    />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="gallery"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "gallery" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <GalleryPage
                      homeTitle={row.name}
                      // homeList={row.filter.items}
                    />
                  </Grid>
                ),
                contact: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="contact"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "contact" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <ContactPage homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{
                      display: row.isActive ? "block" : "none",
                      paddingTop: "2rem",
                    }}
                    id="news"
                  >
                    {/* <Parallax
                      bgImage={
                        row.original === "news" &&
                        row.isActive &&
                        this.getCover(coverIndex++)
                      }
                      bgImageAlt="the cat"
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={parallaxStyle} />
                    </Parallax> */}
                    <NewsPage
                      // fromHome
                      homeTitle={row.name}
                      // homeList={row.filter.items}
                    />
                  </Grid>
                ),
              }[row.original])
          )}
      </Grid>
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

export default connect(
  mapStateToProps,
  null
)(withStyles(useStyles)(Theme1Home));
