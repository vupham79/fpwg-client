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
      bodyView,
      fromHome,
      homeTitle,
    } = this.props;
    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: "48px",
        textDecoration: "underline",
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "justify",
        fontSize: 16,
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#111",
        textAlign: "left",
        fontSize: "20px",
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#111",
        textAlign: "center",
        fontSize: "20px",
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20,
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
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
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 50,
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
      changableAppBar: {
        backgroundColor: "white",
        opacity: 0.6,
        position: "sticky",
        color: "#535353",
        textAlign: "right",
      },
    });
    const classes = useStyles();
    return (
      <Grid
        container
        style={{
          // backgroundColor: "#1a1919",
          paddingBottom: 50,
          minHeight: "50vh",
          padding: "10vh 0",
        }}
        justify="center"
      >
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            {fromHome
              ? homeTitle
              : isEdit
              ? siteEdit &&
                siteEdit.navItems &&
                siteEdit.navItems.find((item) => item.original === "about").name
              : siteView &&
                siteView.navItems &&
                siteView.navItems.find((item) => item.original === "about")
                  .name}
          </p>
        </Grid>
        {fromHome ? (
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignContent="center"
            style={{ padding: "2.5rem 0" }}
          >
            <Grid item xs={8}>
              <p style={classes.changableBody4}>
                {isEdit && siteEdit && siteEdit.about}
                {!isEdit && siteView && siteView.about}
                {isEdit && !siteEdit.about && "Welcome to our website!"}
                {!isEdit && !siteView.about && "Welcome to our website!"}
              </p>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignContent="center"
            style={{ padding: "2.5rem 0" }}
          >
            <Grid container item xs={12} sm={4}>
              <CardMedia
                component="img"
                height="300"
                style={{ objectFit: "contain" }}
                image={this.renderImage()}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={4}
              alignItems="center"
              justify="center"
            >
              <Grid item xs={11}>
                <p style={classes.changableBody3}>
                  {isEdit && siteEdit && siteEdit.about}
                  {!isEdit && siteView && siteView.about}
                  {isEdit && !siteEdit.about && "Welcome to our website!"}
                  {!isEdit && !siteView.about && "Welcome to our website!"}
                </p>
              </Grid>
            </Grid>
          </Grid>
        )}
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
