import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SiteBarEditor from "../component/SideBarEditor";

class EditLayout extends Component {
  render() {
    return (
      <>
        <Grid container>
          {!this.props.isPreview && (
            <Grid item sm={3} xs={12}>
              <SiteBarEditor />
            </Grid>
          )}
          {this.props.isPreview ? (
            <Grid item sm={12} xs={12}>
              {this.props.children}
            </Grid>
          ) : (
            <Grid item sm={9} xs={12}>
              {this.props.children}
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isPreview: state.site.isPreview
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditLayout);
