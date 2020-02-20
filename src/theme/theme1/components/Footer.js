import React from "react";
import { connect } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

class Footer extends React.Component {

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

    });
    const classes = useStyles();

    return (
      <Grid container style={{ backgroundColor: "#212121", marginTop: 50 }}>
        <Grid container item xs={12} justify="center" >
          <IconButton aria-label="" color="primary">
            <FontAwesomeIcon icon={faFacebook} color="white" size="2x" />
          </IconButton>
        </Grid>
        <Grid container item xs={12} justify="center" >
          <p style={{ color: "white" }} >@PageName</p>
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

export default connect(mapStateToProps, null)(Footer);
