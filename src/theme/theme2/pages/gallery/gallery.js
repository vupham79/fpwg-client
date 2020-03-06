import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import GalleryComponent from "../../../component/galleryComponent";
import styles from "./gallery.module.css";

class GalleryPage extends React.Component {
  render() {
    const { isEdit, titleEdit, titleView, siteView, siteEdit } = this.props;
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
          <GalleryComponent galleries={siteEdit.galleries} />
        ) : (
          <GalleryComponent galleries={siteView.galleries} />
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView
});

export default connect(mapStateToProps, null)(GalleryPage);
