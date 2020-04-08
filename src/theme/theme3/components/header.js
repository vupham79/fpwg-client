import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  withStyles,
  Tooltip,
  Zoom,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNavItemValue, updateSelectNavItemValue } from "../../../actions";
import Link from "../../../component/link";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Parallax } from "react-parallax";

const useStyles = (theme) => ({
  root: {
    position: "relative",
  },
  info: {
    fontSize: "1rem",
    color: "white",
    paddingTop: "0.4rem",
  },
  infoContent: {
    color: "white",
    padding: "0.1rem 0.9rem",
    fontSize: "1rem",
  },
  contact: {
    position: "absolute",
  },
  gridIcon: {
    borderRadius: "0.4rem",
    padding: "0 0.2rem",
  },
  icon: {},
  navItem: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "70%",
      minHeight: "14vh",
    },
    position: "absolute",
    top: "40%",
    minHeight: "auto",
  },
  tab: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  dropdownSelect: {
    display: "block",
    paddingTop: "2rem",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    color: "white",
    fontSize: "2rem",
    overflow: "hidden",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
      display: "block",
      position: "absolute",
      top: "-2rem",
      // minWidth: "20vh",
    },
  },
  tooltip: {
    border: "2px solid orange",
  },
});

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

class Header extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.tabValue !== this.props.tabValue)
      document.getElementById("topPos").scrollIntoView();
  }

  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return `url('${URL.createObjectURL(newLogo)}'`;
      } else return `url('${siteEdit.logo}')`;
    }
    return `url('${siteView.logo}')`;
  };

  renderTabItems = () => {
    const { tabValue, updateNavItemValue, siteEdit, titleEdit } = this.props;
    const tabStyles = {
      fontFamily: titleEdit.fontFamily,
      color: "white",
      fontSize: "14px",
      minWidth: "5vh",
      "&:hover": {
        color: "red",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
      },
      "&:focus": {
        color: "#40a9ff",
      },
      textTransform: "uppercase",
    };
    return (
      <Tabs
        orientation="horizontal"
        value={tabValue}
        textColor="primary"
        TabIndicatorProps={{
          style: {
            display: "none",
          },
        }}
        onChange={(e, newValue) => updateNavItemValue(newValue)}
      >
        {siteEdit.navItems.map((item, index) =>
          item.isActive ? (
            <Tab style={tabStyles} label={item.name} key={index} />
          ) : null
        )}
      </Tabs>
    );
  };

  renderUrl = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="1x" />;
    }
  };

  renderInstagram = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />;
    }
  };

  renderYoutube = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />;
    }
  };

  renderWhatsapp = () => {
    const { isEdit } = this.props;
    if (isEdit) {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />;
    } else {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />;
    }
  };

  renderNavItems = () => {
    const { siteView, isEdit, titleView } = this.props;
    const navLinkStyle = {
      fontFamily: titleView.fontFamily,
      color: "white",
      fontSize: "14px",
      // minWidth: "5vh",
      textDecoration: "none",
      height: "auto",
      textTransform: "uppercase",
    };
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "7.5vh" }}
      >
        {isEdit
          ? this.renderTabItems()
          : siteView &&
            siteView.navItems &&
            siteView.navItems.map((item, index) =>
              item.isActive ? (
                <Grid item style={{ marginLeft: "2rem" }}>
                  <Link
                    key={index}
                    style={navLinkStyle}
                    activeStyle={{ backgroundColor: siteView.color }}
                    to={`/${siteView.sitePath}/${item.original}`}
                  >
                    {item.name}
                  </Link>
                </Grid>
              ) : null
            )}
      </Grid>
    );
  };

  renderTooltip = () => {
    const { navItemIsActive, isEdit, classes } = this.props;
    return (
      <Grid>
        {!navItemIsActive && !isEdit && (
          <Tooltip
            className={[classes.tooltip, "blink"]}
            TransitionComponent={Zoom}
            title="This page is currently inactive"
          >
            <Button>
              <FontAwesomeIcon color={"orange"} icon={faExclamation} />
            </Button>
          </Tooltip>
        )}
      </Grid>
    );
  };

  hangleChangeSelect = (event) => {
    const { updateNavItemValue, isEdit, updateSelectNavItemValue } = this.props;
    if (isEdit) {
      const newValue = parseInt(event.target.value);
      updateNavItemValue(newValue);
    } else {
      const newValue = parseInt(event.target.value);
      updateSelectNavItemValue(newValue);
    }
  };

  renderSelect = () => {
    const { siteEdit, siteView, isEdit, titleEdit, titleView } = this.props;
    const selectStyle = {
      color: "white",
      backgroundColor: isEdit
        ? siteEdit && siteEdit.color
        : siteView && siteView.color,
      border: "solid white",
      textAlign: "center",
      fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
    };
    const selectNavStyle = {
      backgroundColor: "white",
      textAlign: "center",
      fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
    };
    return (
      <FormControl
        margin="dense"
        variant="outlined"
        style={{ width: "-webkit-fill-available" }}
      >
        <Select
          onChange={this.hangleChangeSelect}
          fullWidth
          IconComponent={() => <></>}
          style={isEdit ? selectStyle : selectNavStyle}
          value={isEdit ? this.props.tabValue : this.props.selectValue}
        >
          {isEdit
            ? siteEdit &&
              siteEdit.navItems &&
              siteEdit.navItems
                .filter((item) => item.isActive)
                .map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.name}
                  </MenuItem>
                ))
            : siteView &&
              siteView.navItems &&
              siteView.navItems.map((item, index) =>
                item.isActive ? (
                  <MenuItem
                    key={index}
                    value={index}
                    style={{ color: "white", padding: "0" }}
                  >
                    <Link
                      to={`/${siteView.sitePath}/${item.original}`}
                      style={{
                        width: "-webkit-fill-available",
                        color: "black",
                        padding: "0.5rem",
                      }}
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ) : null
              )}
        </Select>
      </FormControl>
    );
  };

  renderHeader = () => {
    const {
      isEdit,
      siteEdit,
      siteView,
      classes,
      titleEdit,
      titleView,
    } = this.props;
    const infoStyle = {
      fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
    };
    return (
      <Grid
        container
        justify="center"
        style={{
          padding: "1rem",
          backgroundColor: isEdit
            ? hexToRGB(siteEdit.color, 0.6)
            : hexToRGB(siteView.color, 0.6),
        }}
      >
        <Grid item xs={12} className={classes.title} style={infoStyle}>
          {/* {isEdit ? siteEdit && siteEdit.title : siteView && siteView.title} */}
        </Grid>
        <Grid className={classes.tab}>{this.renderNavItems()}</Grid>
        <Grid item xs={6} className={classes.dropdownSelect}>
          {this.renderSelect()}
        </Grid>
      </Grid>
    );
  };

  getCover = (index) => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover[index]) {
        if (
          newCover[index] &&
          typeof newCover[index] === "object" &&
          newCover[index].size > 0
        ) {
          return URL.createObjectURL(newCover[index]);
        } else return newCover[index];
      } else {
        return "/images/theme1-banner1.jpg";
      }
    } else {
      if (siteView.cover && siteView.cover[index]) {
        console.log(siteView.cover);
        return siteView.cover[index];
      } else {
        return "/images/theme1-banner1.jpg";
      }
    }
  };

  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      classes,
      bodyEdit,
      bodyView,
      youtube,
      instagram,
      whatsapp,
      phone,
    } = this.props;

    const infoStyle = {
      background: isEdit
        ? hexToRGB(titleEdit.color, 0.6)
        : hexToRGB(titleView.color, 0.6),
      fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
    };
    return (
      <Grid container className={classes.root}>
        <Grid
          id="topPos"
          container
          item
          style={
            {
              // backgroundImage: `url(${isEdit ? newCover[0] : siteView.cover})`,
              // minHeight: "90vh",
              // ...imgStyles
            }
          }
        >
          <Parallax
            bgImage={this.getCover(0)}
            bgImageAlt="the cat"
            strength={200}
            style={{ width: "100%" }}
          >
            <div style={{ height: "500px", width: "100%" }} />
          </Parallax>
        </Grid>
        <Grid
          container
          item
          direction="column"
          alignItems="flex-end"
          justify="flex-end"
          className={classes.contact}
          style={{ padding: "1rem" }}
        >
          {isEdit
            ? siteEdit &&
              siteEdit.address && (
                <Grid
                  item
                  sm={12}
                  className={classes.infoContent}
                  style={{ ...infoStyle, marginBottom: "0.5rem" }}
                >
                  {siteEdit.address}
                </Grid>
              )
            : siteView &&
              siteView.address && (
                <Grid
                  item
                  sm={12}
                  className={classes.infoContent}
                  style={{ ...infoStyle, marginBottom: "0.5rem" }}
                >
                  {siteView.address}
                </Grid>
              )}
          {isEdit
            ? phone &&
              phone && (
                <Grid
                  item
                  sm={6}
                  className={classes.infoContent}
                  style={{ ...infoStyle }}
                >
                  {phone}
                </Grid>
              )
            : siteView &&
              siteView.phone && (
                <Grid
                  item
                  sm={6}
                  className={classes.infoContent}
                  style={{ ...infoStyle }}
                >
                  {siteView.phone}
                </Grid>
              )}
          <Grid
            container
            direction="row"
            justify="flex-end"
            item
            sm={6}
            className={classes.info}
          >
            {(siteEdit && siteEdit.url) || (siteView && siteView.url) ? (
              <Grid item style={{ ...infoStyle }}>
                <IconButton
                  className={classes.icon}
                  color="primary"
                  href={
                    isEdit ? siteEdit && siteEdit.url : siteView && siteView.url
                  }
                >
                  {this.renderUrl()}
                </IconButton>
              </Grid>
            ) : null}
            {(siteView && siteView.instagram) || (instagram && instagram) ? (
              <Grid
                item
                style={
                  isEdit
                    ? instagram
                      ? { ...infoStyle }
                      : { display: "none", ...infoStyle }
                    : siteView.instagram
                    ? { ...infoStyle }
                    : { display: "none", ...infoStyle }
                }
              >
                <IconButton
                  className={classes.icon}
                  color="primary"
                  href={`https://instagram.com/${
                    isEdit ? instagram : siteView.instagram
                  }`}
                >
                  {this.renderInstagram()}
                </IconButton>
              </Grid>
            ) : null}
            {(siteView && siteView.youtube) || (youtube && youtube) ? (
              <Grid
                item
                style={
                  isEdit
                    ? youtube
                      ? { ...infoStyle }
                      : { display: "none", ...infoStyle }
                    : siteView.youtube
                    ? { ...infoStyle }
                    : { display: "none", ...infoStyle }
                }
              >
                <IconButton
                  className={classes.icon}
                  color="primary"
                  href={isEdit ? youtube : siteView.youtube}
                >
                  {this.renderYoutube()}
                </IconButton>
              </Grid>
            ) : null}
            {(siteView && siteView.whatsapp) || (whatsapp && whatsapp) ? (
              <Grid
                item
                style={
                  isEdit
                    ? whatsapp
                      ? { ...infoStyle }
                      : { display: "none", ...infoStyle }
                    : siteView.whatsapp
                    ? { ...infoStyle }
                    : { display: "none", ...infoStyle }
                }
              >
                <IconButton
                  className={classes.icon}
                  color="primary"
                  href={`https://wa.me/${
                    isEdit ? whatsapp : siteView.whatsapp
                  }`}
                >
                  {this.renderWhatsapp()}
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
          <Grid item sm={6} style={{ backgroundColor: "black" }}>
            {this.renderTooltip()}
          </Grid>
        </Grid>
        <Grid
          container
          item
          justify="center"
          alignItems="flex-end"
          className={classes.navItem}
        >
          {this.renderHeader()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  tabValue: state.tab.navItemValue,
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  navItemIsActive: state.site.navItemIsActive,
  newLogo: state.site.newLogo,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
  phone: state.site.phone,
  selectValue: state.tab.selectNavItemValue,
  newCover: state.site.newCover,
});

const mapDispatchToProps = (dispatch) => ({
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
  updateSelectNavItemValue: (value) =>
    dispatch(updateSelectNavItemValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Header));
