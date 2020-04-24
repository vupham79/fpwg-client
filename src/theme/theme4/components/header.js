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
  Tooltip,
  Typography,
  withStyles,
  Zoom,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setPostView } from "../../../actions";

const drawerWidth = 240;

const useStyles = (theme) => ({
  header: {
    top: 0,
    position: "absolute",
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "unset",
    },
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
    backgroundColor: "#121212",
  },
  tooltip: {
    border: "2px solid orange",
  },
  navItemLinks: {
    "&:hover": {
      cursor: "pointer",
      color: "#A5B9BC !important",
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

  componentDidUpdate() {
    const { postView } = this.props;
    if (postView) {
      document.getElementById(`${this.state.name.toLowerCase()}`) &&
        document
          .getElementById(`${this.state.name.toLowerCase()}`)
          .scrollIntoView({ block: "start", behavior: "smooth" });
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
    const { siteEdit, isEdit, siteView, setPostView, postView } = this.props;
    const section = (isEdit ? siteEdit.navItems : siteView.navItems).find(
      (item) => item.name === name
    ).original;
    if (isEdit) {
      if (postView) {
        setPostView(null);
        this.setState({ name: section });
      }
    } else {
      if (postView) {
        this.props.history.push(`/${siteView.sitePath}`);
        setPostView(null);
        this.setState({ name: section });
      }
    }
    document.getElementById(`${section.toLowerCase()}`) &&
      document
        .getElementById(`${section.toLowerCase()}`)
        .scrollIntoView({ block: "start", behavior: "smooth" });
  };

  renderNavLinks = (navItems) => {
    const { classes, titleView, titleEdit, isEdit } = this.props;
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
                    textAlign: "center",
                    minWidth: "12vh",
                  }}
                >
                  <Typography
                    style={{
                      fontFamily: isEdit
                        ? titleEdit.fontFamily
                        : titleView.fontFamily,
                      color: isEdit ? titleEdit.color : titleView.color,
                      textTransform: "uppercase",
                      fontSize: 14,
                      fontWeight: "bold",
                      padding: "0 0.5rem",
                      overflow: "hidden",
                      mixBlendMode: "difference",
                      wordBreak: "break-word",
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
      classes,
      titleEdit,
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
                    fontFamily: isEdit
                      ? titleEdit.fontFamily
                      : titleView.fontFamily,
                    // color: isEdit ? titleEdit.color : titleView.color,
                    color: "#fff",
                    textTransform: "uppercase",
                    fontSize: 18,
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
        aria-label="open drawer"
        edge="start"
        onClick={this.handleDrawerToggle}
        style={{ color: isEdit ? titleEdit.color : titleView.color }}
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

  renderHeader = ({ displayImg, imgStyles, isEdit }) => {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        style={displayImg ? null : { padding: "1rem 2rem" }}
      >
        <Grid
          container
          alignItems="center"
          item
          sm={12}
          md={8}
          xs={4}
          justify="flex-start"
        >
          <Grid
            style={isEdit ? null : { width: "inherit", padding: "1rem 0" }}
            className={classes.navLink}
          >
            {this.renderNavItems()}
          </Grid>
          <Grid container justify="flex-start" className={classes.menuButton}>
            {this.renderMenuButton()}
            {this.showHideDrawer({ anchor: "left", pos: "left" })}
          </Grid>
        </Grid>
      </Grid>
    );
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
      <AppBar position="sticky" style={{ backgroundColor: "unset" }}>
        <Grid container alignItems="center" className={classes.header}>
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
  postView: state.post.postView,
});

const mapDispatchToProps = (dispatch) => ({
  setPostView: (post) => dispatch(setPostView(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(Header)));
