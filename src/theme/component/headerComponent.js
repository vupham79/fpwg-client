import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  Tab,
  Tabs,
  Tooltip,
  withStyles,
  Zoom,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPostView, updateNavItemValue } from "../../actions";

const drawerWidth = 240;

const useStyles = (theme) => ({
  app_bar: {
    backgroundColor: "white",
  },
  shopName: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
    overflow: "hidden",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  navItems: {
    display: "none",
    marginRight: "2rem",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  tooltip: {
    border: "2px solid orange",
  },
});

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabValue !== this.props.tabValue)
      window.location.href = "#topPos";
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return `url('${URL.createObjectURL(newLogo)}'`;
      } else return `url('${siteEdit.logo}')`;
    }
    return `url('${siteView.logo}')`;
  };

  handleChangeTab = (newValue) => {
    const { updateNavItemValue, setPostView } = this.props;
    updateNavItemValue(newValue);
    setPostView(null);
  };

  renderTabItems = ({ type, pos }) => {
    const { tabValue, siteEdit, titleEdit, navTextColor } = this.props;
    const tabStyles = {
      fontFamily: titleEdit.fontFamily,
      color: navTextColor ? navTextColor : this.props.navColor,
      minWidth: "10vh",
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
      },
      "&:focus": {
        color: "#40a9ff",
      },
      textAlign: "left",
      textTransform: "uppercase",
      fontSize: 14,
    };
    return (
      <Tabs
        id="topPos"
        variant="fullWidth"
        orientation={type}
        value={tabValue}
        textColor="primary"
        TabIndicatorProps={
          type === "vertical"
            ? pos === "right"
              ? {
                  style: {
                    background: siteEdit.color,
                    right: 0,
                  },
                }
              : {
                  style: {
                    background: siteEdit.color,
                    left: 0,
                  },
                }
            : {
                style: {
                  background: siteEdit.color,
                },
              }
        }
        onChange={(e, newValue) => this.handleChangeTab(newValue)}
      >
        {siteEdit &&
          siteEdit.navItems.map((item, index) =>
            item.isActive ? (
              <Tab style={tabStyles} label={item.name} key={index} />
            ) : null
          )}
      </Tabs>
    );
  };

  renderNavItems = () => {
    const { classes, siteView, isEdit, titleView, navTextColor } = this.props;
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
                    textAlign: "end",
                  }}
                >
                  <NavLink
                    style={{
                      ...titleView,
                      textDecoration: "none",
                      color: navTextColor ? navTextColor : this.props.navColor,
                      backgroundColor: this.props.headerColor,
                      textTransform: "uppercase",
                      fontSize: 14,
                    }}
                    activeStyle={{
                      borderBottom: "1px solid",
                      borderColor: this.props.navColor,
                    }}
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

  renderDrawer = ({ pos }) => {
    const { isEdit, siteView, titleView, siteEdit } = this.props;
    return (
      <div style={{ marginTop: "3rem" }}>
        <Divider variant="fullWidth" />
        {isEdit ? (
          siteEdit && this.renderTabItems({ type: "vertical", pos: pos })
        ) : (
          <List>
            {siteView &&
              siteView.navItems.map((item, index) =>
                item.isActive ? (
                  <ListItem button key={index}>
                    <NavLink
                      style={{
                        ...titleView,
                        width: "inherit",
                        textAlign: "center",
                        height: "inherit",
                        textDecoration: "none",
                      }}
                      activeStyle={{
                        borderBottom: "1px solid",
                      }}
                      to={`/${siteView.sitePath}/${item.name}`}
                    >
                      {item.name}
                    </NavLink>
                  </ListItem>
                ) : null
              )}
          </List>
        )}
      </div>
    );
  };

  showHideDrawer = ({ anchor, pos }) => {
    const { classes } = this.props;
    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={anchor}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {this.renderDrawer({ pos: pos })}
          </Drawer>
        </Hidden>
      </nav>
    );
  };

  renderMenuButton = () => {
    const { classes, isEdit, titleEdit, titleView } = this.props;
    return (
      <IconButton
        style={isEdit ? titleEdit : titleView}
        aria-label="open drawer"
        edge="start"
        onClick={this.handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
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

  renderTitle = () => {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteEdit,
      siteView,
      classes,
    } = this.props;
    return (
      <Grid className={classes.shopName} style={isEdit ? titleEdit : titleView}>
        {isEdit ? siteEdit && siteEdit.title : siteView && siteView.title}
      </Grid>
    );
  };

  renderHeader = ({ navPos, displayImg, imgStyles, isEdit }) => {
    if (navPos === "left") {
      return (
        <Grid
          container
          alignItems="center"
          style={
            displayImg
              ? { backgroundColor: this.props.headerColor }
              : { padding: "1rem", backgroundColor: this.props.headerColor }
          }
        >
          <Grid container item md={7} sm={12} xs={5} justify="flex-start">
            <Grid item>
              {this.renderMenuButton()}
              {this.showHideDrawer({ anchor: "left", pos: "right" })}
            </Grid>
            <Grid item sm={12} xs={12}>
              {this.renderNavItems()}
            </Grid>
          </Grid>
          {displayImg ? (
            <Grid container item md={5} sm={12} xs={5}>
              <Grid
                container
                alignItems="center"
                justify="flex-end"
                item
                md={8}
                sm={6}
                xs={6}
              >
                {this.renderTitle()}
              </Grid>
              <Grid
                item
                md={2}
                sm={2}
                xs={4}
                style={{
                  ...imgStyles,
                  backgroundImage: this.renderImage(),
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            </Grid>
          ) : (
            <Grid
              container
              item
              md={5}
              sm={7}
              xs={4}
              justify="flex-end"
              alignItems="center"
            >
              {this.renderTitle()}
            </Grid>
          )}
        </Grid>
      );
    } else if (navPos === "right") {
      return (
        <Grid
          container
          alignItems="center"
          style={displayImg ? null : { padding: "1rem" }}
        >
          {displayImg ? (
            <Grid container item md={6} sm={6} xs={8}>
              <Grid
                item
                md={4}
                sm={4}
                xs={4}
                style={{
                  ...imgStyles,
                  backgroundImage: this.renderImage(),
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
              <Grid container alignItems="center" item md={6} sm={6} xs={8}>
                {this.renderTitle()}
              </Grid>
            </Grid>
          ) : (
            <Grid container item md={6} sm={6} xs={8}>
              <Grid
                container
                justify="flex-start"
                style={{ paddingLeft: "2rem" }}
              >
                {this.renderTitle()}
              </Grid>
            </Grid>
          )}
          <Grid
            container
            justify="center"
            alignItems="center"
            item
            md={6}
            sm={12}
            xs={4}
          >
            <Grid
              style={isEdit ? null : { width: "inherit", padding: "1rem 0" }}
            >
              {this.renderNavItems()}
            </Grid>
            <Grid container justify="flex-end">
              {this.renderMenuButton()}
              {this.showHideDrawer({ anchor: "right", pos: "left" })}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  render() {
    const { classes, navPos, displayImg, isEdit } = this.props;
    const imgStyles = {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "3.5rem",
    };

    return (
      <AppBar
        className={classes.app_bar}
        position={navPos === "center" ? "static" : "sticky"}
      >
        <Grid
          container
          alignItems="center"
          style={{ backgroundColor: this.props.headerColor }}
        >
          <Grid item xs={10}>
            {this.renderHeader({
              imgStyles: imgStyles,
              navPos: navPos,
              displayImg: displayImg,
              isEdit: isEdit,
            })}
          </Grid>
          <Grid item sm={1} xs={2}>
            {this.renderTooltip()}
          </Grid>
        </Grid>
      </AppBar>
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
  navItemIsActive: state.site.navItemIsActive,
  newLogo: state.site.newLogo,
});

const mapDispatchToProps = (dispatch) => ({
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
  setPostView: (post) => dispatch(setPostView(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HeaderComponent));
