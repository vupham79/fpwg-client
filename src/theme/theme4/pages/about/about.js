import { Grid, CardMedia } from "@material-ui/core";
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
      bodyView
    } = this.props;
    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 25,
        paddingBottom: 20,
        textDecoration: "underline"
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "justify",
        fontSize: 16
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#b3b2b2",
        textAlign: "left",
        fontSize: 16
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "black",
        textAlign: "center",
        fontSize: 16
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color
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
        textAlign: "center"
      },
      greyDiv: {
        backgroundColor: "#e1ede4",
        padding: 30,
        textAlign: "center",
        color: "#535353",
        fontSize: 20
      },
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 50
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      },
      changableAppBar: {
        backgroundColor: "white",
        opacity: 0.6,
        position: "sticky",
        color: "#535353",
        textAlign: "right"
      }
    });
    const classes = useStyles();

    return (
      <Grid
        container
        style={{
          backgroundColor: "#1a1919",
          paddingBottom: 50,
          minHeight: "50vh"
        }}
      >
        <Grid item xs={12}>
          <p style={classes.changableTitle}>ABOUT</p>
        </Grid>

        <Grid container item xs={12} direction="column" justify="center" alignContent="center">
          <Grid container item xs={12} sm={4} justify="center">
            <CardMedia
              component="img"
              height="300"
              style={{ objectFit: "contain", display: isEdit ? (this.props.siteEdit.showDetailSetting.showAboutLogo ? "block" : "none") : (this.props.siteView.showDetailSetting.showAboutLogo ? "block" : "none") }}
              image={this.renderImage()}
            />
          </Grid>
          <Grid item xs={12} sm={4} style={{ paddingLeft: 10, display: isEdit ? (this.props.siteEdit.showDetailSetting.showAboutDescription ? "block" : "none") : (this.props.siteView.showDetailSetting.showAboutDescription ? "block" : "none") }}>
            <p style={classes.changableBody3}>
              {isEdit && siteEdit && siteEdit.about}
              {!isEdit && siteView && siteView.about}
              {isEdit && !siteEdit.about && "Welcome to our website!"}
              {!isEdit && !siteView.about && "Welcome to our website!"}
            </p>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo
});

export default connect(mapStateToProps, null)(Theme1About);
