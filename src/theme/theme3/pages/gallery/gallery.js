import { Grid, Typography, Tabs, Tab } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import GalleryComponent from "../../../component/galleryComponent";
import PostTypeComponent from "../../../component/postsType";
import styles from "./gallery.module.css";

class GalleryPage extends React.Component {
  state = {
    tabValue: 0
  };

  handleChangeTabValue = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteView,
      siteEdit,
      bodyEdit,
      bodyView
    } = this.props;
    const { tabValue } = this.state;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={styles.gallery_page}
      >
        <Grid item sm={10} xs={10}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
            style={(isEdit ? titleEdit : titleView, { color: "white" })}
          >
            Gallery
          </Typography>
        </Grid>
        <Grid container justify="center" item sm={10} xs={10}>
          <Tabs
            TabIndicatorProps={{ style: { display: "none" } }}
            value={tabValue}
            onChange={this.handleChangeTabValue}
          >
            <Tab
              style={
                (isEdit ? bodyEdit : bodyView,
                {
                  color: "white",
                  borderRight: "1px solid white",
                  fontWeight: "700"
                })
              }
              label="Photos"
            />
            <Tab
              style={
                (isEdit ? bodyEdit : bodyView,
                { color: "white", fontWeight: "700" })
              }
              label="Videos"
            />
          </Tabs>

          {tabValue === 0 && (
            <Grid container>
              {isEdit ? (
                siteEdit && siteEdit.galleries ? (
                  <Grid container>
                    <GalleryComponent
                      galleries={siteEdit.galleries}
                      siteInfo={siteEdit.id}
                    />
                  </Grid>
                ) : (
                  <Grid container justify="center">
                    <Typography variant="body1" style={bodyEdit}>
                      Current no Photos to show.
                    </Typography>
                  </Grid>
                )
              ) : siteView && siteView.galleries ? (
                <Grid container>
                  <GalleryComponent
                    galleries={siteView.galleries}
                    siteInfo={siteView.sitePath}
                  />
                </Grid>
              ) : (
                <Grid container justify="center">
                  <Typography variant="body1" style={bodyEdit}>
                    Current no Photos to show.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container>
              {isEdit ? (
                siteEdit && siteEdit.posts ? (
                  <Grid container>
                    <PostTypeComponent
                      posts={siteEdit.posts.filter(
                        item => item.attachments.media_type === "video"
                      )}
                      siteInfo={{
                        logo: siteEdit.logo,
                        title: siteEdit.title,
                        id: siteEdit.id
                      }}
                    />
                  </Grid>
                ) : (
                  <Grid container justify="center">
                    <Typography variant="body1" style={bodyEdit}>
                      Current no video to show.
                    </Typography>
                  </Grid>
                )
              ) : siteView && siteView.posts ? (
                <Grid container>
                  <PostTypeComponent
                    posts={siteView.posts}
                    siteInfo={{
                      logo: siteView.logo,
                      title: siteView.title,
                      sitePath: siteView.sitePath
                    }}
                  />
                </Grid>
              ) : (
                <Grid container justify="center">
                  <Typography variant="body1" style={bodyView}>
                    Current no video to show.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(GalleryPage);
