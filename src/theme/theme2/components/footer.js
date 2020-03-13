import {
  faFacebookF,
  faInstagram,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "../../../component/link";
import styles from "./index.module.css";

const txtStyles = {
  backgroundColor: "white",
  marginTop: "5vh",
  height: "7.5vh",
  width: "85%",
  padding: "2vh 4vh"
};

class FooterPage extends Component {
  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteEdit,
      siteView
    } = this.props;
    return (
      <Grid container direction="row" className={styles.footer}>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography
            variant="h5"
            style={isEdit ? titleEdit : titleView}
            color="primary"
          >
            ABOUT
          </Typography>
          <Typography component="div" style={isEdit ? bodyEdit : bodyView}>
            Welcome to our website!
            <br />
            <br />
            Take a look around and feel free to contact us for more information.
          </Typography>
          <Divider className="divider" variant="fullWidth" />
          <Grid
            container
            item
            justify="flex-start"
            xs={12}
            style={{ marginTop: "4rem" }}
          >
            <Grid item>
              <IconButton
                aria-label=""
                color="primary"
                href={
                  isEdit ? siteEdit && siteEdit.url : siteView && siteView.url
                }
              >
                {isEdit
                  ? siteEdit &&
                    siteEdit.url && (
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        color="white"
                        size="2x"
                      />
                    )
                  : siteView &&
                    siteView.url && (
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        color="white"
                        size="2x"
                      />
                    )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                aria-label=""
                color="primary"
                href={
                  isEdit
                    ? siteEdit && siteEdit.instagram
                    : siteView && siteView.instagram
                }
              >
                {isEdit
                  ? siteEdit &&
                    siteEdit.instagram && (
                      <FontAwesomeIcon
                        icon={faInstagram}
                        color="white"
                        size="2x"
                      />
                    )
                  : siteView &&
                    siteView.instagram && (
                      <FontAwesomeIcon
                        icon={faInstagram}
                        color="white"
                        size="2x"
                      />
                    )}
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                aria-label=""
                color="primary"
                href={
                  isEdit
                    ? siteEdit && siteEdit.youtube
                    : siteView && siteView.youtube
                }
              >
                {isEdit
                  ? siteEdit &&
                    siteEdit.youtube && (
                      <FontAwesomeIcon
                        icon={faYoutube}
                        color="white"
                        size="2x"
                      />
                    )
                  : siteView &&
                    siteView.youtube && (
                      <FontAwesomeIcon
                        icon={faYoutube}
                        color="white"
                        size="2x"
                      />
                    )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography
            variant="h5"
            style={isEdit ? titleEdit : titleView}
            color="primary"
          >
            QUICK LINKS
          </Typography>
          <Grid container justify="flex-start" direction="column">
            {isEdit
              ? siteEdit.navItems.map((item, index) => (
                  <Grid
                    item
                    xs={4}
                    sm={8}
                    key={index}
                    style={{ paddingBottom: "0.7rem" }}
                  >
                    <Box
                      style={{
                        ...bodyEdit,
                        color: "white"
                      }}
                    >
                      {item.name}
                    </Box>
                  </Grid>
                ))
              : siteView.navItems.map((item, index) => (
                  <Grid
                    item
                    xs={4}
                    sm={8}
                    key={index}
                    style={{ paddingBottom: "0.7rem" }}
                  >
                    <Link
                      style={{
                        ...bodyView,
                        color: "white"
                      }}
                      to={`/${siteView.sitePath}/${item.name}`}
                    >
                      {item.name}
                    </Link>
                  </Grid>
                ))}
          </Grid>
        </Grid>
        <Grid item sm={4} xs={12} className={styles.content}>
          <Typography
            variant="h5"
            style={isEdit ? titleEdit : titleView}
            color="primary"
            className={styles.footerTitle}
          >
            SIGN UP FOR OUR NEWSLETTER
          </Typography>
          <Typography variant="body1" style={isEdit ? bodyEdit : bodyView}>
            Get exclusive updates and promotions straight to your email.
          </Typography>
          <Input
            style={txtStyles}
            variant="outlined"
            placeholder="Email"
            autoComplete="true"
            inputProps={{ "aria-label": "description" }}
          />
          <Button className={styles.btn_signUp} variant="outlined">
            Sign UP
          </Button>
        </Grid>
        <Divider className={styles.bot_divider} variant="middle" />
        <Grid item sm={12} xs={12} container className={styles.bot_footer}>
          <Grid item sm={9} container justify="flex-start">
            <Typography variant="body1">
              © {isEdit ? siteEdit.title : siteView.title}
            </Typography>
          </Grid>
          <Grid item sm={3} container justify="center">
            <Typography variant="body1">POWERED BY FPWG</Typography>
          </Grid>
        </Grid>
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

export default connect(mapStateToProps, null)(FooterPage);
