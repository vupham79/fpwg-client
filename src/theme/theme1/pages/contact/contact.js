import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from "react-google-maps";
import {
  faPhone,
  faAddressBook,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      homeTitle,
      address,
    } = this.props;

    const useStyles = (theme) => ({
      changableTitle: {
        fontFamily: isEdit ? siteEdit.fontTitle : siteView.fontTitle,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20,
        textTransform: "uppercase",
      },
      changableTitle2: {
        fontFamily: isEdit ? siteEdit.fontTitle : siteView.fontTitle,
        fontWeight: "bold",
        fontSize: 18,
        color: isEdit ? titleEdit.color : titleView.color,
        marginLeft: "25%",
      },
      changableBody: {
        fontFamily: isEdit ? titleEdit.fontBody : titleView.fontBody,
        color: "#535353",
        textAlign: "center",
        fontSize: 16,
      },
      changableBody2: {
        fontFamily: isEdit ? titleEdit.fontBody : titleView.fontBody,
        color: "#a0a09f",
        textAlign: "left",
        fontSize: 16,
        marginLeft: "25%",
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        textAlign: "center",
        fontSize: 16,
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#535353",
        fontSize: 20,
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

    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: isEdit
              ? parseFloat(siteEdit.latitude)
              : parseFloat(siteView.latitude),
            lng: isEdit
              ? parseFloat(siteEdit.longitude)
              : parseFloat(siteView.longitude),
          }}
        >
          <Marker
            position={{
              lat: isEdit
                ? parseFloat(siteEdit.latitude)
                : parseFloat(siteView.latitude),
              lng: isEdit
                ? parseFloat(siteEdit.longitude)
                : parseFloat(siteView.longitude),
            }}
          />
        </GoogleMap>
      ))
    );
    return (
      <Grid container justify="center" style={{ minHeight: "50vh" }}>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>
              {fromHome ? homeTitle.charAt(0) : "C"}
            </span>
            {fromHome ? homeTitle.substring(1) : "ONTACT"}
          </p>
        </Grid>

        {isEdit && phone && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <p style={classes.changableTitle2}>
                PHONE
            </p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>
                {phone}
              </p>
            </Grid>
          </Grid>
        )}
        {!isEdit && siteView.phone && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <p style={classes.changableTitle2}>
                PHONE
            </p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>
                {siteView.phone}
              </p>
            </Grid>
          </Grid>
        )}

        {isEdit && email && email !== "" && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <p style={classes.changableTitle2}>
                EMAIL
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>
                {email}
              </p>
            </Grid>
          </Grid>
        )}
        {!isEdit && siteView.email && siteView.email !== "" && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <p style={classes.changableTitle2}>
                EMAIL
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>
                {siteView.email}
              </p>
            </Grid>
          </Grid>
        )}

        {isEdit && address && address !== "" && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <p style={classes.changableTitle2}>
                ADDRESS
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>
                {address}
              </p>
            </Grid>
          </Grid>
        )}
        {!isEdit && siteView.address && siteView.adress !== "" && (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <p style={classes.changableTitle2}>
                ADDRESS
              </p>
            </Grid>
            <Grid item xs={12}>
              <p style={classes.changableBody2}>
                {siteView.address}
              </p>
            </Grid>
          </Grid>
        )}

        <Grid item xs={6} justify="center">
          {isEdit && siteEdit.latitude && siteEdit.longitude && (
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4eDIsVpSTDmUOlyFAJLSS6pZYH4P9B7Q&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
          {!isEdit && siteView.latitude && siteView.longitude && (
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4eDIsVpSTDmUOlyFAJLSS6pZYH4P9B7Q&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `300px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
          {isEdit && !phone && !siteEdit.address && !email && (
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

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  phone: state.site.phone,
  email: state.site.email,
  address: state.site.address,
});

export default connect(mapStateToProps, null)(Theme1Contact);
