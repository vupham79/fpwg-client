import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./new.module.css";
import PostTypeComponent from "../../../component/postsType";

class NewPage extends Component {
  render() {
    const { isEdit, titleEdit, titleView, siteView, posts } = this.props;
    return (
      <Grid container style={{ marginBottom: "5rem" }}>
        <Grid
          item
          sm={12}
          xs={12}
          className={styles.title}
          style={isEdit ? titleEdit : titleView}
        >
          News
        </Grid>
        <Grid item sm={12} xs={12} container spacing={3}>
          {isEdit ? (
            posts ? (
              <Grid container>
                <PostTypeComponent posts={posts} />
              </Grid>
            ) : (
              <Grid container justify="center">
                <Typography variant="body1">
                  You don't have any news.
                </Typography>
              </Grid>
            )
          ) : siteView ? (
            siteView.posts && (
              <Grid container>
                <PostTypeComponent posts={siteView.posts} />
              </Grid>
            )
          ) : (
            <Grid container justify="center">
              <Typography variant="body1">You don't have any news.</Typography>
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
  posts: state.post.posts
});

export default connect(mapStateToProps, null)(NewPage);
