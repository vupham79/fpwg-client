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
      homeList,
      homeTitle,
    } = this.props;
    return (
      <Grid
        container
        justify="center"
        className={styles.gallery_page}
        style={{
          marginBottom: fromHome && "0",
        }}
      >
        <Grid
          item
          container
          justify={"center"}
          alignItems={"center"}
          sm={12}
          xs={12}
          className={styles.gallery_title}
          style={{
            height: fromHome ? "6rem" : "8rem",
          }}
        >
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            style={{
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
              fontWeight: 500,
              color: isEdit ? siteEdit.color : siteView.color,
              textAlign: "center",
              fontSize: 28,
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
        <Grid
          item
          xs={12}
          sm={12}
          container
          justify="center"
          // spacing={2}
          style={{
            marginTop: "2.5rem",
            marginBottom: "2.5rem",
            minHeight: !fromHome && "55vh",
          }}
        >
          {isEdit ? (
            siteEdit && siteEdit.galleries ? (
              <GalleryComponent
                key={siteEdit.limitGallery}
                galleries={fromHome && homeList ? homeList : siteEdit.galleries}
                siteInfo={siteEdit.id}
                fromHome={fromHome}
                pageCount={Math.ceil(
                  (fromHome && homeList ? homeList : siteEdit.galleries)
                    .length / siteEdit.limitGallery
                )}
              />
            ) : (
              <Grid
                container
                justify="center"
                style={{ minHeight: "30vh", marginTop: "10vh" }}
              >
                <p style={{ fontFamily: isEdit ? bodyEdit : bodyView }}>
                  Currently no photo available.
                </p>
              </Grid>
            )
          ) : (siteView && siteView.galleries) || (fromHome && homeList) ? (
            <GalleryComponent
              galleries={fromHome && homeList ? homeList : siteView.galleries}
              siteInfo={siteView.sitePath}
              fromHome={fromHome}
            />
          ) : (
            <Grid
              container
              justify="center"
              style={{ minHeight: "30vh", marginTop: "10vh" }}
            >
              <p style={{ fontFamily: isEdit ? bodyEdit : bodyView }}>
                Currently no photo available.
              </p>
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
