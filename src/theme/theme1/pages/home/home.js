import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faAddressBook, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { Parallax } from "react-parallax";
import { connect } from "react-redux";
// import { makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import { AppBar, Toolbar, Grid, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ExampleComponent from "react-rounded-image";
import styles from "./home.module.css";

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

class Theme1Home extends React.Component {
  state = {
    anchorEl: null
  };
  setAnchorEl = anchorEl => {
    this.setState({
      anchorEl: anchorEl
    });
  };
  handleMenuClick = event => {
    this.setAnchorEl(event.currentTarget);
  };
  handleMenuClose = () => {
    this.setAnchorEl(null);
  };
  render() {
    const {
      themeFontTitle,
      themeFontBody,
      themeColor,
      mapLat,
      mapLng
    } = this.props;

    // handleData = () => {

    //   try {

    //   } catch (error) {

    //   }
    // };

    const useStyles = theme => ({
      changableLink: {
        fontFamily: themeFontBody,
        color: themeColor,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20
      },
      changableFirst2: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: themeColor,
        textAlign: "center",
        fontSize: 20
      },
      changableTitle: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20
      },
      changableName: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: themeColor,
        textAlign: "left",
        fontSize: 20
      },
      changableBody: {
        fontFamily: themeFontBody,
        color: "#212121",
        fontSize: 16,
        textAlign: "justify"
      },
      changableBody2: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      changableBody3: {
        fontFamily: themeFontBody,
        color: "black",
        textAlign: "center",
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
        textAlign: "center",
        color: "#535353",
        fontSize: 20
      },
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 10
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
      },
      centerItem3: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        backgroundColor: "white"
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
    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: mapLat, lng: mapLng }}>
          <Marker position={{ lat: mapLat, lng: mapLng }} />
        </GoogleMap>
      ))
    );

    return (
      <Grid container id={"aboutSection"}>
        {/* <AppBar style={classes.changableAppBar}>
          <Toolbar>
            <IconButton onClick={event => this.handleMenuClick(event)} edge="start" style={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClose}><a href='#aboutSection'>About</a></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><a href='#newsSection'>News</a></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><a href='#gallerySection'>Gallery</a></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><a href='#eventSection'>Event</a></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><a href='#contactSection'>Contact</a></MenuItem>
            </Menu>
            <Typography variant="h6" style={classes.pageName}>Page Name</Typography>
          </Toolbar>
        </AppBar> */}
        <Grid item xs={12}>
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            stopOnHover={true}
            infiniteLoop={true}
          >
            <div>
              <img src="./images/theme1-banner1.jpg" alt="" />
              <p style={classes.changableLegend}>Title 1</p>
            </div>
            <div>
              <img src="./images/theme1-banner2.jpg" alt="" />
              <p style={classes.changableLegend}>Title 2</p>
            </div>
            <div>
              <img src="./images/theme1-banner1.jpg" alt="" />
              <p style={classes.changableLegend}>Title 3</p>
            </div>
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>A</span>BOUT
          </p>
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
          <p style={classes.changableBody}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </p>
        </Grid>
        <Grid item xs={12} style={classes.greyDiv}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>N</span>EWS
          </p>
          {/* <p style={classes.changableBody3}>Currently there are no news.</p> */}
        </Grid>
        <Grid item xs={12}>
          <Carousel
            showArrows={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={false}
            stopOnHover={true}
            infiniteLoop={false}
          >
            <Grid item xs={12} style={classes.centerItem3}>
              <img
                src="./images/theme1-banner3.jpg"
                alt=""
                style={{ height: 200, width: 200 }}
              />
              <p style={classes.changableTitle2}>
                FEB <span style={classes.changableFirst2}>10</span>, 2020
              </p>
              <p style={classes.changableBody3}>post content is here.</p>
              <p style={classes.changableLink}>Read more...</p>
            </Grid>
            <Grid item xs={12} style={classes.centerItem3}>
              <img
                src="./images/theme1-banner2.jpg"
                alt=""
                style={{ height: 200, width: 200 }}
              />
              <p style={classes.changableTitle2}>
                FEB <span style={classes.changableFirst2}>10</span>, 2020
              </p>
              <p style={classes.changableBody3}>post content is here.</p>
              <p style={classes.changableLink}>Read more...</p>
            </Grid>
            <Grid item xs={12} style={classes.centerItem3}>
              <img
                src="./images/theme1-banner1.jpg"
                alt=""
                style={{ height: 200, width: 200 }}
              />
              <p style={classes.changableTitle2}>
                FEB <span style={classes.changableFirst2}>10</span>, 2020
              </p>
              <p style={classes.changableBody3}>post content is here.</p>
              <p style={classes.changableLink}>Read more...</p>
            </Grid>
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>G</span>ALLERY
          </p>
        </Grid>
        <Grid item xs={12} id={"gallerySection"}>
          <Carousel
            showArrows={true}
            centerMode={true}
            infiniteLoop={true}
            showStatus={true}
            showThumbs={false}
            autoPlay={false}
            showIndicators={false}
          >
            <img src="./images/theme1-banner1.jpg" alt="" />
            <img src="./images/theme1-banner2.jpg" alt="" />
            <img src="./images/theme1-banner1.jpg" alt="" />
            <img src="./images/theme1-banner2.jpg" alt="" />
          </Carousel>
        </Grid>
        <div style={{ height: 100, width: "100%" }} />
        <Grid item xs={12}>
          <Parallax
            blur={0}
            bgImage="./images/theme1-banner1.jpg"
            strength={300}
            style={{ height: 250, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>E</span>VENTS
          </p>
        </Grid>
        <Grid item xs={12} style={{ marginTop: -80 }}>
          <Grid
            container
            alignItems="center"
            direction="column"
            className={styles.event_page}
          >
            <Grid
              item
              sm={3}
              xs={3}
              container
              justify="center"
              className={styles.event_body}
            >
              <Grid item sm={12} container>
                <Grid item sm={3} className={styles.image_page}>
                  <img alt="" src={imgUrl[1]} style={imgStyles} />
                </Grid>
                <Grid item sm={9} container direction="column">
                  <Typography variant="h6" style={classes.changableName}>
                    Page name
                  </Typography>
                  <Button className={styles.btn_like}>
                    <FontAwesomeIcon
                      icon={faFacebookSquare}
                      className={styles.icon}
                      size-={2}
                    ></FontAwesomeIcon>
                    <Typography className={styles.like}>Like Page</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                container
                sm={12}
                className={[styles.contain_event, styles.event]}
              >
                <Typography className={styles.event_content}>
                  Page name does not have any upcoming event.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>C</span>ONTACTS
          </p>
        </Grid>
        <Grid container item xs={12} justify="center">
          <p style={classes.changableBody2}>
            <FontAwesomeIcon icon={faPhone} size="2x" />
            0909133349
          </p>
        </Grid>
        <Grid container item xs={12} justify="center">
          <p style={classes.changableBody2}>
            <FontAwesomeIcon icon={faAddressBook} size="2x" />
            112 Đường Hồng Hà, P.12, Q.Tân Bình
          </p>
        </Grid>
        <Grid item xs={12} id={"eventSection"}>
          <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
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

export default connect(mapStateToProps, null)(Theme1Home);
