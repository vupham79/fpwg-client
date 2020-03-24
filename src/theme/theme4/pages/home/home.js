import { Divider, Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import BannerComponent from "../../../component/bannerComponent";
import ContactPage from "../contact/contact";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import NewsPage from "../new/new";

class Theme1Home extends React.Component {
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
        style={{ backgroundColor: "#1a1919", paddingBottom: 100, minHeight: "50vh" }}
      >
        <Grid item xs={12}>
          <BannerComponent bannerType={1} />
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
                    xs={12}
                    style={{
                      display: row.isActive ? "block" : "none",
                      minHeight: 200,
                      paddingTop: 50
                    }}
                  >
                    <Grid item xs={12}>
                      <p style={classes.changableBody3}>
                        {siteEdit && siteEdit.about}
                        {!siteEdit.about && "Welcome to our website!"}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: "#b3b2b2" }} />
                    </Grid>
                  </Grid>
                ),
                event: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
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
                    key={index}
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
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
                    key={index}
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    key={index}
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <NewsPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                )
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
                      paddingTop: 50
                    }}
                  >
                    <Grid item xs={12}>
                      <p style={classes.changableBody3}>
                        {siteView && siteView.about}
                        {!siteView.about && "Welcome to our website!"}
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: "#b3b2b2" }} />
                    </Grid>
                  </Grid>
                ),
                event: (
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
                ),
                gallery: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
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
                    key={index}
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    key={index}
                    container
                    item
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <NewsPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
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
