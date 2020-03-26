import { Divider, Grid, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const usestyle = theme => ({
  title: {
    textDecoration: "solid",
    padding: "1rem 0"
  },
  map: {
    maxHeight: ""
  }
});

class ContactPage extends React.Component {
  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteEdit,
      siteView,
      classes,
      fromHome,
      homeTitle
    } = this.props;

    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            // lat: isEdit
            //   ? parseFloat(siteEdit.latitude)
            //   : parseFloat(siteView.latitude),
            // lng: isEdit
            //   ? parseFloat(siteEdit.longitude)
            //   : parseFloat(siteView.longitude)
            lat: 10.816929,
            lng: 106.68859
          }}
        >
          <Marker
            position={{
              // lat: isEdit
              //   ? parseFloat(siteEdit.latitude)
              //   : parseFloat(siteView.latitude),
              // lng: isEdit
              //   ? parseFloat(siteEdit.longitude)
              //   : parseFloat(siteView.longitude)
              lat: 10.819713,
              lng: -106.691407
            }}
          />
        </GoogleMap>
      ))
    );
    return (
      <Grid container justify="center" className={styles.contact_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom
            className={styles.title}
            style={{
              color: "white",
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily
            }}
          >
            {fromHome ? homeTitle : "Contacts"}
          </Typography>
        </Grid>
        <Grid container spacing={2} item xs={12} justify="center">
          <Grid container item xs={6} sm={6} md={3}>
            <Grid item xs={12}>
              <Grid item xs={6}>
                <Typography
                  variant="h5"
                  className={classes.title}
                  style={{
                    color: "white",
                    fontFamily: isEdit
                      ? bodyEdit.fontFamily
                      : bodyView.fontFamily
                  }}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  style={{
                    color: "white",
                    fontFamily: isEdit
                      ? bodyEdit.fontFamily
                      : bodyView.fontFamily
                  }}
                >
                  {isEdit
                    ? siteEdit && siteEdit.address
                      ? siteEdit.address
                      : "Curent no phone to address to show."
                    : siteView && siteView.address}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  className={classes.title}
                  style={{
                    color: "white",
                    fontFamily: isEdit
                      ? bodyEdit.fontFamily
                      : bodyView.fontFamily
                  }}
                >
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  style={{
                    color: "white",
                    fontFamily: isEdit
                      ? bodyEdit.fontFamily
                      : bodyView.fontFamily
                  }}
                >
                  {isEdit
                    ? siteEdit && siteEdit.phone
                      ? siteEdit.phone
                      : "Curent no phone to show."
                    : siteView && siteView.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={7} sm={10} xs={10} className={classes.map}>
            {isEdit ? (
              <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `15rem` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            ) : (
                <MapWithAMarker
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `15rem` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
  profile: state.user.profile
});

export default connect(
  mapStateToProps,
  null
)(withStyles(usestyle)(ContactPage));
