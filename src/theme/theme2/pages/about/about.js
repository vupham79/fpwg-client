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
    const isShowStory = () => {
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
    const isShowAboutDes = () => {
      if (isEdit) {
        if (siteEdit && siteEdit.showDetailSetting.showAboutDescription) {
          return true;
        }
      } else if (siteView && siteView.showDetailSetting.showAboutDescription) {
        return true;
      }
      return false;
    };
    const isShowAboutLogo = () => {
      if (isEdit) {
        if (siteEdit && siteEdit.showDetailSetting.showAboutLogo) {
          return true;
        }
      } else if (siteView && siteView.showDetailSetting.showAboutLogo) {
        return true;
      }
      return false;
    };
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
        {(isShowAboutDes() || isShowAboutLogo()) && (
          <Grid
            container
            item
            sm={fromHome ? 10 : 6}
            xs={10}
            justify="center"
            style={{
              marginTop: "2.5rem",
              marginBottom: fromHome || !isShowStory() ? "2.5rem" : 0,
              minHeight: !fromHome && !isShowStory() && "55vh",
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
                  width: !isShowAboutDes() ? "100%" : "30%",
                  float: "left",
                  marginRight: "1rem",
                  display: fromHome
                    ? "none"
                    : isShowAboutLogo()
                      ? "inline-block"
                      : "none",
                }}
              />
              <p
                style={{
                  display: isShowAboutDes() ? "block" : "none",
                  margin: "0",
                  whiteSpace: "break-spaces",
                  textAlign: "justify",
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
              </p>
            </Typography>
          </Grid>
        )}

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
              style={{
                marginTop: !fromHome ? "2.5rem" : 0,
                display: isShowStory() ? "block" : "none",
              }}
            >
              <Typography
                style={{
                  fontFamily: isEdit
                    ? bodyEdit.fontFamily
                    : bodyView.fontFamily,
                  fontWeight: 900,
                  color: "#151515",
                  textAlign: "center",
                  fontSize: 20,
                  whiteSpace: "break-spaces",
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
                display: isShowStory() ? "block" : "none",
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
                  whiteSpace: "break-spaces",
                  textAlign: "justify",
                  hyphens: "auto",
                }}
              >
                {isEdit
                  ? siteEdit && siteEdit.story && siteEdit.story.composedText
                  : siteView && siteView.story && siteView.story.composedText}
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
