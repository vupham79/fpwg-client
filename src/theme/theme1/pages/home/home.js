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

  render() {
    const {
      siteEdit,
      isEdit,
      titleView,
      titleEdit,
      siteView,
      bodyEdit,
      bodyView
    } = this.props;
    const useStyles = () => ({
      changableLink: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20
      },
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        fontSize: 16,
        textAlign: "justify"
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "left",
        fontSize: 16,
        marginLeft: "30%"
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "black",
        textAlign: "center",
        fontSize: 16
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "black",
        textAlign: "center",
        fontSize: 16
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color
      },
      changableFirst2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20
      },
      changableLegend: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "white",
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "40%",
        fontSize: 80,
        textAlign: "center"
      },
      greyDiv: {
        backgroundColor: "#e1ede4",
        textAlign: "center",
        color: "#535353",
        fontSize: 20
      },
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 10
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
      },
      centerItem3: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        backgroundColor: "white"
      },
      changableAppBar: {
        backgroundColor: "white",
        opacity: 0.6,
        position: "sticky",
        color: "#535353",
        textAlign: "right"
      }
    });
    const classes = useStyles();

    return (
      <Grid container>
        <Grid item xs={12}>
          <BannerComponent bannerType={0} />
        </Grid>

        {/* {posts && posts.length > 0 && (
          <Grid item xs={12}>
            <Carousel
              showArrows={true}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
              autoPlay={true}
              stopOnHover={true}
              infiniteLoop={true}
            >
              {posts &&
                posts.slice(0, 5).map(row => (
                  <Grid item xs={12} style={classes.centerItem3} key={row.id}>
                    {
                      {
                        photo: (
                          <img
                            src={
                              row.attachments.images &&
                              row.attachments.images[0]
                            }
                            alt=""
                            style={{ height: 200, width: 200 }}
                          />
                        ),
                        video: (
                          <ReactPlayer
                            url={
                              row && row.attachments && row.attachments.video
                            }
                            playing
                            width="100%"
                            height="200px"
                          />
                        ),
                        default: (
                          <img
                            src={
                              row.attachments.images &&
                              row.attachments.images[0]
                            }
                            alt=""
                            style={{ height: 200, width: 200 }}
                          />
                        )
                      }[row.attachments.media_type]
                    }
                    <p style={classes.changableTitle2}>
                      {moment(row.createdTime).format("MMMM") + " "}
                      <span style={classes.changableFirst2}>
                        {moment(row.createdTime).format("DD") + " "}
                      </span>
                      {moment(row.createdTime).format("YYYY")}
                    </p>
                    <p style={classes.changableBody3}>
                      {row.message ? row.message : ""}
                    </p>
                    <p style={classes.changableLink}>Read more...</p>
                  </Grid>
                ))}
            </Carousel>
          </Grid>
        )} */}

        {isEdit &&
          siteEdit &&
          siteEdit.homepage.map(
            row =>
              ({
                about: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <AboutPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <EventPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <GalleryPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <NewsPage fromHome homeTitle={row.name} />
                  </Grid>
                )
              }[row.original])
          )}

        {!isEdit &&
          siteView &&
          siteView.homepage.map(
            row =>
              ({
                about: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <AboutPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <EventPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <GalleryPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <NewsPage fromHome homeTitle={row.name} />
                  </Grid>
                )
              }[row.original])
          )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover
});

export default connect(mapStateToProps, null)(Theme1Home);
