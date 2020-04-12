import { Divider, Grid, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import ContactPage from "../contact/contact";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import NewsPage from "../new/new";
import AboutPage from "../about/about";
import { Parallax } from "react-parallax";

class Theme1Home extends React.Component {
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
    } = this.props;
    let coverIndex = 1;

    const useStyles = () => ({
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
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20,
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20,
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        fontSize: 16,
        textAlign: "justify",
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "left",
        fontSize: 16,
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        // color: "#b3b2b2",
        color: "#111",
        textAlign: "center",
        fontSize: "20px",
        padding: "3rem 0",
        fontWeight: 300,
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 16,
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20,
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color,
      },
    });

    const parallaxStyle = {
      width: "100%",
      height: "90vh",
    };
    const classes = useStyles();
    return (
      <Grid
        container
        style={{
          minHeight: "50vh",
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
            <Grid item xs={10} sm={6} md={5} style={{ padding: "2rem" }}>
              <CardMedia
                image={
                  isEdit ? siteEdit && siteEdit.logo : siteView && siteView.logo
                }
                style={{ paddingTop: "100%", borderRadius: "100%" }}
              />
            </Grid>
            <Grid
              item
              xs={10}
              style={{ textAlign: "center", position: "absolute", top: "55%" }}
            >
              <Typography variant="h2" style={classes.changableTitle}>
                {isEdit
                  ? siteEdit && siteEdit.title
                  : siteView && siteView.title}
              </Typography>
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
                      <AboutPage fromHome homeTitle={row.name} />
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
                      fromHome
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
                      fromHome
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
                    <ContactPage fromHome homeTitle={row.name} />
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
                      fromHome
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
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
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
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
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
                    <ContactPage fromHome homeTitle={row.name} />
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
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
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

export default connect(mapStateToProps, null)(Theme1Home);
