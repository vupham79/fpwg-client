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
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setPostView, updateNavItemValue } from "../../../actions";

const drawerWidth = 240;

const useStyles = (theme) => ({
  app_bar: {
    backgroundColor: "white",
  },
  shopName: {
    fontSize: 34,
    textAlign: "center",
    fontWeight: "700",
    overflow: "hidden",
    textTransform: "uppercase",
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
  navLink: {
    display: "none",
    width: "-webkit-fill-available",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  tooltip: {
    border: "2px solid orange",
  },
  navItemLinks: {
    "&:hover": {
      cursor: "pointer",
      color: "rgb(41, 186, 74) !important",
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      name: "home",
    };
  }

  componentDidUpdate(prevProps) {
    const { isEdit, siteView } = this.props;
    if (prevProps.name !== this.state.name) {
      console.log(this.state.name.toLowerCase());
      window.location.href = `#${this.state.name.toLowerCase()}`;

      window.history.pushState(
        "",
        "",
        isEdit ? "/edit" : `${siteView.sitePath}`
      );
    }
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

  handleChange = (name) => {
    this.setState({ name: name });
  };

  renderNavLinks = (navItems) => {
    const { classes, titleView, navTextColor } = this.props;
    return (
      <>
        {navItems &&
          navItems.map(
            (item, index) =>
              item.isActive && (
                <Grid
                  item
                  sm
                  md
                  key={index}
                  style={{
                    textAlign: "end",
                    minWidth: "12vh",
                  }}
                >
                  <Typography
                    style={{
                      ...titleView,
                      color: navTextColor ? navTextColor : this.props.navColor,
                      textTransform: "uppercase",
                      fontSize: 12,
                      padding: "0.25rem",
                    }}
                    className={classes.navItemLinks}
                    onClick={() => this.handleChange(item.name)}
                  >
                    {item.name}
                  </Typography>
                </Grid>
              )
          )}
      </>
    );
  };

  renderNavItems = () => {
    const { classes, siteView, isEdit, siteEdit } = this.props;
    return (
      <Grid className={classes.navItems}>
        {this.renderNavLinks(
          isEdit ? siteEdit && siteEdit.navItems : siteView && siteView.navItems
        )}
      </Grid>
    );
  };

  renderDrawer = () => {
    const {
      isEdit,
      siteView,
      siteEdit,
      titleView,
      navTextColor,
      classes,
    } = this.props;
    return (
      <div style={{ marginTop: "3rem" }}>
        <Divider variant="fullWidth" />
        <List>
          {(isEdit
            ? siteEdit && siteEdit.navItems
            : siteView && siteView.navItems
          ).map((item, index) =>
            item.isActive ? (
              <ListItem button key={index} style={{ padding: "0" }}>
                <Typography
                  style={{
                    ...titleView,
                    color: navTextColor ? navTextColor : this.props.navColor,
                    textTransform: "uppercase",
                    fontSize: 12,
                    padding: "1rem 0",
                    textAlign: "center",
                    width: "-webkit-fill-available",
                  }}
                  className={classes.navItemLinks}
                  onClick={() => this.handleChange(item.name)}
                >
                  {item.name}
                </Typography>
              </ListItem>
            ) : null
          )}
        </List>
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
    const { isEdit, titleEdit, titleView } = this.props;
    return (
      <IconButton
        style={isEdit ? titleEdit : titleView}
        aria-label="open drawer"
        edge="start"
        onClick={this.handleDrawerToggle}
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
    const { classes } = this.props;
    if (navPos === "right") {
      return (
        <Grid
          container
          alignItems="center"
          style={displayImg ? null : { padding: "1.7rem 0" }}
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
                style={{ paddingLeft: "5rem" }}
              >
                {this.renderTitle()}
              </Grid>
            </Grid>
          )}
          <Grid container alignItems="center" item md={6} sm={12} xs={4}>
            <Grid
              style={isEdit ? null : { width: "inherit", padding: "1rem 0" }}
              className={classes.navLink}
            >
              {this.renderNavItems()}
            </Grid>
            <Grid container justify="flex-end" className={classes.menuButton}>
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
      backgroundPosition: "right",
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
          <Grid item xs={11}>
            {this.renderHeader({
              imgStyles: imgStyles,
              navPos: navPos,
              displayImg: displayImg,
              isEdit: isEdit,
            })}
          </Grid>
          <Grid item xs={1}>
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
)(withStyles(useStyles)(Header));
