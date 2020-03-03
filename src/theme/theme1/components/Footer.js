import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView
    } = this.props;
    return (
      <Grid container style={{ backgroundColor: "#212121", marginTop: 50 }}>
        <Grid container item xs={12} justify="center">
          <IconButton aria-label="" color="primary" href={isEdit ? siteEdit.url : siteView.url}>
            <FontAwesomeIcon icon={faFacebook} color="white" size="2x" />
          </IconButton>
        </Grid>
        <Grid container item xs={12} justify="center">
          <p style={{ color: "white" }}>@{isEdit ? siteEdit.title : siteView.title}</p>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  siteEdit: state.site.siteEdit,
});

export default connect(mapStateToProps, null)(Footer);
