import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";
import { faPhone, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Theme1Contact extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
    } = this.props;

    const useStyles = theme => ({
      changableTitle: {
        fontFamily: siteEdit.fontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
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

    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap defaultZoom={15} defaultCenter={{ lat: isEdit ? parseFloat(siteEdit.latitude) : parseFloat(siteView.latitude), lng: isEdit ? parseFloat(siteEdit.longitude) : parseFloat(siteView.longitude) }}>
          <Marker position={{ lat: isEdit ? parseFloat(siteEdit.latitude) : parseFloat(siteView.latitude), lng: isEdit ? parseFloat(siteEdit.longitude) : parseFloat(siteView.longitude) }} />
        </GoogleMap>
      ))
    );
    return (
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>C</span>ONTACTS
          </p>
        </Grid>
        {isEdit && siteEdit.phone && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faPhone} size="2x" />
              {siteEdit.phone}
            </p>
          </Grid>
        )}
        {!isEdit && siteView.phone && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faPhone} size="2x" />
              {siteView.phone}
            </p>
          </Grid>
        )}
        {isEdit && siteEdit.address && siteEdit.adress !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faAddressBook} size="2x" />
              {siteEdit.address}
            </p>
          </Grid>
        )}
        {!isEdit && siteView.address && siteView.adress !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faAddressBook} size="2x" />
              {siteView.address}
            </p>
          </Grid>
        )}
        <Grid item xs={12} id={"eventSection"}>
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
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
});

export default connect(mapStateToProps, null)(Theme1Contact);
