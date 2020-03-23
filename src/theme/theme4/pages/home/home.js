import { Grid, Typography, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import PostTypeComponent from "../../../component/postsType";
import BannerComponent from "../../../component/bannerComponent";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import ContactPage from "../contact/contact";


class Theme1Home extends React.Component {
  state = {
  };

  componentDidMount() {

  }

  render() {
    const {
      siteEdit,
      isEdit,
      titleView,
      titleEdit,
      siteView,
      bodyEdit,
      bodyView,
      posts
    } = this.props;
    const siteData = this.state;
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
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#b3b2b2",
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
        fontSize: 16
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 19,
        fontWeight: 300
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#b3b2b2",
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
      }
    });
    const classes = useStyles();

    return (
      <Grid
        container
        style={{ backgroundColor: "#1a1919", paddingBottom: 100 }}
      >
        <Grid item xs={12}>
          <BannerComponent bannerType={1} />
        </Grid>

        {isEdit && siteEdit && siteEdit.homepage.map((row) => (
          {
            "about":
              <Grid container item xs={12} style={{ display: row.isActive ? "block" : "none", minHeight: 200, paddingTop: 50 }}>
                <Grid item xs={12}>
                  <p style={classes.changableBody3}>
                    {siteEdit && siteEdit.about}
                    {!siteEdit.about && "Welcome to our website!"}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ backgroundColor: "#b3b2b2" }} />
                </Grid>
              </Grid>,
            "event":
              <Grid container item style={{ display: row.isActive ? "block" : "none", backgroundColor: "#1a1919", paddingBottom: 50 }}>
                <EventPage fromHome homeTitle={row.name} />
              </Grid>,
            "gallery":
              <Grid container item style={{ display: row.isActive ? "block" : "none", backgroundColor: "#1a1919", paddingBottom: 50 }}>
                <GalleryPage fromHome homeTitle={row.name} />
              </Grid>,
            "contact":
              <Grid container item style={{ display: row.isActive ? "block" : "none", backgroundColor: "#1a1919", paddingBottom: 50 }}>
                <ContactPage fromHome homeTitle={row.name} />
              </Grid>,
            "news":
              <Grid container item style={{ display: row.isActive ? "block" : "none" }}>
                <Grid item sm={12} xs={12} container style={{ minHeight: 200 }}>
                  {isEdit ? (
                    posts ? (
                      <Grid container>
                        <PostTypeComponent
                          posts={posts}
                          siteInfo={{
                            logo: siteEdit.logo,
                            title: siteEdit.title
                          }}
                        />
                      </Grid>
                    ) : (
                        <Grid container justify="center">
                          <Typography variant="body1">
                            Currently there are no news.
                          </Typography>
                        </Grid>
                      )
                  ) : siteView ? (
                    siteView.posts && (
                      <Grid container>
                        <PostTypeComponent
                          posts={siteView.posts}
                          siteInfo={{
                            logo: siteView.logo,
                            title: siteView.title
                          }}
                        />
                      </Grid>
                    )
                  ) : (
                        <Grid container justify="center">
                          <Typography variant="body1">
                            Currently there are no news.
                          </Typography>
                        </Grid>
                      )}
                </Grid>
              </Grid>
          }[row.original]
        ))}


        {!isEdit && siteView && siteView.homepage.map((row) => (
          {
            "about":
              <Grid container item xs={12} style={{ display: row.isActive ? "block" : "none", minHeight: 200, paddingTop: 50 }}>
                <Grid item xs={12}>
                  <p style={classes.changableBody3}>
                    {siteView && siteView.about}
                    {!siteView.about && "Welcome to our website!"}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ backgroundColor: "#b3b2b2" }} />
                </Grid>
              </Grid>,
            "event":
              <Grid container item style={{ display: row.isActive ? "block" : "none", backgroundColor: "#1a1919", paddingBottom: 50 }}>
                <EventPage fromHome homeTitle={row.name} />
              </Grid>,
            "gallery":
              <Grid container item style={{ display: row.isActive ? "block" : "none", backgroundColor: "#1a1919", paddingBottom: 50 }}>
                <GalleryPage fromHome homeTitle={row.name} />
              </Grid>,
            "contact":
              <Grid container item style={{ display: row.isActive ? "block" : "none", backgroundColor: "#1a1919", paddingBottom: 50 }}>
                <ContactPage fromHome homeTitle={row.name} />
              </Grid>,
            "news":
              <Grid container item style={{ display: row.isActive ? "block" : "none" }}>
                <Grid item sm={12} xs={12} container style={{ minHeight: 200 }}>
                  {isEdit ? (
                    posts ? (
                      <Grid container>
                        <PostTypeComponent
                          posts={posts}
                          siteInfo={{
                            logo: siteEdit.logo,
                            title: siteEdit.title
                          }}
                        />
                      </Grid>
                    ) : (
                        <Grid container justify="center">
                          <Typography variant="body1">
                            Currently there are no news.
                          </Typography>
                        </Grid>
                      )
                  ) : siteView ? (
                    siteView.posts && (
                      <Grid container>
                        <PostTypeComponent
                          posts={siteView.posts}
                          siteInfo={{
                            logo: siteView.logo,
                            title: siteView.title
                          }}
                        />
                      </Grid>
                    )
                  ) : (
                        <Grid container justify="center">
                          <Typography variant="body1">
                            Currently there are no news.
                          </Typography>
                        </Grid>
                      )}
                </Grid>
              </Grid>
          }[row.original]
        ))}


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
