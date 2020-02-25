import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
class Theme1News extends React.Component {
  render() {
    const { siteEdit } = this.props;

    const useStyles = () => ({
      changableTitle: {
        fontFamily: siteEdit.fontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "left",
        fontSize: 20,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: siteEdit.fontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableLink: {
        fontFamily: siteEdit.fontBody,
        color: siteEdit.color,
        textAlign: "left",
        fontStyle: "italic",
        fontSize: 20
      },
      changableBody: {
        fontFamily: siteEdit.fontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      changableBody2: {
        fontFamily: siteEdit.fontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      pageName: {
        fontFamily: siteEdit.fontTitle,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: siteEdit.fontTitle,
        fontWeight: "bold",
        color: siteEdit.color,
        textAlign: "center",
        fontSize: 20
      },
      changableFirst2: {
        fontFamily: siteEdit.fontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: siteEdit.color
      },
      changableLegend: {
        fontFamily: siteEdit.fontTitle,
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
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
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
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle2}>
            <span style={classes.changableFirst2}>N</span>EWS
          </p>
        </Grid>
        <Grid item xs={12}>
          <div style={classes.centerItem}>
            <img
              src="./images/theme1-banner3.jpg"
              alt=""
              style={{ height: "auto", width: "100%" }}
            />
            <p style={classes.changableTitle}>
              FEB <span style={classes.changableFirst}>10</span>, 2020
            </p>
            <p style={classes.changableBody}>post content is here.</p>
            <p style={classes.changableLink}>View On Facebook</p>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit
});

export default connect(mapStateToProps, null)(Theme1News);
