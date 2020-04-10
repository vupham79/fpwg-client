import { CardMedia, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./about.module.css";

class AboutPage extends React.Component {
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };

  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteEdit,
      siteView,
      fromHome,
    } = this.props;
    return (
      <Grid container justify="center" className={styles.about_page}>
        {!fromHome && (
          <Grid
            item
            container
            justify={"center"}
            alignItems={"center"}
            sm={12}
            xs={12}
            className={styles.about_title}
          >
            <>
              <Typography
                className={styles.title}
                variant="h4"
                align="center"
                style={{
                  fontFamily: isEdit
                    ? titleEdit.fontFamily
                    : titleView.fontFamily,
                  fontWeight: 500,
                  color: isEdit ? siteEdit.color : siteView.color,
                  textAlign: "center",
                  fontSize: 28,
                }}
              >
                {isEdit
                  ? siteEdit &&
                  siteEdit.navItems.map((item) => {
                    if (item.original === "about") {
                      return item.name;
                    } else return "";
                  })
                  : siteView &&
                  siteView.navItems.map((item) => {
                    if (item.original === "about") {
                      return item.name;
                    } else return "";
                  })}
              </Typography>
            </>
          </Grid>
        )}
        <Grid
          container
          item
          sm={fromHome ? 10 : 6}
          xs={10}
          justify="center"
          style={{
            marginTop: "2.5rem",
            marginBottom: fromHome ? "2.5rem" : 0,
          }}
        >
          <Typography
            variant="body1"
            color="textPrimary"
            style={{
              fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
              fontWeight: 400,
              color: "#151515",
              fontSize: fromHome ? 20 : 16,
            }}
          >
            <CardMedia
              component="img"
              alt=""
              image={this.renderImage()}
              style={{
                width: "30%",
                float: "left",
                marginRight: "1rem",
                display: fromHome ? "none" : (isEdit ? (this.props.siteEdit.showDetailSetting.showAboutLogo ? "inline-block" : "none") : (this.props.siteView.showDetailSetting.showAboutLogo ? "inline-block" : "none")),
              }}
            />
            <p style={{ display: isEdit ? (this.props.siteEdit.showDetailSetting.showAboutDescription ? "block" : "none") : (this.props.siteView.showDetailSetting.showAboutDescription ? "block" : "none") }}>
              {isEdit
                ? siteEdit && siteEdit.about
                  ? siteEdit.about.split("\n").map((val, index) => (
                    <React.Fragment key={index}>
                      {val}
                      <br />
                    </React.Fragment>
                  ))
                  : "Welcome to our website! Take a look around and feel free to contact us for more information."
                : siteView && siteView.about
                  ? siteView.about.split("\n").map((val, index) => (
                    <React.Fragment key={index}>
                      {val}
                      <br />
                    </React.Fragment>
                  ))
                  : "Welcome to our website! Take a look around and feel free to contact us for more information."}
            </p>
          </Typography>
        </Grid>

        {/* <Grid
          container
          item
          sm={4}
          xs={10}
          justify="center"
          style={{ marginTop: "2.5rem" }}
        >
        </Grid> */}
        {!fromHome && (
          <>
            <Grid
              container
              item
              sm={10}
              xs={10}
              justify="center"
              style={{ marginTop: !fromHome ? "2.5rem" : 0, display: isEdit ? (this.props.siteEdit.showDetailSetting.showStory ? "block" : "none") : (this.props.siteView.showDetailSetting.showStory ? "block" : "none") }}
            >
              <Typography
                style={{
                  fontFamily: isEdit
                    ? bodyEdit.fontFamily
                    : bodyView.fontFamily,
                  fontWeight: 900,
                  color: "#151515",
                  textAlign: "left",
                  fontSize: 20,
                }}
              >
                {isEdit
                  ? siteEdit && siteEdit.story && siteEdit.story.title
                  : siteView && siteView.story && siteView.story.title}
              </Typography>
            </Grid>
            <Grid
              container
              item
              sm={6}
              xs={10}
              justify="center"
              style={{
                marginTop: !fromHome ? "2.5rem" : 0,
                marginBottom: !fromHome ? "2.5rem" : 0,
              }}
            >
              <Typography
                variant="body1"
                color="textPrimary"
                style={{
                  fontFamily: isEdit
                    ? bodyEdit.fontFamily
                    : bodyView.fontFamily,
                  fontWeight: 400,
                  color: "#151515",
                  fontSize: 16,
                }}
              >
                {isEdit
                  ? siteEdit &&
                  siteEdit.story &&
                  siteEdit.story.composedText &&
                  siteEdit.story.composedText.map((text) => {
                    const originalText = text.split("\n");
                    return originalText.map((val, index) => (
                      <React.Fragment key={index}>
                        {val}
                        <br />
                      </React.Fragment>
                    ));
                  })
                  : siteView &&
                  siteView.story &&
                  siteView.story.composedText &&
                  siteView.story.composedText.map((text) => {
                    const originalText = text.split("\n");
                    return originalText.map((val, index) => (
                      <React.Fragment key={index}>
                        {val}
                        <br />
                      </React.Fragment>
                    ));
                  })}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(AboutPage);
