import { Grid, Typography, CardMedia, Divider } from "@material-ui/core";
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

  isShowStory = () => {
    const { isEdit, siteEdit, siteView } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.showDetailSetting.showStory) {
        if (siteEdit.story && siteEdit.story.title) {
          return true;
        }
      }
    } else if (siteView && siteView.showDetailSetting.showStory) {
      if (siteView.story && siteView.story.title) {
        return true;
      }
    }
    return false;
  };

  isShowAboutDes = () => {
    const { isEdit, siteEdit, siteView } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.showDetailSetting.showAboutDescription) {
        return true;
      }
    } else if (siteView && siteView.showDetailSetting.showAboutDescription) {
      return true;
    }
    return false;
  };

  isShowAboutLogo = () => {
    const { isEdit, siteEdit, siteView } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.showDetailSetting.showAboutLogo) {
        return true;
      }
    } else if (siteView && siteView.showDetailSetting.showAboutLogo) {
      return true;
    }
    return false;
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
      showTitle,
      fromHome,
    } = this.props;
    return (
      <Grid container justify="center" className={styles.about_page}>
        {showTitle ? (
          <Grid item sm={10} xs={10}>
            <Typography
              className={styles.title}
              variant="h4"
              align="center"
              style={{
                fontFamily: isEdit
                  ? titleEdit.fontFamily
                  : titleView.fontFamily,
                color: "white",
                letterSpacing: "0.2rem",
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
          </Grid>
        ) : (
            <></>
          )}
        {fromHome ? (
          <Grid container item sm={10} xs={10} justify="center">
            <Typography
              variant="body1"
              color="textPrimary"
              style={{
                color: "white",
                fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
                fontWeight: 700,
                fontSize: 30,
                fontStyle: "italic",
                textAlign: "center",
                whiteSpace: "pre-wrap",
              }}
            >
              {isEdit
                ? siteEdit && siteEdit.about
                  ? siteEdit.about
                  : "Welcome to our website! Take a look around and feel free to contact us for more information."
                : siteView && siteView.about
                  ? siteView.about
                  : "Welcome to our website! Take a look around and feel free to contact us for more information."}
            </Typography>
          </Grid>
        ) : (
            (this.isShowAboutDes() || this.isShowAboutLogo()) && (
              <Grid container justify="center" className={styles.about_page}>
                <Grid
                  container
                  item
                  sm={6}
                  xs={10}
                  justify="center"
                  style={{
                    // marginTop: "2.5rem",
                    display: this.isShowAboutDes() ? "inline-block" : "flex",
                  }}
                >
                  <CardMedia
                    style={{
                      width: this.isShowAboutDes() ? "30%" : "40%",
                      float: "left",
                      display: this.isShowAboutLogo() ? "block" : "none",
                    }}
                    component="img"
                    alt=""
                    image={this.renderImage()}
                  />
                  {this.isShowAboutDes() && (
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        fontWeight: 400,
                        color: "white",
                        textAlign: "justify",
                        fontSize: 16,
                        whiteSpace: "pre-wrap",
                        hyphens: "auto",
                      }}
                    >
                      {isEdit
                        ? siteEdit && siteEdit.about
                          ? siteEdit.about
                          : "Welcome to our website! Take a look around and feel free to contact us for more information."
                        : siteView && siteView.about
                          ? siteView.about
                          : "Welcome to our website! Take a look around and feel free to contact us for more information."}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )
          )}
        {!fromHome && this.isShowStory() && (
          <>
            <Grid
              container
              item
              sm={10}
              xs={10}
              justify="center"
              style={
                {
                  // marginTop: !fromHome ? "2.5rem" : 0
                }
              }
            >
              <Typography
                style={{
                  fontFamily: isEdit
                    ? bodyEdit.fontFamily
                    : bodyView.fontFamily,
                  fontWeight: 900,
                  color: "#fff",
                  textAlign: "left",
                  fontSize: 24,
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
                // marginBottom: !fromHome ? "2.5rem" : 0,
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
                  color: "#fff",
                  fontSize: 16,
                  textAlign: "justify",
                  hyphens: "auto",
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
  newLogo: state.site.newLogo,
});

export default connect(mapStateToProps, null)(AboutPage);
