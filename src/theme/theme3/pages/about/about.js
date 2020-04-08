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
          <Grid container justify="center" className={styles.about_page}>
            <Grid container item sm={3} xs={5} justify="center">
              <CardMedia component="img" alt="" image={this.renderImage()} />
            </Grid>

            <Grid
              container
              item
              sm={10}
              xs={10}
              justify="center"
              style={{ marginTop: 50 }}
            >
              <Typography
                variant="body1"
                color="textPrimary"
                style={{
                  fontFamily: isEdit
                    ? titleEdit.fontFamily
                    : titleView.fontFamily,
                  fontWeight: 400,
                  color: "white",
                  textAlign: "left",
                  fontSize: 16,
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
          </Grid>
        )}
        {!fromHome && (
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
