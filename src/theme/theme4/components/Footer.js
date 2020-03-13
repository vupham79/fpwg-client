import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton, Divider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faWhatsapp,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  render() {
    const { isEdit, siteEdit, siteView, bodyEdit, bodyView, titleEdit, titleView } = this.props;

    return (
      <Grid
        container
        style={{
          backgroundColor: "white",
          marginTop: 50,
          height: 300,
          postion: "absolute",
          bottom: 0
        }}
      >

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid container item direction="row" justify="center" xs={12}>

          <Grid item>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.url : siteView.url}
            >
              <FontAwesomeIcon icon={faFacebook} color={isEdit ? titleEdit.color : titleView.color} size="1x" />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.whatsapp : siteView.whatsapp}
            >
              <FontAwesomeIcon icon={faWhatsapp} color={isEdit ? titleEdit.color : titleView.color} size="1x" />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.instagram : siteView.instagram}
            >
              <FontAwesomeIcon icon={faInstagram} color={isEdit ? titleEdit.color : titleView.color} size="1x" />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton
              aria-label=""
              color="primary"
              href={isEdit ? siteEdit.youtube : siteView.youtube}
            >
              <FontAwesomeIcon icon={faYoutube} color={isEdit ? titleEdit.color : titleView.color} size="1x" />
            </IconButton>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Divider style={{ color: "#d8d8d8" }} />
        </Grid>

        <Grid container item xs={12}>
          <p style={{ color: "#5e5e5e", fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily, fontSize: 14, marginLeft: 50 }}>
            @{isEdit ? siteEdit.title : siteView.title}
          </p>
        </Grid>

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  siteEdit: state.site.siteEdit,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
});

export default connect(mapStateToProps, null)(Footer);
