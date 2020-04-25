import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import GalleryComponent from "../../../component/galleryComponent";

class Theme1Gallery extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteEdit,
      siteView,
      fromHome,
      homeTitle,
      homeList,
      bodyEdit,
      bodyView
    } = this.props;

    const useStyles = (theme) => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20,
        textTransform: "uppercase",
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        fontSize: 16,
        textAlign: "justify",
        hyphens: "auto",
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color,
      },
    });
    const classes = useStyles();

    return (
      <Grid container style={{ minHeight: "50vh" }} justify="center">
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
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
          </p>
        </Grid>
        {isEdit ? (
          siteEdit && siteEdit.galleries && siteEdit.galleries.length > 0 ? (
            <GalleryComponent
              key={siteEdit.limitGallery}
              galleries={fromHome && homeList ? homeList : siteEdit.galleries}
              siteInfo={siteEdit.id}
              fromHome={fromHome}
              pageCount={Math.ceil(
                (fromHome && homeList ? homeList : siteEdit.galleries).length /
                siteEdit.limitGallery
              )}
            />
          ) : (
              <p className={classes.changableBody}>
                Currently no photo available.
              </p>
            )
        ) : (siteView && siteView.galleries && siteView.galleries.length > 0) || (fromHome && homeList && homeList.length > 0) ? (
          <GalleryComponent
            galleries={fromHome && homeList ? homeList : siteView.galleries}
            siteInfo={siteView.sitePath}
            fromHome={fromHome}
          />
        ) : (
              <p className={classes.changableBody}>Currently no photo available.</p>
            )}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(Theme1Gallery);
