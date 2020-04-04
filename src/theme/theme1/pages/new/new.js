import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import PostTypeComponent from "../../../component/postsType";

class Theme1News extends React.Component {
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
      homeList
    } = this.props;

    const useStyles = () => ({
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        fontSize: 16,
        textAlign: "justify"
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color
      },
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20,
        textTransform: "uppercase"
      }
    });
    const classes = useStyles();

    return (
      <Grid container style={{ minHeight: "50vh" }}>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>{fromHome ? homeTitle.charAt(0) : "N"}</span>{fromHome ? homeTitle.substring(1) : "EWS"}
          </p>
        </Grid>
        <Grid item sm={12} xs={12} container spacing={3}>
          {isEdit ? (
            siteEdit && siteEdit.posts ? (
              <Grid container>
                <PostTypeComponent
                  fromHome={fromHome}
                  posts={(fromHome && homeList) ? homeList : siteEdit.posts}
                  siteInfo={{
                    logo: siteEdit.logo,
                    title: siteEdit.title,
                    id: siteEdit.id
                  }}
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
                posts={(fromHome && homeList) ? homeList : siteView.posts}
                siteInfo={{
                  logo: siteView.logo,
                  title: siteView.title,
                  sitePath: siteView.sitePath
                }}
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

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(Theme1News);
