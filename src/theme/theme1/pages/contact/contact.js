import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
import { faPhone, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Theme1Contact extends React.Component {

  render() {

    const { themeFontTitle, themeFontBody, themeColor, mapLat, mapLng } = this.props;

    const useStyles = theme => ({
      changableTitle: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableBody: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "center",
        fontSize: 16,
      },
      changableBody2: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16,
      },
      pageName: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20,
      },
      changableFirst: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: themeColor,
      },
      changableLegend: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "white",
        zIndex: 5,
        position: "absolute",
        top: '50%',
        left: '40%',
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
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"

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

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: mapLat, lng: mapLng }}
      >
        <Marker
          position={{ lat: mapLat, lng: mapLng }}
        />
      </GoogleMap>
    ));
    return (
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle}><span style={classes.changableFirst}>C</span>ONTACTS</p>
        </Grid>
        <Grid container item xs={12} justify="center" >
          <p style={classes.changableBody2}><FontAwesomeIcon icon={faPhone} size="2x" />0909133349</p>
        </Grid>
        <Grid container item xs={12} justify="center" >
          <p style={classes.changableBody2}><FontAwesomeIcon icon={faAddressBook} size="2x" />112 Đường Hồng Hà, P.12, Q.Tân Bình</p>
        </Grid>
        <Grid item xs={12} id={'eventSection'}>
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Grid>

      </Grid>
    )
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

export default connect(mapStateToProps, null)(Theme1Contact);
