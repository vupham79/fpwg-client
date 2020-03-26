import {
  faFacebookF,
  faInstagram,
  faMailchimp,
  faWhatsapp,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./index.module.css";
import classes from "./index.module.css";

const useStyle = theme => ({
  footer: {
    padding: "1rem 0",
    margin: 0
  }
});

class FooterPage extends Component {
  renderUrl = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit.url) {
        return <FontAwesomeIcon icon={faFacebookF} color="white" size="2x" />;
      }
    } else if (siteView.url) {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="2x" />;
    }
    return <></>;
  };

  renderInstagram = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.instagram) {
        return <FontAwesomeIcon icon={faInstagram} color="white" size="2x" />;
      }
    } else if (siteView && siteView.instagram) {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="2x" />;
    }
    return <></>;
  };

  renderYoutube = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.youtube) {
        return <FontAwesomeIcon icon={faYoutube} color="white" size="2x" />;
      }
    } else if (siteView && siteView.youtube) {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="2x" />;
    }
    return <></>;
  };

  renderEmail = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.email) {
        return <FontAwesomeIcon icon={faMailchimp} color="white" size="2x" />;
      }
    } else if (siteView && siteView.email) {
      return <FontAwesomeIcon icon={faMailchimp} color="white" size="2x" />;
    }
    return <></>;
  };

  renderWhatsapp = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.whatsapp) {
        return <FontAwesomeIcon icon={faWhatsapp} color="white" size="2x" />;
      }
    } else if (siteView && siteView.whatsapp) {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="2x" />;
    }
    return <></>;
  };

  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      classes
    } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.footer}
      >
        <Grid item xs={3}>
          <Typography
            variant="body1"
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily
            }}
          >
            © {isEdit ? siteEdit.title : siteView.title}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Grid style={{ border: "1px solid white", color: "white" }}>
            <Typography
              style={{
                padding: "1rem",
                fontWeight: "800",
                textAlign: "center",
                fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily
              }}
              variant="body1"
            >
              POWERED BY FPWG
            </Typography>
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
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(withStyles(useStyle)(FooterPage));
