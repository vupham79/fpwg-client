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
      <Grid
        container
        justify="center"
        className={styles.news}
        style={{
          marginBottom: fromHome && "0",
          minHeight: !fromHome && "80vh",
        }}
      >
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          item
          sm={12}
          xs={12}
          className={styles.news_title}
          style={{
            height: fromHome ? "6rem" : "8rem",
          }}
        >
          <Grid item>
            <Typography
              variant="h4"
              color="textSecondary"
              align="center"
              className={styles.title}
              style={{
                fontFamily: isEdit
                  ? titleEdit.fontFamily
                  : titleView.fontFamily,
                fontWeight: "bold",
                color: isEdit ? siteEdit.color : siteView.color,
                textAlign: "center",
                fontSize: 28,
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
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          container
          justify="center"
          // spacing={2}
          style={{
            marginTop: "2.5rem",
            marginBottom: "2.5rem",
            minHeight: !fromHome && "55vh",
          }}
        >
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container>
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
                  bgWhite={true}
                />
              </Grid>
            ) : (
                <Grid
                  container
                  justify="center"
                  style={{
                    minHeight: "30vh",
                    //  marginTop: "10vh"
                  }}
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
