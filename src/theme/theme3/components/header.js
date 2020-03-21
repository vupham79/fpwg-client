import {
  faFacebookF,
  faInstagram,
  faMailchimp,
  faWhatsapp,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Tab,
  Tabs,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateNavItemValue } from "../../../actions";

const useStyles = theme => ({
  root: {
    position: "relative"
  },
  info: {
    margin: "0.2rem 0.4rem",
    fontSize: "1rem",
    padding: "0 0.4rem",
    color: "white"
  },
  contact: {
    position: "absolute"
  },
  gridIcon: {
    borderRadius: "0.3rem"
  },
  icon: {
    maxHeight: "2rem"
  },
  navItem: {
    position: "absolute",
    top: "70%",
    minHeight: "10vh"
  }
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
      textTransform: "none",
      fontFamily: titleEdit.fontFamily,
      color: "white",
      minWidth: "3vh",
      "&:hover": {
        color: "#40a9ff",
        opacity: 1
      },
      "&$selected": {
        color: "#1890ff"
      },
      "&:focus": {
        color: "#40a9ff"
      }
    };
    return (
      <Tabs
        orientation="horizontal"
        value={tabValue}
        textColor="primary"
        // TabIndicatorProps={
        //   type === "vertical"
        //     ? {
        //         style: {
        //           background: siteEdit.color,
        //           left: 0
        //         }
        //       }
        //     : {
        //         style: {
        //           background: siteEdit.color
        //         }
        //       }
        // }
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

  renderDrawer = () => {
    const { isEdit, siteView, titleView, siteEdit } = this.props;
    return (
      <div style={{ marginTop: "3rem" }}>
        <Divider variant="fullWidth" />
        {isEdit ? (
          siteEdit && this.renderTabItems({ type: "vertical" })
        ) : (
          <List>
            {siteView &&
              siteView.navItems.map((item, index) => (
                <ListItem button key={index}>
                  <NavLink
                    style={{
                      ...titleView,
                      width: "inherit",
                      textAlign: "center",
                      height: "inherit",
                      textDecoration: "none"
                    }}
                    activeStyle={{
                      borderBottom: "1px solid"
                    }}
                    to={`/${siteView.sitePath}/${item.name}`}
                  >
                    {item.name}
                  </NavLink>
                </ListItem>
              ))}
          </List>
        )}
      </div>
    );
  };

  renderUrl = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit.url) {
        return <FontAwesomeIcon icon={faFacebookF} color="white" size="1x" />;
      }
    } else if (siteView.url) {
      return <FontAwesomeIcon icon={faFacebookF} color="white" size="1x" />;
    }
    return <></>;
  };

  renderInstagram = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.instagram) {
        return <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />;
      }
    } else if (siteView && siteView.instagram) {
      return <FontAwesomeIcon icon={faInstagram} color="white" size="1x" />;
    }
    return <></>;
  };

  renderYoutube = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.youtube) {
        return <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />;
      }
    } else if (siteView && siteView.youtube) {
      return <FontAwesomeIcon icon={faYoutube} color="white" size="1x" />;
    }
    return <></>;
  };

  renderEmail = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.email) {
        return <FontAwesomeIcon icon={faMailchimp} color="white" size="1x" />;
      }
    } else if (siteView && siteView.email) {
      return <FontAwesomeIcon icon={faMailchimp} color="white" size="1x" />;
    }
    return <></>;
  };

  renderWhatsapp = () => {
    const { isEdit, siteView, siteEdit } = this.props;
    if (isEdit) {
      if (siteEdit && siteEdit.whatsapp) {
        return <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />;
      }
    } else if (siteView && siteView.whatsapp) {
      return <FontAwesomeIcon icon={faWhatsapp} color="white" size="1x" />;
    }
    return <></>;
  };

  renderNavItems = () => {
    const { classes, siteView, isEdit, titleView } = this.props;
    return (
      <Grid className={classes.navItems}>
        {isEdit
          ? this.renderTabItems({ type: "horizontal" })
          : siteView &&
            siteView.navItems &&
            siteView.navItems.map((item, index) =>
              item.isActive ? (
                <Grid
                  item
                  sm
                  md
                  key={index}
                  style={{
                    textAlign: "end"
                  }}
                >
                  <NavLink
                    style={{
                      ...titleView,
                      textDecoration: "none",
                      color: this.props.navColor,
                      backgroundColor: this.props.headerColor
                    }}
                    activeStyle={{ borderBottom: "1px solid" }}
                    to={`/${siteView.sitePath}/${item.original}`}
                  >
                    {item.name}
                  </NavLink>
                </Grid>
              ) : null
            )}
      </Grid>
    );
  };

  renderHeader = () => {
    const { isEdit } = this.props;
    return (
      <Grid>{isEdit ? this.renderTabItems() : this.renderNavItems()}</Grid>
    );
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
      newCover
    } = this.props;

    const imgStyles = {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    };

    const infoStyle = {
      background: isEdit
        ? hexToRGB(titleEdit.color)
        : hexToRGB(titleView.color),
      fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily
    };
    return (
      <Grid container className={classes.root}>
        <Grid
          container
          item
          style={{
            backgroundImage: `url(${isEdit ? newCover[0] : siteView.cover})`,
            minHeight: "90vh",
            ...imgStyles
          }}
        />
        <Grid
          container
          item
          direction="column"
          alignItems="flex-end"
          justify="flex-end"
          className={classes.contact}
        >
          <Grid item sm={6} className={classes.info} style={{ ...infoStyle }}>
            {isEdit
              ? siteEdit && siteEdit.address
                ? siteEdit.address
                : "This information is private"
              : siteView && siteView.address
              ? siteView.address
              : "This information is private"}
          </Grid>
          <Grid item sm={6} className={classes.info} style={{ ...infoStyle }}>
            {isEdit
              ? siteEdit && siteEdit.phone
                ? siteEdit.phone
                : "This information is private"
              : siteView && siteView.phone
              ? siteView.phone
              : "This information is private"}
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            item
            sm={6}
            className={classes.info}
          >
            {(siteEdit && siteEdit.url) || (siteView && siteView.url) ? (
              <Grid className={classes.gridIcon} item style={{ ...infoStyle }}>
                <IconButton
                  className={classes.icon}
                  aria-label=""
                  color="primary"
                  href={
                    isEdit ? siteEdit && siteEdit.url : siteView && siteView.url
                  }
                >
                  {this.renderUrl()}
                </IconButton>
              </Grid>
            ) : null}

            {(siteEdit && siteEdit.youtube) ||
            (siteView && siteView.youtube) ? (
              <Grid className={classes.gridIcon} item style={{ ...infoStyle }}>
                <IconButton
                  className={classes.icon}
                  aria-label=""
                  color="primary"
                  href={
                    isEdit
                      ? siteEdit && siteEdit.youtube
                      : siteView && siteView.youtube
                  }
                >
                  {this.renderYoutube()}
                </IconButton>
              </Grid>
            ) : null}

            {(siteEdit && siteEdit.email) || (siteView && siteView.email) ? (
              <Grid className={classes.gridIcon} item style={{ ...infoStyle }}>
                <IconButton
                  className={classes.icon}
                  aria-label=""
                  color="primary"
                  href={
                    isEdit
                      ? siteEdit && siteEdit.email
                      : siteView && siteView.email
                  }
                >
                  {this.renderEmail()}
                </IconButton>
              </Grid>
            ) : null}

            {(siteEdit && siteEdit.whatsapp) ||
            (siteView && siteView.whatsapp) ? (
              <Grid className={classes.gridIcon} item style={{ ...infoStyle }}>
                <IconButton
                  className={classes.icon}
                  aria-label=""
                  color="primary"
                  href={
                    isEdit
                      ? siteEdit && siteEdit.whatsapp
                      : siteView && siteView.whatsapp
                  }
                >
                  {this.renderWhatsapp()}
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid
          container
          item
          justify="center"
          className={classes.navItem}
          style={{ ...infoStyle }}
        >
          {this.renderHeader()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
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
  newCover: state.site.newCover
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Header));
