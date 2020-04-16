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
    const { isEdit, titleEdit, titleView } = this.props;
    if (isEdit) {
      return (
        <FontAwesomeIcon
          icon={faFacebookF}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faFacebookF}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    }
  };

  renderInstagram = () => {
    const { isEdit, titleEdit, titleView } = this.props;
    if (isEdit) {
      return (
        <FontAwesomeIcon
          icon={faInstagram}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faInstagram}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    }
  };

  renderYoutube = () => {
    const { isEdit, titleEdit, titleView } = this.props;
    if (isEdit) {
      return (
        <FontAwesomeIcon
          icon={faYoutube}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faYoutube}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    }
  };

  renderWhatsapp = () => {
    const { isEdit, titleEdit, titleView } = this.props;
    if (isEdit) {
      return (
        <FontAwesomeIcon
          icon={faWhatsapp}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faWhatsapp}
          color={isEdit ? titleEdit.color : titleView.color}
          size="xs"
        />
      );
    }
  };

  isShowMap = () => {
    const { isEdit, siteEdit, siteView } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.latitude) {
        return true;
      }
    } else if (siteView && siteView.latitude) {
      return true;
    }
    return false;
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
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 36,
        lineHeight: "1.4em",
        fontWeight: "bold",
      },
    });
    const titleStyle = useStyles();

    return (
      <Grid container justify="center">
        {homeTitle && (
          <Grid
            container
            alignItems="center"
            item
            sm={10}
            xs={10}
            style={{ padding: "2rem 0" }}
          >
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: isEdit ? titleEdit.color : titleView.color,
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
            <Grid item xs={6} sm={4} style={titleStyle.changableTitle}>
              {homeTitle}
            </Grid>
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: isEdit ? titleEdit.color : titleView.color,
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
          </Grid>
        )}
        <Grid
          item
          xs={10}
          sm={10}
          container
          justify="center"
          spacing={2}
          style={{ padding: "2.5rem 0" }}
        >
          <Grid
            item
            container
            xs={12}
            sm={this.isShowMap() ? 6 : 6}
            md={this.isShowMap() ? 4 : 6}
          >
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
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: this.isShowMap() ? "left" : "center",
                        fontSize: 20,
                        // paddingBottom: 16,
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
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: this.isShowMap() ? "left" : "center",
                        fontSize: 16,
                        // paddingBottom: 16,
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
                      color: isEdit ? titleEdit.color : titleView.color,
                      textAlign: this.isShowMap() ? "left" : "center",
                      fontSize: 20,
                      // paddingBottom: 16,
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
                      color: isEdit ? titleEdit.color : titleView.color,
                      textAlign: this.isShowMap() ? "left" : "center",
                      fontSize: 16,
                      // paddingBottom: 16,
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
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: this.isShowMap() ? "left" : "center",
                        fontSize: 20,
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
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: this.isShowMap() ? "left" : "center",
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
                      color: isEdit ? titleEdit.color : titleView.color,
                      textAlign: this.isShowMap() ? "left" : "center",
                      fontSize: 20,
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
                      color: isEdit ? titleEdit.color : titleView.color,
                      textAlign: this.isShowMap() ? "left" : "center",
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
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: this.isShowMap() ? "left" : "center",
                        fontSize: 20,
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
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: this.isShowMap() ? "left" : "center",
                        fontSize: 16,
                        // paddingBottom: 16,
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
                      color: isEdit ? titleEdit.color : titleView.color,
                      textAlign: this.isShowMap() ? "left" : "center",
                      fontSize: 20,
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
                      color: isEdit ? titleEdit.color : titleView.color,
                      textAlign: this.isShowMap() ? "left" : "center",
                      fontSize: 16,
                      // paddingBottom: 16,
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
            <Divider
              // variant="fullWidth"
              style={{
                backgroundColor: "white",
                // height: "3px",
              }}
            />
            <Grid
              container
              item
              justify={this.isShowMap() ? "flex-start" : "center"}
              xs={12}
            >
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
          {this.isShowMap() && (
            <Grid
              item
              container
              md={4}
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
                    <Grid item md={12} sm={12} xs={12} className={classes.map}>
                      <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4eDIsVpSTDmUOlyFAJLSS6pZYH4P9B7Q&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `300px` }} />}
                        containerElement={
                          <div
                            style={{
                              height: `300px`,
                            }}
                          />
                        }
                        mapElement={<div style={{ height: `300px` }} />}
                      />
                    </Grid>
                  )}
            </Grid>
          )}
          <Grid item container md={this.isShowMap() ? 4 : 6} sm={10} xs={10}>
            <div
              className="fb-page"
              data-href={isEdit ? siteEdit.url : siteView.url}
              data-show-text="true"
              style={{
                // maxWidth: "100%",
                width: "100%",
                // marginBottom: "30vh",
                // backgroundColor: "white",
                color: "#000",
                fontSize: "1.5rem",
                display: "flex",
                justifyContent: "center",
                overflow: "auto",
              }}
              data-tabs="timeline"
              data-width=""
              data-height="300"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite={isEdit ? siteEdit.url : siteView.url}
                className="fb-xfbml-parse-ignore"
              ></blockquote>
            </div>
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
