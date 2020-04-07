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
        fontFamily: isEdit ? titleEdit.fontBody : titleView.fontBody,
        color: "#535353",
        textAlign: "center",
        fontSize: 16,
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
            <span style={classes.changableFirst}>
              {fromHome ? homeTitle.charAt(0) : "G"}
            </span>
            {fromHome ? homeTitle.substring(1) : "ALLERY"}
          </p>
        </Grid>
        {isEdit ? (
          siteEdit && siteEdit.galleries ? (
            <GalleryComponent
              galleries={fromHome && homeList ? homeList : siteEdit.galleries}
              siteInfo={siteEdit.id}
              fromHome={fromHome}
              pageCount={Math.ceil(
                (fromHome && homeList ? homeList : siteEdit.galleries).length /
                  this.state.itemPerPage
              )}
              itemPerPage={this.state.itemPerPage}
            />
          ) : (
            <p className={classes.changableBody}>
              Currently no photo available.
            </p>
          )
        ) : (siteView && siteView.galleries) || (fromHome && homeList) ? (
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
