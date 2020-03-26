import { Grid, Typography, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./new.module.css";
import PostTypeComponent from "../../../component/postsType";

class NewPage extends Component {
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteView,
      siteEdit,
      bodyEdit,
      bodyView
    } = this.props;
    return (
      <Grid container justify="center" className={styles.news}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom
            className={styles.title}
            style={{
              color: "white",
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily
            }}
          >
            News
          </Typography>
          <Divider style={{ backgroundColor: "white" }} variant="fullWidth" />
        </Grid>
        <Grid item sm={12} xs={12} container spacing={3}>
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container>
                <PostTypeComponent
                  posts={siteEdit.posts}
                  siteInfo={{
                    logo: siteEdit.logo,
                    title: siteEdit.title,
                    id: siteEdit.id
                  }}
                />
              </Grid>
            ) : (
              <Grid container justify="center">
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: bodyEdit.fontFamily,
                    color: "white",
                    padding: "5rem 0"
                  }}
                >
                  You don't have any news.
                </Typography>
              </Grid>
            )
          ) : siteView && siteView.posts ? (
            <Grid container>
              <PostTypeComponent
                posts={siteView.posts}
                siteInfo={{
                  logo: siteView.logo,
                  title: siteView.title,
                  sitePath: siteView.sitePath
                }}
              />
            </Grid>
          ) : (
            <Grid container justify="center">
              <Typography
                variant="body1"
                style={{
                  fontFamily: bodyView.fontFamily,
                  color: "white",
                  padding: "5rem 0"
                }}
              >
                You don't have any news.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(NewPage);
