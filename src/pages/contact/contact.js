import React from "react";
import { Component } from "react";
import {
  Grid,
  Typography,
  Divider,
  Box,
  TextField,
  Button
} from "@material-ui/core";
import styles from "./contact.module.css";

class ContactPage extends Component {
  render() {
    return (
      <Grid container justify="center" className={styles.contact_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            variant="h4"
            color="textSecondary"
            align="center"
            gutterBottom="true"
            className={styles.title}
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
            <Typography variant="h4" className={styles.child_title}>
              <Box lineHeight={3}>Contacts</Box>
            </Typography>
            <Divider variant="fullWidth" className={styles.divider} />
            <Typography variant="h5" className={styles.child_title}>
              <Box lineHeight={3}>ADDRESS</Box>
            </Typography>
            <Typography variant="body1" className={styles.child_content}>
              43/2 Nguyễn Trãi, Q1, tp.HCM, Ho Chi Minh City , Vietnam
            </Typography>
            <Typography variant="h5" className={styles.child_title}>
              <Box lineHeight={3}>Phone</Box>
            </Typography>
            <Typography variant="body1" className={styles.child_content}>
              01234567987
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
            <Typography variant="h4" className={styles.child_title}>
              <Box lineHeight={3}>Message</Box>
            </Typography>
            <Divider variant="fullWidth" className={styles.divider} />
          </Grid>
          <form noValidate autoComplete="off">
            <TextField
              className={styles.txtInput}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth="true"
            />
            <TextField
              className={styles.txtInput}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth="true"
            />
            <TextField
              className={styles.txtInput}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              fullWidth="true"
            />

            <TextField
              className={styles.txtInput}
              id="outlined-basic"
              label="Message"
              variant="outlined"
              multiline
              rows="10"
              fullWidth="true"
            />

            <div className={styles.btn_send}>
              <Button>
                <Typography
                  align="center"
                  variant="h6"
                  className={styles.btn_content}
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

export default ContactPage;
