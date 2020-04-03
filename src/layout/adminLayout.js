import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  CssBaseline,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar
} from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import DomainIcon from "@material-ui/icons/Domain";
import { CategoryOutlined as CategoryIcon } from "@material-ui/icons";
import { updateAdminTabIndex } from "../actions/adminTab";
import { connect } from "react-redux";
import { setLogoutAdmin } from "../actions";

const drawerWidth = 240;
const useStyles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
});
class Dashboard extends Component {
  state = {
    open: false
  };
  setOpen = open => {
    this.setState({
      open: open
    });
  };

  handleDrawerOpen = () => {
    this.setOpen(true);
  };
  handleDrawerClose = () => {
    this.setOpen(false);
  };
  handleLogout = () => {
    this.props.setLogoutAdmin();
  };

  render() {
    const { classes, selectedAdminIndex, updateAdminTabIndex } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <Button
              type="submit"
              variant="contained"
              onClick={() => this.handleLogout()}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              selected={selectedAdminIndex === 0}
              onClick={(e, newValue) => updateAdminTabIndex(0)}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem
              button
              selected={selectedAdminIndex === 1}
              onClick={(e, newValue) => updateAdminTabIndex(1)}
            >
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Sites" />
            </ListItem>
            <ListItem
              button
              selected={selectedAdminIndex === 2}
              onClick={(e, newValue) => updateAdminTabIndex(2)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Themes" />
            </ListItem>
            <ListItem
              button
              selected={selectedAdminIndex === 3}
              onClick={(e, newValue) => updateAdminTabIndex(3)}
            >
              <ListItemIcon>
                <DomainIcon />
              </ListItemIcon>
              <ListItemText primary="Paths" />
            </ListItem>
            <ListItem
              button
              selected={selectedAdminIndex === 4}
              onClick={(e, newValue) => updateAdminTabIndex(4)}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Theme Category" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>{this.props.children}</Paper>
              </Grid>
            </Grid>
            <Box pt={4} />
          </Container>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectedAdminIndex: state.adminTab.selectedAdminIndex
});

const mapDispatchToProps = dispatch => ({
  updateAdminTabIndex: index => dispatch(updateAdminTabIndex(index)),
  setLogoutAdmin: index => dispatch(setLogoutAdmin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Dashboard));
