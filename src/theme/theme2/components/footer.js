import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid, IconButton, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./index.module.css";

class FooterPage extends Component {
  renderUrl = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="1x" />;
    }
  };

  renderInstagram = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />;
    }
  };

  renderYoutube = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />;
    }
  };

  renderWhatsapp = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />;
    }
  };

  render() {
    const {
      isEdit,
      titleEdit,
      siteEdit,
      siteView,
      youtube,
      instagram,
      whatsapp,
    } = this.props;
    return (
      <Grid container direction="row" className={styles.footer}>
        <Grid
          container
          item
          justify="center"
          xs={12}
          // style={{ marginTop: "4rem" }}
        >
          {(siteEdit && siteEdit.url) || (siteView && siteView.url) ? (
            <Grid item>
              <IconButton
                aria-label=""
                color="primary"
                href={
                  isEdit ? siteEdit && siteEdit.url : siteView && siteView.url
                }
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
                href={`https://wa.me/${isEdit ? whatsapp : siteView.whatsapp}`}
              >
                {this.renderWhatsapp()}
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
        <Divider className={styles.bot_divider} variant="fullWidth" />
        <Grid item sm={12} xs={12} container className={styles.bot_footer}>
          <Grid item sm={9} container justify="flex-start">
            <Typography
              style={{
                fontWeight: 400,
                color: "#7c7c7c",
                textAlign: "left",
                fontSize: 16,
              }}
            >
              © {isEdit ? siteEdit.title : siteView.title}
            </Typography>
          </Grid>
          <Grid item sm={3} container justify="center">
            <Typography
              style={{
                fontFamily: isEdit
                  ? titleEdit.fontFamily
                  : titleEdit.fontFamily,
                fontSize: "15px !important",
                textTransform: "uppercase !important",
                display: "inline-block !important",
                verticalAlign: "middle !important",
                lineHeight: "1.4 !important",
                margin: "0 !important",
                fontWeight: "bold",
              }}
            >
              POWERED BY FPWG
            </Typography>
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
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
});

export default connect(mapStateToProps, null)(FooterPage);
