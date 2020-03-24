import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Box,
  TextField,
  Button
} from "@material-ui/core";
import styles from "./contact.module.css";
import { connect } from "react-redux";

class ContactPage extends React.Component {
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
      <Grid container justify="center" className={styles.contact_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom
            className={styles.title}
            style={(isEdit ? titleEdit : titleView, { color: "white" })}
          >
            Contacts
          </Typography>
          <Divider style={{ backgroundColor: "white" }} variant="fullWidth" />
        </Grid>
        <Grid
          item
          sm={5}
          xs={10}
          container
          justify="flex-start"
          className={styles.child}
        >
          <Grid item sm={12} xs={12}>
            <Typography
              variant="h4"
              className={styles.child_title}
              style={(isEdit ? bodyEdit : bodyView, { color: "white" })}
            >
              Contacts
            </Typography>
            <Divider
              variant="fullWidth"
              style={{ backgroundColor: "white" }}
              className={styles.divider}
            />
            <Typography
              variant="h5"
              className={styles.child_title}
              style={(isEdit ? bodyEdit : bodyView, { color: "white" })}
            >
              Address
            </Typography>
            <Typography
              variant="body1"
              className={styles.child_content}
              style={isEdit ? bodyEdit : bodyView}
            >
              {isEdit ? siteEdit.address : siteView.address}
            </Typography>
            <Typography
              variant="h5"
              className={styles.child_title}
              style={(isEdit ? bodyEdit : bodyView, { color: "white" })}
            >
              Phone
            </Typography>
            <Typography
              variant="body1"
              className={styles.child_content}
              style={(isEdit ? bodyEdit : bodyView, { color: "white" })}
            >
              {isEdit ? siteEdit.phone : siteView.phone}
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
