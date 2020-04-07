import {
  Divider,
  Grid,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
const useStyle = (theme) => ({
  root: {
    marginTop: "2.5rem",
    marginBottom: "2.5rem",
  },
});

class ContactPage extends React.Component {
  renderUrl = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faFacebookF} color="black" size="xs" />;
    } else {
      return <FontAwesomeIcon icon={faFacebookF} color="black" size="xs" />;
    }
  };

  renderInstagram = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faInstagram} color="black" size="xs" />;
    } else {
      return <FontAwesomeIcon icon={faInstagram} color="black" size="xs" />;
    }
  };

  renderYoutube = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faYoutube} color="black" size="xs" />;
    } else {
      return <FontAwesomeIcon icon={faYoutube} color="black" size="xs" />;
    }
  };

  renderWhatsapp = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="xs" />;
    } else {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="xs" />;
    }
  };

  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteView,
      siteEdit,
      fromHome,
      homeTitle,
      classes,
      phone,
      email,
      address,
      youtube,
      instagram,
      whatsapp,
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
      <Grid
        container
        justify="center"
        className={styles.contact_page}
        style={{
          marginBottom: fromHome && "0",
          minHeight: !fromHome && "80vh",
        }}
      >
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          item
          sm={12}
          xs={12}
          className={styles.contact_title}
          style={{
            height: fromHome && "6rem",
          }}
        >
          <Grid item>
            <Typography
              variant="h4"
              color="textSecondary"
              align="center"
              className={styles.title}
              style={{
                fontFamily: isEdit
                  ? titleEdit.fontFamily
                  : titleView.fontFamily,
                fontWeight: "bold",
                color: isEdit ? siteEdit.color : siteView.color,
                textAlign: "center",
                fontSize: 28,
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          container
          justify="center"
          spacing={2}
          className={classes.root}
        >
          <Grid item container xs={10} sm={6}>
            {isEdit ? (
              address ? (
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      className={styles.child_content}
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontWeight: "bold",
                        color: "#151515",
                        textAlign: "left",
                        fontSize: 18,
                        // paddingBottom: 20,
                      }}
                    >
                      Address:
                    </Typography>
                    <Typography
                      variant="body1"
                      className={styles.child_content}
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontWeight: "100",
                        color: "#151515",
                        textAlign: "left",
                        fontSize: 16,
                        // paddingBottom: 20,
                      }}
                    >
                      {isEdit
                        ? address
                          ? address
                          : "Currently no data"
                        : siteView && siteView.address
                        ? siteView.address
                        : "Currently no data"}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : siteView && siteView.address ? (
              <Grid
                container
                item
                xs={12}
                sm={12}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    className={styles.child_content}
                    style={{
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontWeight: "bold",
                      color: "#151515",
                      textAlign: "left",
                      fontSize: 18,
                      // paddingBottom: 20,
                    }}
                  >
                    Address:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={styles.child_content}
                    style={{
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontWeight: "100",
                      color: "#151515",
                      textAlign: "left",
                      fontSize: 16,
                      // paddingBottom: 20,
                    }}
                  >
                    {isEdit
                      ? address
                        ? address
                        : "Currently no data"
                      : siteView && siteView.address
                      ? siteView.address
                      : "Currently no data"}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {isEdit ? (
              phone ? (
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      className={styles.child_content}
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontWeight: "bold",
                        color: "#151515",
                        textAlign: "left",
                        fontSize: 18,
                      }}
                    >
                      Phone:
                    </Typography>
                    <Typography
                      variant="body1"
                      className={styles.child_content}
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontWeight: "100",
                        color: "#151515",
                        textAlign: "left",
                        fontSize: 16,
                      }}
                    >
                      {isEdit
                        ? phone
                          ? phone
                          : "Currently no data"
                        : siteView && siteView.phone
                        ? siteView.phone
                        : "Currently no data"}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : siteView && siteView.phone ? (
              <Grid
                container
                item
                xs={12}
                sm={12}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    className={styles.child_content}
                    style={{
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontWeight: "bold",
                      color: "#151515",
                      textAlign: "left",
                      fontSize: 18,
                    }}
                  >
                    Phone:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={styles.child_content}
                    style={{
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontWeight: "100",
                      color: "#151515",
                      textAlign: "left",
                      fontSize: 16,
                    }}
                  >
                    {isEdit
                      ? phone
                        ? phone
                        : "Currently no data"
                      : siteView && siteView.phone
                      ? siteView.phone
                      : "Currently no data"}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            {isEdit ? (
              email ? (
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      className={styles.child_content}
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontWeight: "bold",
                        color: "#151515",
                        textAlign: "left",
                        fontSize: 18,
                      }}
                    >
                      Email:
                    </Typography>
                    <Typography
                      variant="body1"
                      className={styles.child_content}
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        fontWeight: "100",
                        color: "#151515",
                        textAlign: "left",
                        fontSize: 16,
                        paddingBottom: 20,
                      }}
                    >
                      {isEdit
                        ? email
                          ? email
                          : "Currently no data"
                        : siteView && siteView.email
                        ? siteView.email
                        : "Currently no data"}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )
            ) : siteView && siteView.email ? (
              <Grid
                container
                item
                xs={12}
                sm={12}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    className={styles.child_content}
                    style={{
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontWeight: "bold",
                      color: "#151515",
                      textAlign: "left",
                      fontSize: 18,
                    }}
                  >
                    Email:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={styles.child_content}
                    style={{
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      fontWeight: "100",
                      color: "#151515",
                      textAlign: "left",
                      fontSize: 16,
                      paddingBottom: 20,
                    }}
                  >
                    {isEdit
                      ? email
                        ? email
                        : "Currently no data"
                      : siteView && siteView.email
                      ? siteView.email
                      : "Currently no data"}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            <Divider variant="fullWidth" style={{ width: "100%" }} />
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
          <Grid
            item
            container
            sm={6}
            xs={10}
            // justify={"center"}
          >
            {isEdit
              ? siteEdit &&
                siteEdit.latitude &&
                siteEdit.longitude && (
                  <Grid item md={12} sm={12} xs={12} className={classes.map}>
                    <MapWithAMarker
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `100%` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </Grid>
                )
              : siteView &&
                siteView.latitude &&
                siteView.longitude && (
                  <Grid item md={12} sm={12} xs={12} className={classes.map}>
                    <MapWithAMarker
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={
                        <div
                          style={{
                            height: `100%`,
                          }}
                        />
                      }
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                  </Grid>
                )}
          </Grid>
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
  phone: state.site.phone,
  email: state.site.email,
  address: state.site.address,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(useStyle)(ContactPage));
