import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import GalleryComponent from "../../../component/galleryComponent";
import styles from "./gallery.module.css";

class GalleryPage extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteView,
      siteEdit,
      bodyEdit,
      bodyView,
      fromHome,
      homeTitle,
      homeList,
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
            style={{
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
              color: "white",
              letterSpacing: "0.2rem",
            }}
          >
            {fromHome
              ? homeTitle
              : isEdit
              ? siteEdit &&
                siteEdit.navItems.map((item) => {
                  if (item.original === "gallery") {
                    return item.name;
                  } else return "";
                })
              : siteView &&
                siteView.navItems.map((item) => {
                  if (item.original === "gallery") {
                    return item.name;
                  } else return "";
                })}
          </Typography>
        </Grid>

        <Grid item xs={10} sm={12}>
          {isEdit ? (
            siteEdit && siteEdit.galleries ? (
              <Grid container justify="center">
                <GalleryComponent
                  key={siteEdit.limitGallery}
                  galleries={
                    fromHome && homeList ? homeList : siteEdit.galleries
                  }
                  siteInfo={siteEdit.id}
                  fromHome={fromHome}
                  pageCount={Math.ceil(
                    (fromHome && homeList ? homeList : siteEdit.galleries)
                      .length / siteEdit.limitGallery
                  )}
                  dark={true}
                  color={"#fff"}
                />
              </Grid>
            ) : (
              <Grid container justify="center">
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: bodyEdit.fontFamily,
                    color: "white",
                    padding: "5rem 0",
                  }}
                >
                  Currently no photo available.
                </Typography>
              </Grid>
            )
          ) : (siteView && siteView.galleries) || (fromHome && homeList) ? (
            <Grid container justify={"center"}>
              <GalleryComponent
                galleries={fromHome && homeList ? homeList : siteView.galleries}
                siteInfo={siteView.sitePath}
                fromHome={fromHome}
                color={"#fff"}
                dark={true}
              />
            </Grid>
          ) : (
            <Grid container justify="center">
              <Typography
                variant="body1"
                style={{
                  fontFamily: bodyView.fontFamily,
                  color: "white",
                  padding: "5rem 0",
                }}
              >
                Currently no photo available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(GalleryPage);
