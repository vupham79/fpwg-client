import { Grid, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const usestyle = (theme) => ({
  title: {
    textDecoration: "solid",
    padding: "1rem 0",
  },
  map: {
    maxHeight: "",
  },
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
      homeTitle,
      email,
      phone,
      address,
    } = this.props;

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
      <Grid container justify="center" className={styles.contact_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            className={styles.title}
            style={{
              color: "white",
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
              letterSpacing: "0.2rem",
            }}
          >
            {fromHome
              ? homeTitle
              : isEdit
              ? siteEdit &&
                siteEdit.navItems.map((item) => {
                  if (item.original === "contact") {
                    return item.name;
                  } else return "";
                })
              : siteView &&
                siteView.navItems.map((item) => {
                  if (item.original === "contact") {
                    return item.name;
                  } else return "";
                })}
          </Typography>
        </Grid>
        <Grid container spacing={2} item xs={12} justify="center">
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={
              (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
              (siteView && siteView.latitude && siteView.longitude)
                ? 3
                : 6
            }
            style={{ padding: "0 2rem" }}
          >
            {isEdit ? (
              address ? (
                <Grid
                  item
                  xs={10}
                  sm={
                    (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
                    (siteView && siteView.latitude && siteView.longitude)
                      ? 12
                      : 6
                  }
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      style={{
                        color: "white",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontSize: 20,
                      }}
                    >
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="body2"
                      style={{
                        color: "white",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontSize: 16,
                      }}
                    >
                      {isEdit
                        ? address
                          ? address
                          : "Curent no address to show."
                        : siteView && siteView.address
                        ? siteView.address
                        : "Curent no address to show."}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : siteView && siteView.address ? (
              <Grid
                item
                xs={10}
                sm={
                  (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
                  (siteView && siteView.latitude && siteView.longitude)
                    ? 12
                    : 6
                }
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    style={{
                      color: "white",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontSize: 20,
                    }}
                  >
                    Address
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="body2"
                    style={{
                      color: "white",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontSize: 16,
                    }}
                  >
                    {isEdit
                      ? address
                        ? address
                        : "Curent no address to show."
                      : siteView && siteView.address
                      ? siteView.address
                      : "Curent no address to show."}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {isEdit ? (
              email ? (
                <Grid
                  item
                  xs={10}
                  sm={
                    (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
                    (siteView && siteView.latitude && siteView.longitude)
                      ? 12
                      : 6
                  }
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      style={{
                        color: "white",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontSize: 20,
                      }}
                    >
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      variant="body2"
                      style={{
                        color: "white",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontSize: 16,
                      }}
                    >
                      {isEdit
                        ? email
                          ? email
                          : "Curent no Email to show."
                        : siteView && siteView.email
                        ? siteView.email
                        : "Curent no Email to show."}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : siteView && siteView.email ? (
              <Grid
                item
                xs={10}
                sm={
                  (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
                  (siteView && siteView.latitude && siteView.longitude)
                    ? 12
                    : 6
                }
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    style={{
                      color: "white",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontSize: 20,
                    }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="body2"
                    style={{
                      color: "white",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontSize: 16,
                    }}
                  >
                    {isEdit
                      ? email
                        ? email
                        : "Curent no Email to show."
                      : siteView && siteView.email
                      ? siteView.email
                      : "Curent no Email to show."}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {isEdit ? (
              phone ? (
                <Grid
                  item
                  xs={10}
                  sm={
                    (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
                    (siteView && siteView.latitude && siteView.longitude)
                      ? 12
                      : 6
                  }
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      className={classes.title}
                      style={{
                        color: "white",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontSize: 20,
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
                          : bodyView.fontFamily,
                        fontSize: 16,
                      }}
                    >
                      {isEdit
                        ? phone
                          ? phone
                          : "Curent no phone to show."
                        : siteView && siteView.phone
                        ? siteView.phone
                        : "Curent no phone to show."}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : siteView && siteView.phone ? (
              <Grid
                item
                xs={10}
                sm={
                  (siteEdit && siteEdit.latitude && siteEdit.longitude) ||
                  (siteView && siteView.latitude && siteView.longitude)
                    ? 12
                    : 6
                }
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    className={classes.title}
                    style={{
                      color: "white",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontSize: 20,
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
                        : bodyView.fontFamily,
                      fontSize: 16,
                    }}
                  >
                    {isEdit
                      ? phone
                        ? phone
                        : "Curent no phone to show."
                      : siteView && siteView.phone
                      ? siteView.phone
                      : "Curent no phone to show."}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          {isEdit
            ? siteEdit &&
              siteEdit.latitude &&
              siteEdit.longitude && (
                <Grid item md={7} sm={10} xs={10} className={classes.map}>
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `15rem` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </Grid>
              )
            : siteView &&
              siteView.latitude &&
              siteView.longitude && (
                <Grid item md={7} sm={10} xs={10} className={classes.map}>
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `15rem` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </Grid>
              )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
  profile: state.user.profile,
  email: state.site.email,
  address: state.site.address,
  phone: state.site.phone,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(usestyle)(ContactPage));
