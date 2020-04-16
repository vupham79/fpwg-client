import {
  Grid,
  Typography,
  withStyles,
  Divider,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  renderUrl = () => {
    const { isEdit, dark } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faFacebookF} color={"#fff"} size="sm" />;
    } else {
      return <FontAwesomeIcon icon={faFacebookF} color={"#fff"} size="sm" />;
    }
  };

  renderInstagram = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faInstagram} color={"#fff"} size="sm" />;
    } else {
      return <FontAwesomeIcon icon={faInstagram} color={"#fff"} size="sm" />;
    }
  };

  renderYoutube = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faYoutube} color={"#fff"} size="sm" />;
    } else {
      return <FontAwesomeIcon icon={faYoutube} color={"#fff"} size="sm" />;
    }
  };

  renderWhatsapp = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faWhatsapp} color={"#fff"} size="sm" />;
    } else {
      return <FontAwesomeIcon icon={faWhatsapp} color={"#fff"} size="sm" />;
    }
  };
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
      youtube,
      instagram,
      whatsapp,
    } = this.props;
    const mapExist = () => {
      if (isEdit) {
        if (siteEdit && siteEdit.latitude && siteEdit.longitude) {
          return true;
        }
        return false;
      } else {
        if (siteView && siteView.latitude && siteView.longitude) {
          return true;
        }
        return false;
      }
    };
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
        <Grid
          container
          spacing={2}
          item
          xs={10}
          justify="center"
          style={{ marginBottom: "2.5rem" }}
        >
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={mapExist ? 4 : 6}
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
            <Divider
              variant="fullWidth"
              style={{
                width: "100%",
                backgroundColor: "#fff",
                marginTop: "2.5rem",
              }}
            />
            <Grid container item justify="flex-start" xs={12}>
              {(siteEdit && siteEdit.url) || (siteView && siteView.url) ? (
                <Grid item>
                  <IconButton
                    aria-label=""
                    color="primary"
                    href={
                      isEdit
                        ? siteEdit && siteEdit.url
                        : siteView && siteView.url
                    }
                    target={"_blank"}
                  >
                    {this.renderUrl()}
                  </IconButton>
                </Grid>
              ) : null}
              {(instagram && instagram) || (siteView && siteView.instagram) ? (
                <Grid
                  item
                  style={
                    isEdit
                      ? instagram
                        ? null
                        : { display: "none" }
                      : siteView.instagram
                      ? null
                      : { display: "none" }
                  }
                >
                  <IconButton
                    aria-label=""
                    color="primary"
                    href={`https://instagram.com/${
                      isEdit ? instagram : siteView.instagram
                    }`}
                    target={"_blank"}
                  >
                    {this.renderInstagram()}
                  </IconButton>
                </Grid>
              ) : null}
              {(siteView && siteView.youtube) || (youtube && youtube) ? (
                <Grid
                  item
                  style={
                    isEdit
                      ? youtube
                        ? null
                        : { display: "none" }
                      : siteView.youtube
                      ? null
                      : { display: "none" }
                  }
                >
                  <IconButton
                    aria-label=""
                    color="primary"
                    href={isEdit ? youtube : siteView.youtube}
                    target={"_blank"}
                  >
                    {this.renderYoutube()}
                  </IconButton>
                </Grid>
              ) : null}
              {(siteView && siteView.whatsapp) || (whatsapp && whatsapp) ? (
                <Grid
                  item
                  style={
                    isEdit
                      ? whatsapp
                        ? null
                        : { display: "none" }
                      : siteView.whatsapp
                      ? null
                      : { display: "none" }
                  }
                >
                  <IconButton
                    aria-label=""
                    color="primary"
                    href={`https://wa.me/${
                      isEdit ? whatsapp : siteView.whatsapp
                    }`}
                    target={"_blank"}
                  >
                    {this.renderWhatsapp()}
                  </IconButton>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          {isEdit
            ? siteEdit &&
              siteEdit.latitude &&
              siteEdit.longitude && (
                <Grid item md={4} sm={6} xs={10} className={classes.map}>
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4eDIsVpSTDmUOlyFAJLSS6pZYH4P9B7Q&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `300px` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `300px` }} />}
                  />
                </Grid>
              )
            : siteView &&
              siteView.latitude &&
              siteView.longitude && (
                <Grid item md={4} sm={6} xs={10} className={classes.map}>
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4eDIsVpSTDmUOlyFAJLSS6pZYH4P9B7Q&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `300px` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `300px` }} />}
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
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
  email: state.site.email,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(usestyle)(ContactPage));
