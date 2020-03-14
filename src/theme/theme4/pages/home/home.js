import { Grid, Typography, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PostTypeComponent from "../../../component/postsType";

class Theme1Home extends React.Component {
  state = {
    anchorEl: null
  };
  setAnchorEl = anchorEl => {
    this.setState({
      anchorEl: anchorEl
    });
  };
  handleMenuClick = event => {
    this.setAnchorEl(event.currentTarget);
  };
  handleMenuClose = () => {
    this.setAnchorEl(null);
  };
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };
  renderLogo = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return (
          <img
            style={{ height: "50vh" }}
            src={URL.createObjectURL(newLogo)}
            alt=""
          />
        );
      } else
        return <img style={{ height: "50vh" }} src={siteEdit.logo} alt="" />;
    }
    return <img style={{ height: "50vh" }} src={siteView.logo} alt="" />;
  };
  renderCover = () => {
    const { isEdit, siteEdit, siteView } = this.props;
    if (isEdit) {
      return (
        siteEdit.cover &&
        siteEdit.cover.map((cover, i) => <img src={cover} key={i} alt="" />)
      );
    } else {
      return (
        siteView.cover &&
        siteView.cover.map((cover, i) => <img src={cover} key={i} alt="" />)
      );
    }
  };
  renderNewCovers = () => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return <img src={URL.createObjectURL(cover)} alt="" key={index} />;
          } else return <img src={cover} alt="" key={index} />;
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <img src={cover} alt="" key={i} />
        ));
      }
    }
  };
  render() {
    const {
      siteEdit,
      isEdit,
      titleView,
      titleEdit,
      siteView,
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
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#b3b2b2",
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
        color: "#b3b2b2",
        textAlign: "center",
        fontSize: 19,
        fontWeight: 300,
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#b3b2b2",
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
      changableLegend: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "white",
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "40%",
        fontSize: 80,
        textAlign: "center"
      },
      greyDiv: {
        backgroundColor: "#e1ede4",
        textAlign: "center",
        color: "#535353",
        fontSize: 20
      },
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 10
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
      },
      centerItem3: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        backgroundColor: "white"
      },
      changableAppBar: {
        backgroundColor: "white",
        opacity: 0.6,
        position: "sticky",
        color: "#535353",
        textAlign: "right"
      }
    });
    const classes = useStyles();
    const { posts } = this.props;

    return (

      <Grid container style={{ backgroundColor: "#1a1919", paddingBottom: 100 }}>

        <Grid item xs={12}>
          <Slider fade speed={2000} autoplay>{this.renderNewCovers()}</Slider>
        </Grid>

        {/* <Grid item xs={12}>
          <p style={classes.changableTitle}>
            NEWS
          </p>
        </Grid> */}

        <Grid item xs={12} style={{ minHeight: 200, paddingTop: 50 }}>
          <p style={classes.changableBody3}>
            {isEdit && siteEdit && siteEdit.about}
            {!isEdit && siteView && siteView.about}
            {isEdit && !siteEdit.about && "Welcome to our website!"}
            {!isEdit && !siteView.about && "Welcome to our website!"}
          </p>
        </Grid>

        <Grid item xs={12}>
          <Divider style={{ backgroundColor: "#b3b2b2" }} />
        </Grid>

        <Grid item sm={12} xs={12} container style={{ minHeight: 200, backgroundColor: "white" }}>
          {isEdit ? (
            posts ? (
              <Grid container>
                <PostTypeComponent posts={posts} />
              </Grid>
            ) : (
                <Grid container justify="center">
                  <Typography variant="body1">
                    Currently there are no news.
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
                  <Typography variant="body1">Currently there are no news.</Typography>
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
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover
});

export default connect(mapStateToProps, null)(Theme1Home);
