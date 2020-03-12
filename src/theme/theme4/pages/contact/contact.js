import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

class Theme1Contact extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView
    } = this.props;

    const useStyles = theme => ({
      changableTitle: {
        fontFamily: isEdit ? siteEdit.fontTitle : siteView.fontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20
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
      changableBody3: {
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
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>CONTACTS</p>
        </Grid>

        {isEdit && siteEdit.phone && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>{siteEdit.phone}</p>
          </Grid>
        )}
        {!isEdit && siteView.phone && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>{siteView.phone}</p>
          </Grid>
        )}

        {isEdit && siteEdit.email && siteEdit.email !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>{siteEdit.email}</p>
          </Grid>
        )}
        {!isEdit && siteView.email && siteView.email !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>{siteView.email}</p>
          </Grid>
        )}

        {isEdit && siteEdit.address && siteEdit.adress !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>{siteEdit.address}</p>
          </Grid>
        )}
        {!isEdit && siteView.address && siteView.adress !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>{siteView.address}</p>
          </Grid>
        )}

        <Grid item xs={12}>
          {isEdit &&
            !siteEdit.phone &&
            !siteEdit.address &&
            !siteEdit.email && (
              <p style={classes.changableBody3}>
                Currently setting up our location.
              </p>
            )}
          {!isEdit &&
            !siteView.phone &&
            !siteView.address &&
            !siteView.email && (
              <p style={classes.changableBody3}>
                Currently setting up our location.
              </p>
            )}
        </Grid>
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
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(Theme1Contact);
