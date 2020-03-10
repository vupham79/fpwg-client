import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import SiteBarEditor from "../component/SideBarEditor";
import Header from "../component/Header";
import { connect } from "react-redux";

class EditLayout extends Component {
  render() {
    return (
      <>
        <Header />
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
  isPreview: state.site.isPreview,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLayout);