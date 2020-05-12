import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faWhatsapp,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      youtube,
      instagram,
      whatsapp,
      bodyEdit,
      bodyView,
      titleEdit,
      titleView
    } = this.props;

    return (
      <Grid
        container
        style={{
          backgroundColor: "#121212",
          marginTop: 100,
          height: 270,
          postion: "absolute",
          bottom: 0,
        }}
      >
        <Grid container item xs={12} justify="center">
          <IconButton
            aria-label=""
            color="primary"
            href={isEdit ? siteEdit.url : siteView.url}
            target={"_blank"}
          >
            <FontAwesomeIcon icon={faFacebook} color="white" size="1x" />
          </IconButton>
        </Grid>
        <Grid container item xs={12} justify="center">
          <p
            style={{
              color: "white",
              fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
            }}
          >
            @{isEdit ? siteEdit.title : siteView.title}
          </p>
        </Grid>

        <Grid container item direction="row" justify="center" xs={12}>
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
              target={"_blank"}
            >
              <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />
            </IconButton>
          </Grid>

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
              <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />
            </IconButton>
          </Grid>

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
              <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />
            </IconButton>
          </Grid>

          <Grid item container xs={12} justify="center">
            <Grid item xs={3} style={{ border: "1px solid white", color: "white", height: 60, marginTop: 20 }}>
              <Typography
                style={{
                  padding: "1rem",
                  fontWeight: "800",
                  textAlign: "center",
                  fontFamily: isEdit
                    ? titleEdit.fontFamily
                    : titleView.fontFamily,
                }}
                variant="body1"
              >
                POWERED BY FPWG
            </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  siteEdit: state.site.siteEdit,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
});

export default connect(mapStateToProps, null)(Footer);
