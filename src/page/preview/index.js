import React from "react";
import { themes as themesConstant } from "../../constant/constant";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
class PreViewSite extends React.Component {
  render() {
    const { siteEdit } = this.props;

    if (siteEdit) {
      return themesConstant.find(e => e.id === siteEdit.theme._id).component;
    }
    return (
      <Grid container justify="center">
        <h1 style={{ color: "red" }}>404 Not Found</h1>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreViewSite)
);
