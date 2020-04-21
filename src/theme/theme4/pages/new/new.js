import { Grid, Typography, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import NewsType from "../../components/newsType";
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
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 36,
        lineHeight: "1.4em",
        fontWeight: "bold",
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20,
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
      },
    });
    const classes = useStyles();

    return (
      <Grid container justify="center">
        {homeTitle && (
          <Grid
            container
            alignItems="center"
            item
            sm={10}
            xs={10}
            style={{ padding: "2rem 0" }}
          >
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: isEdit ? titleEdit.color : titleView.color,
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
            <Grid item xs={6} sm={4} style={classes.changableTitle}>
              {homeTitle}
            </Grid>
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: isEdit ? titleEdit.color : titleView.color,
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
          </Grid>
        )}
        <Grid item sm={12} xs={12} container style={{ padding: "2.5rem 0" }}>
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container>
                <NewsType
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
                <Grid container justify="center">
                  <Typography style={classes.changableBody2}>
                    Currently there are no news.
                </Typography>
                </Grid>
              )
          ) : siteView && siteView.posts ? (
            <Grid container>
              <NewsType
                key={siteEdit.limitNews}
                fromHome={fromHome}
                posts={siteView.posts.filter(function (pos) {
                  return pos.isActive === true;
                })}
                pageCount={Math.ceil(
                  siteView.posts.filter(function (pos) {
                    return pos.isActive === true;
                  }).length / siteView.limitNews
                )}
                bgWhite={true}
                siteInfo={{
                  logo: siteView.logo,
                  title: siteView.title,
                  sitePath: siteView.sitePath,
                }}
                postView={postView}
              />
            </Grid>
          ) : (
                <Grid container justify="center">
                  <Typography style={classes.changableBody2}>
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
