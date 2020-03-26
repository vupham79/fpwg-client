import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import GalleryComponent from "../../../component/galleryComponent";
import styles from "./gallery.module.css";

class GalleryPage extends React.Component {
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
            style={isEdit ? titleEdit : titleView}
          >
            Gallery
          </Typography>
          <Divider variant="middle" />
        </Grid>
        {isEdit ? (
          siteEdit && siteEdit.galleries ? (
            <GalleryComponent
              galleries={siteEdit.galleries}
              siteInfo={siteEdit.id}
            />
          ) : (
            <Grid container justify="center">
              <Typography
                variant="body1"
                style={{
                  fontFamily: bodyEdit.fontFamily,
                  padding: "5rem 0"
                }}
              >
                Current no images to show.
              </Typography>
            </Grid>
          )
        ) : siteView && siteView.galleries ? (
          <GalleryComponent
            galleries={siteView.galleries}
            siteInfo={siteView.sitePath}
          />
        ) : (
          <Grid container justify="center">
            <Typography
              variant="body1"
              style={{
                fontFamily: bodyView.fontFamily,
                padding: "5rem 0"
              }}
            >
              Current no images to show.
            </Typography>
          </Grid>
        )}
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
