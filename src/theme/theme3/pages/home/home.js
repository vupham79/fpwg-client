import { Divider, Grid } from "@material-ui/core";
import React from "react";
import { Parallax } from "react-parallax";
import { connect } from "react-redux";
import AboutPage from "../about/about";
import ContactPage from "../contact/contact";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import NewsPage from "../new/new";
import "./home.css";
class HomePage extends React.Component {
  getCover = (index) => {
    const { isEdit, covers, siteView } = this.props;
    if (isEdit) {
      if (covers && covers[index]) {
        if (
          covers[index] &&
          typeof covers[index] === "object" &&
          covers[index].size > 0
        ) {
          return URL.createObjectURL(covers[index]);
        } else return covers[index];
      } else {
        return "/images/theme1-banner1.jpg";
      }
    } else {
      if (siteView.cover && siteView.cover[index]) {
        return siteView.cover[index];
      } else {
        return "/images/theme1-banner1.jpg";
      }
    }
  };

  render() {
    const { siteEdit, siteView, isEdit } = this.props;
    let coverEditIndex = 1;
    let coverViewIndex = 1;
    return (
      <Grid container>
        {isEdit &&
          siteEdit &&
          siteEdit.homepage.map(
            (row, index) =>
              ({
                about: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <AboutPage fromHome homeTitle={row.name} />
                      <Divider
                        style={{
                          backgroundColor: "#646464",
                          width: "60%",
                          marginLeft: "20%",
                          marginTop: 20,
                        }}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "about" &&
                        row.isActive &&
                        this.getCover(coverEditIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                event: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <EventPage
                        fromHome
                        homeTitle={row.name}
                        homeList={row.filter.items}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "event" &&
                        row.isActive &&
                        this.getCover(coverEditIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                gallery: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <GalleryPage
                        fromHome
                        homeTitle={row.name}
                        homeList={row.filter.items}
                        color={"#fff"}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "gallery" &&
                        row.isActive &&
                        this.getCover(coverEditIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                contact: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <ContactPage fromHome homeTitle={row.name} />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "contact" &&
                        row.isActive &&
                        this.getCover(coverEditIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                news: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <NewsPage
                        fromHome
                        homeTitle={row.name}
                        homeList={row.filter.items}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "news" &&
                        row.isActive &&
                        this.getCover(coverEditIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
              }[row.original])
          )}

        {!isEdit &&
          siteView &&
          siteView.homepage.map(
            (row, index) =>
              ({
                about: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <AboutPage fromHome homeTitle={row.name} />
                      <Divider
                        style={{
                          backgroundColor: "#646464",
                          width: "60%",
                          marginLeft: "20%",
                          marginTop: 20,
                        }}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "about" &&
                        row.isActive &&
                        this.getCover(coverViewIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                event: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <EventPage
                        fromHome
                        homeTitle={row.name}
                        homeList={row.filter.items}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "event" &&
                        row.isActive &&
                        this.getCover(coverViewIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                gallery: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <GalleryPage
                        fromHome
                        homeTitle={row.name}
                        homeList={row.filter.items}
                        color={"#fff"}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "gallery" &&
                        row.isActive &&
                        this.getCover(coverViewIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                contact: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <ContactPage fromHome homeTitle={row.name} />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "contact" &&
                        row.isActive &&
                        this.getCover(coverViewIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
                news: (
                  <>
                    <Grid
                      container
                      item
                      key={index}
                      style={{ display: row.isActive ? "block" : "none" }}
                    >
                      <NewsPage
                        fromHome
                        homeTitle={row.name}
                        homeList={row.filter.items}
                      />
                    </Grid>
                    <Parallax
                      bgImage={
                        row.original === "news" &&
                        row.isActive &&
                        this.getCover(coverViewIndex++)
                      }
                      strength={200}
                      style={{
                        width: "100%",
                        display: row.isActive ? "block" : "none",
                      }}
                    >
                      <div style={{ height: "500px", width: "100%" }} />
                    </Parallax>
                  </>
                ),
              }[row.original])
          )}
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  siteEdit: state.site.siteEdit,
  covers: state.site.newCover,
});

export default connect(mapStateToProps, null)(HomePage);
