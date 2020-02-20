import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

const imgUrl = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

class Theme1News extends React.Component {
  render() {
    const {
      themeFontTitle,
      themeFontBody,
      themeColor,
      mapLat,
      mapLng
    } = this.props;

    const useStyles = theme => ({
      changableTitle: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "left",
        fontSize: 20,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableLink: {
        fontFamily: themeFontBody,
        color: themeColor,
        textAlign: "left",
        fontStyle: "italic",
        fontSize: 20
      },
      changableBody: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      changableBody2: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      pageName: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: themeColor,
        textAlign: "center",
        fontSize: 20
      },
      changableFirst2: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: themeColor
      },
      changableLegend: {
        fontFamily: themeFontTitle,
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
  siteId: state.site.id,
  themeFontTitle: state.theme.fontTitle,
  themeColor: state.theme.color,
  themeFontBody: state.theme.fontBody,
  mapLat: 10.82302,
  mapLng: 106.62965
});

export default connect(mapStateToProps, null)(Theme1News);
