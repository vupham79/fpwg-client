import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import PostTypeComponent from "../../../component/postsType";

class Theme1News extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteView,
      siteEdit,
      fromHome,
      homeTitle,
      homeList,
      postView,
    } = this.props;

    const useStyles = () => ({
      changableLink: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20,
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20,
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20,
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        fontSize: 16,
        textAlign: "justify",
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color,
      },
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20,
        textTransform: "uppercase",
      },
    });
    const classes = useStyles();
    return (
      <Grid container style={{ minHeight: "50vh" }}>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>
              {fromHome ? homeTitle.charAt(0) : "N"}
            </span>
            {fromHome ? homeTitle.substring(1) : "EWS"}
          </p>
        </Grid>
        <Grid item xs={12} container>
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container>
                <PostTypeComponent
                  key={siteEdit.limitNews}
                  fromHome={fromHome}
                  posts={
                    (fromHome && homeList ? homeList : siteEdit.posts).filter(function (pos) {
                      let type = pos.attachments ? pos.attachments.media_type : "";
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
                      return pos.isActive === true && show;
                    })
                  }
                  pageCount={Math.ceil(
                    (fromHome && homeList ? homeList : siteEdit.posts).filter(function (pos) {
                      let type = pos.attachments ? pos.attachments.media_type : "";
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
                      return pos.isActive === true && show;
                    }).length /
                    siteEdit.limitNews
                  )}
                  bgWhite={true}
                />
              </Grid>
            ) : (
                <Grid container justify="center">
                  <Typography className={classes.changableBody}>
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
                <Grid container justify="center">
                  <Typography className={classes.changableBody}>
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
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(Theme1News);
