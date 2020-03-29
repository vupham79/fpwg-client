import { Divider, Grid, Typography, withStyles } from "@material-ui/core";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import EmailIcon from "@material-ui/icons/Email";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";
const useStyle = theme => ({
  root: {
    paddingTop: "5rem"
  }
});

class ContactPage extends React.Component {
  render() {
    const {
      isEdit,
      titleEdit,
      bodyEdit,
      titleView,
      bodyView,
      siteView,
      fromHome,
      homeTitle,
      classes,
      phone,
      email,
      address
    } = this.props;

    return (
      <Grid container justify="center" className={styles.contact_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom
            className={styles.title}
            style={isEdit ? titleEdit : titleView}
          >
            {fromHome ? homeTitle : "Contact"}
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        <Grid item xs={11} container justify="center" className={classes.root}>
          <Grid
            container
            item
            xs={12}
            sm={10}
            md={7}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2} sm={1} md={1}>
              <AddLocationIcon fontSize="large" />
            </Grid>
            <Grid item xs={4} md={5}>
              <p
                className={styles.child_title}
                style={isEdit ? bodyEdit : bodyView}
              >
                Address
              </p>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                className={styles.child_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                {isEdit
                  ? address
                    ? address
                    : "Currently no data"
                  : siteView && siteView.address
                  ? siteView.address
                  : "Currently no data"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={10}
            md={7}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2} sm={1} md={1}>
              <LocalPhoneIcon fontSize="large" />
            </Grid>
            <Grid item xs={4} md={5}>
              <p
                className={styles.child_title}
                style={isEdit ? bodyEdit : bodyView}
              >
                Phone
              </p>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                className={styles.child_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                {isEdit
                  ? phone
                    ? phone
                    : "Currently no data"
                  : siteView && siteView.phone
                  ? siteView.phone
                  : "Currently no data"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={10}
            md={7}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={2} sm={1} md={1}>
              <EmailIcon fontSize="large" />
            </Grid>
            <Grid item xs={4} md={5}>
              <p
                className={styles.child_title}
                style={isEdit ? bodyEdit : bodyView}
              >
                Email
              </p>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                className={styles.child_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                {isEdit
                  ? email
                    ? email
                    : "Currently no data"
                  : siteView && siteView.email
                  ? siteView.email
                  : "Currently no data"}
              </Typography>
            </Grid>
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
  bodyView: state.site.bodyView,
  profile: state.user.profile,
  phone: state.site.phone,
  email: state.site.email,
  address: state.site.address
});

export default connect(
  mapStateToProps,
  null
)(withStyles(useStyle)(ContactPage));
