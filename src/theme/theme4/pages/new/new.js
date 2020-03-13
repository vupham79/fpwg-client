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
      posts,
      bodyEdit,
      bodyView,
      siteView,
    } = this.props;

    const useStyles = () => ({
      changableLink: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20
      },
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        fontSize: 16,
        textAlign: "justify"
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "black",
        textAlign: "center",
        fontSize: 16
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "black",
        textAlign: "center",
        fontSize: 16
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color
      },
      changableFirst2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20
      },
      changableFirst5: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color
      },
      centerItem3: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        backgroundColor: "white"
      },
      changableTitle5: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20
      },
    });
    const classes = useStyles();

    return (
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle5}>
            NEWS
          </p>
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
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(Theme1News);