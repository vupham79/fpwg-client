import { Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import PostTypeComponent from "../../../component/postsType";
import styles from "./new.module.css";

class NewPage extends Component {
  state = {
    itemPerPage: 3,
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
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            className={styles.title}
            style={{
              color: "white",
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
              letterSpacing: "0.2rem",
            }}
          >
            {fromHome
              ? homeTitle
              : isEdit
                ? siteEdit &&
                siteEdit.navItems.map((item) => {
                  if (item.original === "news") {
                    return item.name;
                  } else return "";
                })
                : siteView &&
                siteView.navItems.map((item) => {
                  if (item.original === "news") {
                    return item.name;
                  } else return "";
                })}
          </Typography>
        </Grid>
        <Grid item container sm={12} xs={12} justify="center">
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container justify="center">
                <PostTypeComponent
                  key={siteEdit.limitNews}
                  fromHome={fromHome}
                  posts={(fromHome && homeList
                    ? homeList
                    : siteEdit.posts
                  ).filter(function (pos) {
                    let type = pos && pos.attachments ? pos.attachments.media_type : "";
                    let showPostMode = isEdit ? siteEdit.showDetailSetting.showPostMode : siteView.showDetailSetting.showPostMode;
                    let show = true;
                    if (type === "photo" && (showPostMode === 2 || showPostMode === 3)) {
                      show = false;
                    } else if (type === "video" && (showPostMode === 1 || showPostMode === 3)) {
                      show = false;
                    } else if (type === "album" && (showPostMode === 2 || showPostMode === 3)) {
                      show = false;
                    } else if (type === "" && (showPostMode === 1 || showPostMode === 2)) {
                      show = false;
                    }
                    return pos && pos.isActive === true && show;
                  })}
                  pageCount={Math.ceil(
                    (fromHome && homeList ? homeList : siteEdit.posts).filter(
                      function (pos) {
                        let type = pos && pos.attachments ? pos.attachments.media_type : "";
                        let showPostMode = isEdit ? siteEdit.showDetailSetting.showPostMode : siteView.showDetailSetting.showPostMode;
                        let show = true;
                        if (type === "photo" && (showPostMode === 2 || showPostMode === 3)) {
                          show = false;
                        } else if (type === "video" && (showPostMode === 1 || showPostMode === 3)) {
                          show = false;
                        } else if (type === "album" && (showPostMode === 2 || showPostMode === 3)) {
                          show = false;
                        } else if (type === "" && (showPostMode === 1 || showPostMode === 2)) {
                          show = false;
                        }
                        return pos && pos.isActive === true && show;
                      }
                    ).length / siteEdit.limitNews
                  )}
                  dark
                />
              </Grid>
            ) : (
                <Grid item container sm={12} xs={12} justify="center">
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: bodyEdit.fontFamily,
                      color: "white",
                      padding: "5rem 0",
                    }}
                  >
                    Currently there are no news.
                </Typography>
                </Grid>
              )
          ) : (siteView && siteView.posts) || (fromHome && homeList) ? (
            <Grid item container sm={12} xs={12} justify="center">
              <PostTypeComponent
                fromHome={fromHome}
                posts={fromHome && homeList ? homeList : siteView.posts}
                siteInfo={{
                  logo: siteView.logo,
                  title: siteView.title,
                  sitePath: siteView.sitePath,
                }}
                postView={postView}
                dark
              />
            </Grid>
          ) : (
                <Grid item container sm={12} xs={12} justify="center">
                  <Typography
                    variant="body1"
                    style={{
                      fontFamily: bodyView.fontFamily,
                      color: "white",
                      padding: "5rem 0",
                    }}
                  >
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
