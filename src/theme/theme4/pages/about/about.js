import { Grid, CardMedia, Typography, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

class Theme1About extends React.Component {
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
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      fromHome,
      homeTitle,
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
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20,
        lineHeight: "normal",
        letterSpacing: "normal",
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
        lineHeight: "normal",
        letterSpacing: "normal",
      },
      changableBody5: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 24,
        lineHeight: "normal",
        letterSpacing: "normal",
        paddingBottom: "2rem",
        fontWeight: "600",
      },
    });
    const classes = useStyles();
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

        <Grid
          container
          item
          xs={12}
          justify="center"
          alignContent="center"
          style={{
            padding: "2.5rem 0",
            display: isShowAboutDes() ? "contents" : "none",
          }}
        >
          <Grid item xs={11} sm={9}>
            <p style={classes.changableBody4}>
              {isEdit && siteEdit && siteEdit.about}
              {!isEdit && siteView && siteView.about}
              {isEdit && !siteEdit.about && "Welcome to our website!"}
              {!isEdit && !siteView.about && "Welcome to our website!"}
            </p>
          </Grid>

          {isEdit
            ? siteEdit &&
              siteEdit.story &&
              siteEdit.story.composedText && (
                <Grid
                  container
                  item
                  xs={12}
                  justify="center"
                  style={{
                    padding: "2rem 0",
                    display: isShowStory() ? "contents" : "none",
                  }}
                >
                  <Grid item xs={12} style={classes.changableBody5}>
                    Our Story
                  </Grid>
                  <Grid container item xs={8} sm={3}>
                    <CardMedia
                      component="img"
                      style={{ height: "100%" }}
                      image={this.renderImage()}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    sm={5}
                    alignItems="center"
                    justify="center"
                    style={{ padding: "1rem" }}
                  >
                    <Typography variant="body1" style={classes.changableBody3}>
                      {siteEdit.story.composedText.map((text) => {
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
                </Grid>
              )
            : siteView &&
              siteView.story &&
              siteView.story.composedText && (
                <Grid
                  container
                  item
                  xs={11}
                  justify="center"
                  alignItems="center"
                  style={{
                    padding: "2rem 0",
                    display: isShowStory() ? "contents" : "none",
                  }}
                >
                  <Grid item xs={12} style={classes.changableBody5}>
                    Our Story
                  </Grid>
                  <Grid container item xs={10} sm={3}>
                    <CardMedia
                      component="img"
                      style={{ height: "100%" }}
                      image={this.renderImage()}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={10}
                    sm={5}
                    style={{ padding: "1rem" }}
                  >
                    <Typography variant="body1" style={classes.changableBody3}>
                      {siteView.story.composedText.map((text) => {
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
  newLogo: state.site.newLogo,
});

export default connect(mapStateToProps, null)(Theme1About);
