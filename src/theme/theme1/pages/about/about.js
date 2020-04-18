import { Grid } from "@material-ui/core";
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
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20,
        textTransform: "uppercase",
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        textAlign: "justify",
        fontSize: 16,
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#ffffff",
        textAlign: "left",
        fontSize: 16,
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        textAlign: "center",
        fontSize: 16,
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#535353",
        fontSize: 20,
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color,
      },
      changableLegend: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "white",
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "40%",
        fontSize: 80,
        textAlign: "center",
      },
      greyDiv: {
        backgroundColor: "#e1ede4",
        padding: 30,
        textAlign: "center",
        color: "#535353",
        fontSize: 20,
      },
    });
    const classes = useStyles();

    return (
      <Grid container style={{ minHeight: "50vh", marginTop: 70 }}>

        <Grid item xs={12} style={{ marginBottom: 50 }}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>
              {fromHome ? homeTitle.charAt(0) : "A"}
            </span>
            {fromHome ? homeTitle.substring(1) : "BOUT"}
          </p>
        </Grid>

        <Grid container item xs={12} justify={"center"} style={{ backgroundColor: isEdit ? titleEdit.color : titleView.color, minHeight: 420 }}>
          <Grid item xs={12} sm={9}>
            <img src={this.renderImage()} alt="" style={{ width: 292, height: 348, marginTop: -50, objectFit: "cover", display: isEdit ? (this.props.siteEdit.showDetailSetting.showAboutLogo ? "inline-block" : "none") : (this.props.siteView.showDetailSetting.showAboutLogo ? "block" : "none") }} />

            <span style={{ height: 298, overflowY: "auto", maxWidth: 400, padding: 15, display: isEdit ? (this.props.siteEdit.showDetailSetting.showAboutDescription ? "inline-block" : "none") : (this.props.siteView.showDetailSetting.showAboutDescription ? "inline-block" : "none") }} >
              <p style={classes.changableBody3}>
                {isEdit && siteEdit && siteEdit.about}
                {!isEdit && siteView && siteView.about}
                {isEdit && !siteEdit.about && "Welcome to our website!"}
                {!isEdit && !siteView.about && "Welcome to our website!"}
              </p>
            </span>
          </Grid>
        </Grid>

        {/* <Grid item xs={12} style={{ backgroundColor: "#3E5688", height: 150 }} /> */}

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
