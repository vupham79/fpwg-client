import { Grid, Typography, Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./index.module.css";

class FooterPage extends Component {
  render() {
    const { isEdit, titleEdit, siteEdit, siteView } = this.props;
    return (
      <Grid container direction="row" className={styles.footer}>
        <Container>
          <Grid item sm={12} xs={12} container className={styles.bot_footer}>
            <Grid item sm={9} container justify="flex-start">
              <Typography
                style={{
                  fontWeight: 400,
                  color: "#7c7c7c",
                  textAlign: "left",
                  fontSize: 16,
                }}
              >
                © {isEdit ? siteEdit.title : siteView.title}
              </Typography>
            </Grid>
            <Grid item sm={3} container justify="flex-end">
              <Typography
                style={{
                  fontFamily: isEdit
                    ? titleEdit.fontFamily
                    : titleEdit.fontFamily,
                  fontSize: "15px !important",
                  textTransform: "uppercase !important",
                  display: "inline-block !important",
                  verticalAlign: "middle !important",
                  lineHeight: "1.4 !important",
                  margin: "0 !important",
                  fontWeight: "bold",
                }}
              >
                POWERED BY FPWG
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
});

export default connect(mapStateToProps, null)(FooterPage);
