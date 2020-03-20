import {
  faArrowCircleLeft,
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setPreviewMode } from "../actions";
import SiteBarEditor from "../component/SideBarEditor";
import styles from "./editorStyle.module.css";

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

          <button
            onClick={() => this.props.setPreviewMode(!this.props.isPreview)}
            className={styles.glowingButton}
          >
            <FontAwesomeIcon
              icon={
                this.props.isPreview ? faArrowCircleRight : faArrowCircleLeft
              }
              color="white"
              size="2x"
            />
          </button>
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
