import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import GalleryComponent from "../../../component/galleryComponent";

class Theme1Gallery extends React.Component {
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteEdit,
      siteView,
      bodyEdit,
      bodyView,
      fromHome,
      homeTitle
    } = this.props;

    const useStyles = theme => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 25,
        paddingBottom: 20,
        textDecoration: "underline",
      },
      changableBody: {
        fontFamily: isEdit ? titleEdit.fontBody : titleView.fontBody,
        color: "#212121",
        textAlign: "center",
        fontSize: 16
      },
      changableBody2: {
        fontFamily: isEdit ? titleEdit.fontBody : titleView.fontBody,
        color: "#212121",
        textAlign: "left",
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
        padding: 30,
        textAlign: "center",
        color: "#535353",
        fontSize: 20
      },
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 50
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
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
      <Grid container style={{ backgroundColor: "#1a1919", paddingBottom: 50 }}>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            {fromHome ? homeTitle : "GALLERY"}
          </p>
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
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(Theme1Gallery);
