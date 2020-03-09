import { faAddressBook, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { Parallax } from "react-parallax";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import moment from "moment";
import EventComponent from "../../../component/eventComponent";
import GalleryComponent from "../../../component/galleryComponent";
import RoundedImage from "react-rounded-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };
  renderLogo = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return (
          <img
            style={{ height: "50vh" }}
            src={URL.createObjectURL(newLogo)}
            alt=""
          />
        );
      } else
        return <img style={{ height: "50vh" }} src={siteEdit.logo} alt="" />;
    }
    return <img style={{ height: "50vh" }} src={siteView.logo} alt="" />;
  };
  renderCover = () => {
    const { isEdit, siteEdit, siteView } = this.props;
    if (isEdit) {
      return (
        siteEdit.cover &&
        siteEdit.cover.map((cover, i) => <img src={cover} key={i} alt="" />)
      );
    } else {
      return (
        siteView.cover &&
        siteView.cover.map((cover, i) => <img src={cover} key={i} alt="" />)
      );
    }
  };
  renderNewCovers = () => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover.length > 0) {
        return newCover.map((cover, index) => {
          if (cover && typeof cover === "object" && cover.size > 0) {
            return <img src={URL.createObjectURL(cover)} alt="" key={index} />;
          } else return <img src={cover} alt="" key={index} />;
        });
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return siteView.cover.map((cover, i) => (
          <img src={cover} alt="" key={i} />
        ));
      }
    }
  };
  render() {
    const {
      siteEdit,
      isEdit,
      titleView,
      titleEdit,
      siteView,
      posts,
      bodyEdit,
      bodyView
    } = this.props;
    const useStyles = () => ({
      changableLink: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 20
      },
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 20
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        fontSize: 16,
        textAlign: "justify"
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "black",
        textAlign: "center",
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
      changableFirst2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20
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
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: isEdit
              ? parseFloat(siteEdit.latitude)
              : parseFloat(siteView.latitude),
            lng: isEdit
              ? parseFloat(siteEdit.longitude)
              : parseFloat(siteView.longitude)
          }}
        >
          <Marker
            position={{
              lat: isEdit
                ? parseFloat(siteEdit.latitude)
                : parseFloat(siteView.latitude),
              lng: isEdit
                ? parseFloat(siteEdit.longitude)
                : parseFloat(siteView.longitude)
            }}
          />
        </GoogleMap>
      ))
    );
    return (
      <Grid container>
        <Grid item xs={12}>
          <Slider autoplay arrows centerMode>
            {this.renderNewCovers()}
          </Slider>
        </Grid>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>A</span>BOUT
          </p>
        </Grid>
        <Grid container item xs={12} justify={"center"}>
          <RoundedImage
            image={this.renderImage()}
            roundedColor={isEdit ? titleEdit.color : titleView.color}
            imageWidth="150"
            imageHeight="150"
            roundedSize="5"
          />
        </Grid>
        <Grid item xs={12}>
          {isEdit && !siteEdit && (
            <p style={classes.changableBody3}>Welcome!</p>
          )}
          {!isEdit && !siteView && (
            <p style={classes.changableBody3}>Welcome!</p>
          )}
          <p style={classes.changableBody3}>
            {isEdit && siteEdit && siteEdit.about}
            {!isEdit && siteView && siteView.about}
            {isEdit && !siteEdit.about && (
              <p style={classes.changableBody4}>Welcome to our website!</p>
            )}
            {!isEdit && !siteView.about && (
              <p style={classes.changableBody4}>Welcome to our website!</p>
            )}
          </p>
        </Grid>
        <Grid item xs={12} style={classes.greyDiv}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>N</span>EWS
          </p>
          {!posts && (
            <p style={classes.changableBody3}>Currently there are no news.</p>
          )}
          {posts && posts.length === 0 && (
            <p style={classes.changableBody3}>Currently there are no news.</p>
          )}
        </Grid>
        {posts && posts.length > 0 && (
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
              {posts &&
                posts.slice(0, 5).map(row => (
                  <Grid item xs={12} style={classes.centerItem3} key={row.id}>
                    <img
                      src={row.attachments.images[0]}
                      alt=""
                      style={{ height: 200, width: 200 }}
                    />
                    <p style={classes.changableTitle2}>
                      {moment(row.createdTime).format("MMMM") + " "}
                      <span style={classes.changableFirst2}>
                        {moment(row.createdTime).format("DD") + " "}
                      </span>
                      {moment(row.createdTime).format("YYYY")}
                    </p>
                    <p style={classes.changableBody3}>
                      {row.message ? row.message : ""}
                    </p>
                    <p style={classes.changableLink}>Read more...</p>
                  </Grid>
                ))}
            </Carousel>
          </Grid>
        )}
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>G</span>ALLERY
          </p>
        </Grid>
        {isEdit && !siteEdit.galleries && (
          <Grid item xs={12}>
            <p style={classes.changableBody4}>Currently there are no images.</p>
          </Grid>
        )}
        {!isEdit && !siteView.galleries && (
          <Grid item xs={12}>
            <p style={classes.changableBody4}>Currently there are no images.</p>
          </Grid>
        )}
        <Grid item xs={12}>
          {/* <Carousel
            showArrows={true}
            centerMode={true}
            infiniteLoop={true}
            showStatus={true}
            showThumbs={false}
            autoPlay={false}
            showIndicators={false}
          >
            {isEdit
              ? siteEdit.galleries &&
                siteEdit.galleries.map(row => (
                  <img style={{ height: "50vh" }} src={row.url} alt="" />
                ))
              : siteView.galleries &&
                siteView.galleries.map(row => (
                  <img style={{ height: "50vh" }} src={row.url} alt="" />
                ))}
          </Carousel> */}
          {isEdit ? (
            <GalleryComponent galleries={siteEdit.galleries} />
          ) : (
            <GalleryComponent galleries={siteView.galleries} />
          )}
        </Grid>
        <div style={{ height: 100, width: "100%" }} />
        <Grid item xs={12}>
          <Parallax
            blur={0}
            bgImage={
              isEdit
                ? siteEdit.cover && siteEdit.cover[0]
                : siteView.cover && siteView.cover[0]
            }
            bgImageAlt="./images/theme1-banner2.jpg"
            strength={300}
            style={{ height: "30vh", width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>E</span>VENTS
          </p>
        </Grid>
        <Grid item xs={12} style={{ marginTop: -80 }}>
          <EventComponent />
        </Grid>

        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>C</span>ONTACTS
          </p>
        </Grid>
        {isEdit && siteEdit.phone && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faPhone} size="2x" />
              {siteEdit.phone}
            </p>
          </Grid>
        )}
        {!isEdit && siteView.phone && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faPhone} size="2x" />
              {siteView.phone}
            </p>
          </Grid>
        )}
        {isEdit && siteEdit.address && siteEdit.adress !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faAddressBook} size="2x" />
              {siteEdit.address}
            </p>
          </Grid>
        )}
        {!isEdit && siteView.address && siteView.adress !== "" && (
          <Grid container item xs={12} justify="center">
            <p style={classes.changableBody2}>
              <FontAwesomeIcon icon={faAddressBook} size="2x" />
              {siteView.address}
            </p>
          </Grid>
        )}

        <Grid item xs={12}>
          {isEdit && siteEdit.latitude && siteEdit.longitude && (
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
          {!isEdit && siteView.latitude && siteView.longitude && (
            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
          {isEdit && !siteEdit.phone && !siteEdit.address && (
            <p style={classes.changableBody3}>
              Currently setting up our location.
            </p>
          )}
          {!isEdit && !siteView.phone && !siteView.address && (
            <p style={classes.changableBody3}>
              Currently setting up our location.
            </p>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover
});

export default connect(mapStateToProps, null)(Theme1Home);
