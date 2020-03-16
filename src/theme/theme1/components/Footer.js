import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faWhatsapp,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  render() {
    const { isEdit, siteEdit, siteView } = this.props;

    return (
      <Grid
        container
        style={{
          backgroundColor: "#212121",
          marginTop: 50,
          height: 300,
          postion: "absolute",
          bottom: 0
        }}
      >
        <Grid container item xs={12} justify="center">
          <IconButton
            aria-label=""
            color="primary"
            href={isEdit ? siteEdit.url : siteView.url}
          >
            <FontAwesomeIcon icon={faFacebook} color="white" size="2x" />
          </IconButton>
        </Grid>
        <Grid container item xs={12} justify="center">
          <p style={{ color: "white" }}>
            @{isEdit ? siteEdit.title : siteView.title}
          </p>
        </Grid>

        <Grid container item direction="row" justify="center" xs={12}>
          <Grid item style={isEdit ? (siteEdit.whatsapp ? null : { display: "none" }) : (siteView.whatsapp ? null : { display: "none" })}>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.whatsapp : siteView.whatsapp}
            >
              <FontAwesomeIcon icon={faWhatsapp} color="white" size="2x" />
            </IconButton>
          </Grid>

          <Grid item style={isEdit ? (siteEdit.instagram ? null : { display: "none" }) : (siteView.instagram ? null : { display: "none" })}>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.instagram : siteView.instagram}
            >
              <FontAwesomeIcon icon={faInstagram} color="white" size="2x" />
            </IconButton>
          </Grid>

          <Grid item style={isEdit ? (siteEdit.youtube ? null : { display: "none" }) : (siteView.youtube ? null : { display: "none" })}>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.youtube : siteView.youtube}
            >
              <FontAwesomeIcon icon={faYoutube} color="white" size="2x" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  siteEdit: state.site.siteEdit
});

export default connect(mapStateToProps, null)(Footer);
