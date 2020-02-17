import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ExampleComponent from "react-rounded-image";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Parallax, Background } from 'react-parallax';
import {withGoogleMap,GoogleMap,Marker,withScriptjs} from "react-google-maps";


const Theme1Home = ({themeFontTitle, themeFontBody, themeColor, mapLat, mapLng}) => { 

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
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles(theme => ({
    
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
      marginRight: "auto"
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
      opacity:0.6,
      position: "sticky",
      color: "#535353",
      textAlign: "right",
    },
  }));

  const classes = useStyles();

  return (   

   

    <Grid container id={'aboutSection'} >

        <AppBar className={classes.changableAppBar}>
          <Toolbar>
            <IconButton onClick={handleMenuClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>

            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            >
            <MenuItem onClick={handleMenuClose}><a href='#aboutSection'>About</a></MenuItem>
            <MenuItem onClick={handleMenuClose}><a href='#newsSection'>News</a></MenuItem>
            <MenuItem onClick={handleMenuClose}><a href='#gallerySection'>Gallery</a></MenuItem>
            <MenuItem onClick={handleMenuClose}><a href='#eventSection'>Event</a></MenuItem>
            <MenuItem onClick={handleMenuClose}><a href='#contactSection'>Contact</a></MenuItem>
            </Menu>

            <Typography variant="h6" className={classes.pageName}>Page Name</Typography>
        </Toolbar>
      </AppBar>

      <Grid item xs={12}>
      <Carousel showArrows={false} showStatus={false} showThumbs={false} autoPlay={true} stopOnHover={true} infiniteLoop={true}>
                <div>
                    <img src="./images/theme1-banner1.jpg" />
                    <p className={classes.changableLegend}>Title 1</p>
                </div>
                <div>
                    <img src="./images/theme1-banner2.jpg" />
                    <p className={classes.changableLegend}>Title 2</p>
                </div>
                <div>
                    <img src="./images/theme1-banner1.jpg" />
                    <p className={classes.changableLegend}>Title 3</p>
                </div>
      </Carousel>
      </Grid>

      <Grid item xs={12}>
      <p className={classes.changableTitle}><span className={classes.changableFirst}>A</span>BOUT</p> 
      </Grid>

      <Grid item xs={12}>
      <div className={classes.centerItem}>
      <ExampleComponent
        image="./images/theme1-banner3.jpg"
        roundedColor={themeColor}
        imageWidth="150"
        imageHeight="150"
        roundedSize="5"        
      />
      </div>
      </Grid>

      <Grid item xs={12} id={'newsSection'}>
      <p className={classes.changableBody}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
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

      <Grid item xs={12}>
      <div className={classes.greyDiv}>
      <p className={classes.changableTitle}><span className={classes.changableFirst}>N</span>EWS</p>
      <p className={classes.changableBody}>Currently there are no news.</p>
      </div>
      </Grid>

      <Grid item xs={12}>
      <p className={classes.changableTitle}><span className={classes.changableFirst}>G</span>ALLERY</p>
      </Grid>

      <Grid item xs={12} id={'gallerySection'}>
      <Carousel showArrows={true} centerMode={true} infiniteLoop={true} showStatus={true} showThumbs={false} autoPlay={false} showIndicators={false}>
              <div>
                  <img src="./images/theme1-banner1.jpg" />
              </div>
              <div>
                  <img src="./images/theme1-banner2.jpg" />
              </div>
              <div>
                  <img src="./images/theme1-banner1.jpg" />
              </div>
              <div>
                  <img src="./images/theme1-banner2.jpg" />
              </div>
     </Carousel>
     </Grid>

     <div style={{ height: 100, width:'100%' }} />

     <Grid item xs={12}>
     <Parallax
          blur={0}
          bgImage="./images/theme1-banner1.jpg"
          strength={300}
      >
          <div style={{ height: 250, width:'100%' }} />
      </Parallax>
      </Grid>

      <div style={{ height: 100, width:'100%' }} />

      <Grid item xs={12}>
      <p className={classes.changableTitle}><span className={classes.changableFirst}>E</span>VENTS</p>     
      </Grid>

      <Grid item xs={12} id={'eventSection'}> 
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      </Grid>

      <Grid item xs={12}>
      <p className={classes.changableTitle}><span className={classes.changableFirst}>C</span>ONTACTS</p>     
      </Grid>

      <Grid item xs={12} id={'contactSection'}>
      <div className={classes.centerItem2} >

      <p className={classes.changableBody2}><span><img src="./images/phone-icon.png" style={{ height: `30px`, width: '30px' }}/></span>0909133349</p>
      
      <p className={classes.changableBody2}><span><img src="./images/address-icon.png" style={{ height: `30px`, width: '30px' }}/></span>112 Đường Hồng Hà, P.12, Q.Tân Bình</p>
      
      </div>

      </Grid>

      </Grid>
    
  )
}

export default Theme1Home
