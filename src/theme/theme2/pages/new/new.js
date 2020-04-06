import { Grid, Typography, Divider } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./new.module.css";
import PostTypeComponent from "../../../component/postsType";

class NewPage extends Component {
  state = {
    itemPerPage: 5,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteView,
      siteEdit,
      bodyEdit,
      bodyView,
      fromHome,
      homeList,
      homeTitle,
      postView,
    } = this.props;
    return (
      <Grid container justify="center" className={styles.news}>
        <Grid container item sm={10} xs={10} justify="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="textSecondary"
              align="center"
              gutterBottom
              className={styles.title}
              style={{
                fontFamily: isEdit
                  ? titleEdit.fontFamily
                  : titleView.fontFamily,
                fontWeight: 500,
                color: isEdit ? titleEdit.color : titleView.color,
                textAlign: "center",
                fontSize: 28,
                paddingBottom: 20,
              }}
            >
              {fromHome ? homeTitle : "News"}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Divider variant="fullWidth" />
          </Grid>
        </Grid>
        <Grid item sm={12} xs={12} container spacing={3}>
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container>
                <PostTypeComponent
                  fromHome={fromHome}
                  posts={fromHome && homeList ? homeList : siteEdit.posts}
                  pageCount={Math.ceil(
                    (fromHome && homeList ? homeList : siteEdit.posts).length /
                      this.state.itemPerPage
                  )}
                  itemPerPage={this.state.itemPerPage}
                  bgWhite={true}
                />
              </Grid>
            ) : (
              <Grid
                container
                justify="center"
                style={{ minHeight: "30vh", marginTop: "10vh" }}
              >
                <Typography variant="body1" style={bodyEdit}>
                  Currently there are no news.
                </Typography>
              </Grid>
            )
          ) : (siteView && siteView.posts) || (fromHome && homeList) ? (
            <Grid container>
              <PostTypeComponent
                fromHome={fromHome}
                posts={fromHome && homeList ? homeList : siteView.posts}
                siteInfo={{
                  logo: siteView.logo,
                  title: siteView.title,
                  sitePath: siteView.sitePath,
                }}
                bgWhite={true}
                postView={postView}
              />
            </Grid>
          ) : (
            <Grid
              container
              justify="center"
              style={{ minHeight: "30vh", marginTop: "10vh" }}
            >
              <Typography variant="body1" style={bodyView}>
                Currently there are no news.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(NewPage);
