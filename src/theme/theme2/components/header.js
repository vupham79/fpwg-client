import {
  AppBar,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Tooltip,
  Zoom,
  IconButton,
  withStyles,
  ListItem,
  List,
  Divider,
  Hidden,
  Drawer
} from "@material-ui/core";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNavItemValue } from "../../../actions";
import styles from "./index.module.css";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  navItems: {
    maxWidth: "max-content",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  drawerPaper: {
    width: drawerWidth
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
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
  renderTabItems = ({ type }) => {
    const { tabValue, updateNavItemValue, siteEdit, titleEdit } = this.props;
    const tabStyles = {
      textTransform: "none",
      fontFamily: titleEdit.fontFamily,
      color: titleEdit.color,
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
        orientation={type}
        value={tabValue}
        textColor="primary"
        centered
        TabIndicatorProps={{
          style: { background: siteEdit.color, left: 0 }
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

  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      navItemIsActive,
      classes
    } = this.props;
    const imgStyles = {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "5rem"
    };

    const linkView = {
      fontFamily: titleView.fontFamily,
      color: titleView.color,
      textDecoration: "none"
    };
    return (
      <>
        <AppBar className={styles.app_bar} position="sticky">
          <Container>
            <Grid container alignItems="center">
              <Grid
                container
                item
                md={2}
                sm={2}
                xs={2}
                style={{
                  ...imgStyles,
                  backgroundImage: this.renderImage()
                }}
              />
              <Grid
                item
                md={1}
                sm={4}
                xs={4}
                className={styles.shopName}
                style={isEdit ? titleEdit : titleView}
              >
                {/* <Grid
                  id={"siteLogo"}
                  item
                  sm={2}
                  xs={3}
                  style={{
                    ...imgStyles,
                    backgroundImage: isEdit
                      ? `url('${siteEdit.logo}')`
                      : `url('${siteView.logo}')`
                  }}
                /> */}
                {/* <Grid
                  item
                  sm={3}
                  xs={7}
                  className={styles.shopName}
                  style={isEdit ? titleEdit : titleView}
                > */}
                {isEdit
                  ? siteEdit && siteEdit.title
                  : siteView && siteView.title}
                {/* </Grid> */}
                <Grid>
                  {!isEdit && !navItemIsActive && (
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="This page is currently inactive"
                    >
                      <Button>
                        <FontAwesomeIcon
                          color={"orange"}
                          icon={faExclamation}
                        />
                      </Button>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
              <Grid item container xs={6} sm={12} md={9} justify="flex-end">
                <Grid
                  container
                  item
                  sm={10}
                  className={classes.navItems}
                  justify="flex-end"
                >
                  {isEdit
                    ? this.renderTabItems({ type: "horizontal" })
                    : siteView.navItems &&
                      siteView.navItems.map((item, index) =>
                        item.isActive ? (
                          <Grid
                            item
                            sm={2}
                            key={index}
                            style={{
                              textAlign: "end"
                            }}
                          >
                            <NavLink
                              style={linkView}
                              activeStyle={{ borderBottom: "1px solid" }}
                              to={`/${siteView.sitePath}/${item.name}`}
                            >
                              {item.name}
                            </NavLink>
                          </Grid>
                        ) : null
                      )}
                </Grid>
                <Grid item>
                  <IconButton
                    style={isEdit ? titleEdit : titleView}
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={"right"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {this.renderDrawer({
                site: siteView,
                titleView: titleView
              })}
            </Drawer>
          </Hidden>
        </nav>
      </>
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
  navItemIsActive: state.site.navItemIsActive,
  newLogo: state.site.newLogo
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Header));
