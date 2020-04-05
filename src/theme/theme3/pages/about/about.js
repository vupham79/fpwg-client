import { Grid, Typography, CardMedia } from "@material-ui/core";
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
      fromHome
    } = this.props;
    return (
      <Grid container justify="center" className={styles.about_page}>
        {showTitle ? (
          <Grid item sm={10} xs={10}>
            <Typography
              className={styles.title}
              variant="h4"
              align="center"
              gutterBottom
              style={{
                fontFamily: isEdit
                  ? titleEdit.fontFamily
                  : titleView.fontFamily,
                color: "white"
              }}
            >
              About
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
                fontStyle: "italic"
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
                <CardMedia
                  component="img"
                  alt=""
                  image={this.renderImage()}
                />
              </Grid>

              <Grid container item sm={10} xs={10} justify="center" style={{ marginTop: 50 }}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  style={{
                    fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
                    fontWeight: 400,
                    color: "white",
                    textAlign: "left",
                    fontSize: 16,
                    paddingBottom: 20,
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
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(AboutPage);
