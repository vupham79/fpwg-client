import React, { Component } from "react";
import { Grid, IconButton } from "@material-ui/core";
import SiteBarEditor from "../component/SideBarEditor";
import { connect } from "react-redux";
import { setPreviewMode } from "../actions";
import {
  faArrowCircleLeft,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <Grid
              container
              item
              sm={12}
              xs={12}
              justify="center"
              style={{ background: "black" }}
            >
              <Grid
                item
                xs={12}
                style={{
                  background: "white",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  height: "100vh"
                }}
              >
                {this.props.children}
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              item
              sm={9}
              xs={12}
              justify="center"
              style={{ background: "black" }}
            >
              <Grid
                item
                xs={12}
                style={{
                  background: "white",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  height: "100vh"
                }}
              >
                {this.props.children}
              </Grid>
            </Grid>
          )}

          <IconButton
            onClick={() => this.props.setPreviewMode(!this.props.isPreview)}
            style={{ position: "fixed", bottom: 0, zIndex: 9999 }}
          >
            <FontAwesomeIcon
              icon={
                this.props.isPreview ? faArrowCircleRight : faArrowCircleLeft
              }
              color="#0074aa"
              size="xs"
            />
          </IconButton>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isPreview: state.site.isPreview
});

const mapDispatchToProps = dispatch => ({
  setPreviewMode: bool => dispatch(setPreviewMode(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLayout);
