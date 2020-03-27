import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./contact.module.css";

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
      homeTitle
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
        <Grid item xs={8} container>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              className={styles.child_title}
              style={isEdit ? bodyEdit : bodyView}
            >
              <Box lineHeight={3}>Address</Box>
            </Typography>
            <Typography
              variant="body1"
              className={styles.child_content}
              style={isEdit ? bodyEdit : bodyView}
            >
              {isEdit
                ? siteEdit && siteEdit.address
                  ? siteEdit.address
                  : "This information current are not have to show."
                : siteView && siteView.address}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h5"
              className={styles.child_title}
              style={isEdit ? bodyEdit : bodyView}
            >
              <Box lineHeight={3}>Phone</Box>
            </Typography>
            <Typography
              variant="body1"
              className={styles.child_content}
              style={isEdit ? bodyEdit : bodyView}
            >
              {isEdit
                ? siteEdit && siteEdit.phone
                  ? siteEdit.phone
                  : "This information current are not have to show."
                : siteView && siteView.phone}
            </Typography>
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
  profile: state.user.profile
});

export default connect(mapStateToProps, null)(ContactPage);
