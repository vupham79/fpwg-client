import { Divider, Grid, Typography, withStyles } from "@material-ui/core";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import EmailIcon from "@material-ui/icons/Email";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";
const useStyle = theme => ({
  root: {
    padding: "5rem 0"
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
      siteEdit,
      siteView,
      fromHome,
      homeTitle,
      classes,
      phone,
      email
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
        <Grid item xs={8} container justify="center" className={classes.root}>
          <Grid container item xs={10} justify="flex-start">
            <Grid item xs={1}>
              <AddLocationIcon fontSize="large" />
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                className={styles.child_title}
                style={isEdit ? bodyEdit : bodyView}
              >
                Address
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                className={styles.child_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                {isEdit
                  ? siteEdit && siteEdit.address
                    ? siteEdit.address
                    : "Currently no data"
                  : siteView && siteView.address
                  ? siteView.address
                  : "Currently no data"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={10} justify="flex-start">
            <Grid item xs={1}>
              <LocalPhoneIcon fontSize="large" />
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                className={styles.child_title}
                style={isEdit ? bodyEdit : bodyView}
              >
                Phone
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                className={styles.child_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                {isEdit
                  ? phone && phone
                    ? phone
                    : "Currently no data"
                  : siteView && siteView.phone
                  ? siteView.phone
                  : "Currently no data"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={10} justify="flex-start">
            <Grid item xs={1}>
              <EmailIcon fontSize="large" />
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                className={styles.child_title}
                style={isEdit ? bodyEdit : bodyView}
              >
                Email
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                className={styles.child_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                {isEdit
                  ? email && email
                    ? email
                    : "Currently no data"
                  : siteView && siteView.mail
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
  email: state.site.email
});

export default connect(
  mapStateToProps,
  null
)(withStyles(useStyle)(ContactPage));
