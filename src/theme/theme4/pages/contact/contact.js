import {
  Divider,
  Grid,
  Typography,
  withStyles,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const useStyle = (theme) => ({
  root: {
    padding: "2.5rem 0",
  },
});
class Theme1Contact extends React.Component {
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

    const useStyles = () => ({
      changableTitle5: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: "48px",
        textDecoration: "underline",
      },
    });
    const titleStyle = useStyles();

    return (
      <Grid
        container
        justify="center"
        style={{
          padding: "10vh 0",
        }}
        id="contact"
      >
        <Grid item xs={12}>
          <p style={titleStyle.changableTitle5}>
            {fromHome
              ? homeTitle
              : isEdit
              ? siteEdit &&
                siteEdit.navItems &&
                siteEdit.navItems.find((item) => item.original === "contact")
                  .name
              : siteView &&
                siteView.navItems &&
                siteView.navItems.find((item) => item.original === "contact")
                  .name}
          </p>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          container
          justify="center"
          style={{ padding: "2.5rem 0" }}
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
                        fontSize: 22,
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
                        fontSize: 20,
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
                      fontSize: 22,
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
                      fontSize: 20,
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
                        fontSize: 22,
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
                        fontSize: 20,
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
                      fontSize: 22,
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
                      fontSize: 20,
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
                        fontSize: 22,
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
                        fontSize: 20,
                        // paddingBottom: 20,
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
                      fontSize: 22,
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
                      fontSize: 20,
                      // paddingBottom: 20,
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
)(withStyles(useStyle)(Theme1Contact));
