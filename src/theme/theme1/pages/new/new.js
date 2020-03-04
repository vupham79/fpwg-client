import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Moment from 'react-moment';
import { Carousel } from "react-responsive-carousel";

class Theme1News extends React.Component {
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      posts,
      bodyEdit,
      bodyView
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
      centerItem3: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        backgroundColor: "white"
      },
    });
    const classes = useStyles();

    return (
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle2}>
            <span style={classes.changableFirst2}>N</span>EWS
          </p>
        </Grid>
        {!posts && (
          <Grid item xs={12}>
            <p style={classes.changableBody3}>Currently there are no news.</p>
          </Grid>
        )}
        {posts && posts.length === 0 && (
          <Grid item xs={12}>
            <p style={classes.changableBody3}>Currently there are no news.</p>
          </Grid>
        )}
        {posts && posts.length > 0 && (
          <Grid item xs={12}>
            <Carousel
              showArrows={true}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
              autoPlay={false}
              stopOnHover={true}
              infiniteLoop={false}
            >
              {posts && posts.map((row) => (
                <Grid item xs={12} style={classes.centerItem3} key={row.id}>
                  <img
                    src={row.attachments.images[0]}
                    alt=""
                    style={{ height: 200, width: 200 }}
                  />
                  <p style={classes.changableTitle2}>
                    <Moment format="MMMM">{row.createdTime}</Moment> <span style={classes.changableFirst2}><Moment format="DD">{row.createdTime}</Moment> </span>, <Moment format="YYYY">{row.createdTime}</Moment>
                  </p>
                  <p style={classes.changableBody3}>
                    {row.message ? row.message : ""}
                  </p>
                  <p style={classes.changableLink}>Read more...</p>
                </Grid>
              ))}
            </Carousel>
          </Grid>
        )}
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
