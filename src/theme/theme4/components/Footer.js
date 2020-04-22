import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  IconButton,
  Divider,
  Typography,
  withStyles,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faWhatsapp,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const useStyles = (theme) => ({
  social: {
    position: "relative",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "block",
      position: "fixed",
      right: "10px",
      top: "10vh",
      height: "100%",
    },
  },
  dividerAbs: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
});
class Footer extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      youtube,
      whatsapp,
      instagram,
      classes,
    } = this.props;

    const nameStyle = {
      color: isEdit ? titleEdit.color : titleView.color,
      textAlign: "center",
      fontSize: 18,
      padding: "1.5rem",
      fonWeight: "600",
      fontStyle: "oblique",
      fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
    };

    return (
      <Grid
        container
        style={{
          padding: "2.8rem",
        }}
        justify="center"
      >
        <Grid
          container
          item
          xs={12}
          sm={6}
          style={{ textAlign: "center" }}
          justify="center"
        >
          <Grid
            // container
            item
            // justify="center"
            // xs={12}
            className={classes.social}
            style={
              {
                // position: "fixed",
                // right: "10px",
                // top: "10vh",
                // height: "100%",
              }
            }
            // spacing={3}
          >
            <Grid
              item
              style={{
                // backgroundColor: "#3873ae",
                padding: "0 0.2rem",
                margin: "0 0.5rem",
              }}
            >
              <IconButton
                style={{ height: "1rem", width: "1rem" }}
                color="primary"
                href={isEdit ? siteEdit.url : siteView.url}
                target={"_blank"}
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  color={isEdit ? titleEdit.color : titleView.color}
                  size="1x"
                />
              </IconButton>
            </Grid>

            {isEdit
              ? whatsapp && (
                  <Grid
                    item
                    style={{
                      // backgroundColor: "#00b300",
                      padding: "0 0.2rem",
                      margin: "0 0.5rem",
                    }}
                  >
                    <IconButton
                      style={{ height: "1rem", width: "1rem" }}
                      color="primary"
                      href={`https://wa.me/${
                        isEdit ? whatsapp : siteView.whatsapp
                      }`}
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        color={isEdit ? titleEdit.color : titleView.color}
                        size="1x"
                      />
                    </IconButton>
                  </Grid>
                )
              : siteView &&
                siteView.whatsapp && (
                  <Grid
                    item
                    style={{
                      // backgroundColor: "#00b300",
                      margin: "0 0.5rem",
                      padding: "0 0.2rem",
                    }}
                  >
                    <IconButton
                      style={{ height: "1rem", width: "1rem" }}
                      color="primary"
                      href={`https://wa.me/${
                        isEdit ? whatsapp : siteView.whatsapp
                      }`}
                      target={"_blank"}
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        color={isEdit ? titleEdit.color : titleView.color}
                        size="1x"
                      />
                    </IconButton>
                  </Grid>
                )}

            {isEdit
              ? youtube && (
                  <Grid
                    item
                    style={{
                      // backgroundColor: "#ff1a1a",
                      margin: "0 0.5rem",
                      padding: "0 0.2rem",
                    }}
                  >
                    <IconButton
                      style={{ height: "1rem", width: "1rem" }}
                      color="primary"
                      href={isEdit ? youtube : siteView.youtube}
                      target={"_blank"}
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        color={isEdit ? titleEdit.color : titleView.color}
                        size="1x"
                      />
                    </IconButton>
                  </Grid>
                )
              : siteView &&
                siteView.youtube && (
                  <Grid
                    item
                    style={{
                      // backgroundColor: "#ff1a1a",
                      margin: "0 0.5rem",
                      padding: "0 0.2rem",
                    }}
                  >
                    <IconButton
                      color="primary"
                      style={{ height: "1rem", width: "1rem" }}
                      href={isEdit ? youtube : siteView.youtube}
                      target={"_blank"}
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        color={isEdit ? titleEdit.color : titleView.color}
                        size="1x"
                      />
                    </IconButton>
                  </Grid>
                )}

            {isEdit
              ? instagram && (
                  <Grid
                    item
                    style={{
                      // backgroundColor: "#E1306C",
                      margin: "0 0.5rem",
                      padding: "0 0.2rem",
                    }}
                  >
                    <IconButton
                      style={{ height: "1rem", width: "1rem" }}
                      color="primary"
                      href={`https://instagram.com/${
                        isEdit ? instagram : siteView.instagram
                      }`}
                      target={"_blank"}
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        color={isEdit ? titleEdit.color : titleView.color}
                        size="1x"
                      />
                    </IconButton>
                  </Grid>
                )
              : siteView &&
                siteView.instagram && (
                  <Grid
                    item
                    style={{
                      // backgroundColor: "#E1306C",
                      margin: "0 0.5rem",
                      padding: "0 0.2rem",
                    }}
                  >
                    <IconButton
                      style={{ height: "1rem", width: "1rem" }}
                      color="primary"
                      href={`https://instagram.com/${
                        isEdit ? instagram : siteView.instagram
                      }`}
                      target={"_blank"}
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        color={isEdit ? titleEdit.color : titleView.color}
                        size="1x"
                      />
                    </IconButton>
                  </Grid>
                )}
            <div
              style={{
                borderLeft: `1px solid ${
                  isEdit ? titleEdit.color : titleView.color
                }`,
                height: "80%",
                position: "absolute",
                left: "50%",
              }}
              className={classes.dividerAbs}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={nameStyle}>
              © {isEdit ? siteEdit.title : siteView.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography
              variant="body1"
              style={{
                ...nameStyle,
                border: "1.2px solid",
                padding: "0.5rem",
                fontWeight: "bold",
              }}
            >
              POWERED BY FPWG
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  siteEdit: state.site.siteEdit,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
});

export default connect(mapStateToProps, null)(withStyles(useStyles)(Footer));
