import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import ExampleComponent from "react-rounded-image";

class Theme1About extends React.Component {

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
        textAlign: "justify",
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

    return (
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle}><span style={classes.changableFirst}>A</span>BOUT</p>
        </Grid>
        <Grid container item xs={12} justify={"center"}>
          <ExampleComponent
            image="./images/theme1-banner3.jpg"
            roundedColor={themeColor}
            imageWidth="150"
            imageHeight="150"
            roundedSize="5"
          />
        </Grid>
        <Grid item xs={12}>
          <p style={classes.changableBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
        donec massa sapien faucibus et molestie ac.</p>
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

export default connect(mapStateToProps, null)(Theme1About);
