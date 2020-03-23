import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faSearchLocation,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

class Theme1Contact extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      phone,
      email,
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
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 16,
        fontWeight: 400
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 400
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 18,
        fontWeight: 300
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
      <Grid container style={{ backgroundColor: "#1a1919", paddingBottom: 50, minHeight: "60vh" }}>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>{fromHome ? homeTitle : "CONTACTS"}</p>
        </Grid>

        {isEdit && phone && (
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12}>
              <p style={classes.changableBody3}><FontAwesomeIcon icon={faPhoneAlt} color={isEdit ? titleEdit.color : titleView.color} size="1x" /> Phone</p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>{phone}</p>
            </Grid>
          </Grid>
        )}
        {!isEdit && siteView.phone && (
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12}>
              <p style={classes.changableBody3}><FontAwesomeIcon icon={faPhoneAlt} color={isEdit ? titleEdit.color : titleView.color} size="1x" /> Phone</p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>{siteView.phone}</p>
            </Grid>
          </Grid>
        )}

        {isEdit && email && email !== "" && (
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12}>
              <p style={classes.changableBody3}><FontAwesomeIcon icon={faNewspaper} color={isEdit ? titleEdit.color : titleView.color} size="1x" /> Email</p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>{email}</p>
            </Grid>
          </Grid>
        )}
        {!isEdit && siteView.email && siteView.email !== "" && (
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12}>
              <p style={classes.changableBody3}><FontAwesomeIcon icon={faNewspaper} color={isEdit ? titleEdit.color : titleView.color} size="1x" /> Email</p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>{siteView.email}</p>
            </Grid>
          </Grid>
        )}

        {isEdit && siteEdit.address && siteEdit.adress !== "" && (
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12}>
              <p style={classes.changableBody3}><FontAwesomeIcon icon={faSearchLocation} color={isEdit ? titleEdit.color : titleView.color} size="1x" /> Location</p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>{siteEdit.address}</p>
            </Grid>
          </Grid>
        )}
        {!isEdit && siteView.address && siteView.adress !== "" && (
          <Grid container item xs={12} justify="center" alignItems="center">
            <Grid item xs={12}>
              <p style={classes.changableBody3}><FontAwesomeIcon icon={faSearchLocation} color={isEdit ? titleEdit.color : titleView.color} size="1x" /> Location</p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>{siteView.address}</p>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          {isEdit &&
            !phone &&
            !siteEdit.address &&
            !email && (
              <p style={classes.changableBody4}>
                Currently setting up our location.
              </p>
            )}
          {!isEdit &&
            !siteView.phone &&
            !siteView.address &&
            !siteView.email && (
              <p style={classes.changableBody4}>
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
  bodyView: state.site.bodyView,
  phone: state.site.phone,
  email: state.site.email
});

export default connect(mapStateToProps, null)(Theme1Contact);
