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
            style={isEdit ? titleEdit : titleView}
          >
            Contacts
          </Typography>
          <Divider variant="fullWidth" />
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
              style={isEdit ? bodyEdit : bodyView}
            >
              <Box lineHeight={3}>Contacts</Box>
            </Typography>
            <Divider variant="fullWidth" className={styles.divider} />
            <Typography
              variant="h5"
              className={styles.child_title}
              style={isEdit ? bodyEdit : bodyView}
            >
              <Box lineHeight={3}>ADDRESS</Box>
            </Typography>
            <Typography
              variant="body1"
              className={styles.child_content}
              style={isEdit ? bodyEdit : bodyView}
            ></Typography>
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
              {isEdit ? siteEdit.phone : siteView.phone}
            </Typography>
          </Grid>
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
              style={isEdit ? bodyEdit : bodyView}
            >
              <Box lineHeight={3}>Message</Box>
            </Typography>
            <Divider variant="fullWidth" className={styles.divider} />
          </Grid>
          <form noValidate autoComplete="off">
            <TextField
              className={styles.txtInput}
              label="Name"
              variant="outlined"
              fullWidth
            />
            <TextField
              className={styles.txtInput}
              label="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              className={styles.txtInput}
              label="Phone"
              variant="outlined"
              fullWidth
            />

            <TextField
              className={styles.txtInput}
              label="Message"
              variant="outlined"
              multiline
              rows="10"
              fullWidth
            />

            <div className={styles.btn_send}>
              <Button>
                <Typography
                  align="center"
                  variant="h6"
                  className={styles.btn_content}
                  style={isEdit ? bodyEdit : bodyView}
                >
                  Send Message
                </Typography>
              </Button>
            </div>
          </form>
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
