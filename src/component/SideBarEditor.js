import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Tab,
  Tabs
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { saveDesignSite, updateTabValue } from "../actions";
import DesignTab from "./DesignEditorTab";
import PagesEditorTab from "./PagesEditorTab";
import SettingEditorTab from "./SettingEditorTab";
import SyncEditorTab from "./SyncEditorTab";

const useStyles = theme => ({
  root: {
    height: "100vh"
  },
  drawer: {
    flexShrink: 0,
    height: "100%"
  },
  drawerPaper: {
    padding: "0.5rem",
    position: "relative",
    height: "100%"
  }
});

const tabStyles = {
  textTransform: "none",
  minWidth: "5vh",
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

class ClippedDrawer extends React.Component {
  render() {
    const {
      classes,
      tabValue,
      updateTabValue,
      siteEdit,
      saveDesignSite,
      newLogo,
      newCover
    } = this.props;

    return (
      <AppBar className={classes.root} position="sticky">
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Tabs
            value={tabValue}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            centered
            onChange={(e, newValue) => updateTabValue(newValue)}
          >
            <Tab style={tabStyles} label="Design" />
            <Tab style={tabStyles} label="Page" />
            <Tab style={tabStyles} label="Setting" />
            <Tab style={tabStyles} label="Sync" />
          </Tabs>
          {tabValue === 0 && <DesignTab />}
          {tabValue === 1 && <PagesEditorTab />}
          {tabValue === 2 && <SettingEditorTab />}
          {tabValue === 3 && <SyncEditorTab />}
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Button
            fullWidth
            style={{ minHeight: "3rem" }}
            color="primary"
            variant="contained"
            onClick={() =>
              saveDesignSite({ site: siteEdit, logo: newLogo, cover: newCover })
            }
          >
            Save Design
          </Button>
        </Drawer>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  tabValue: state.tab.value,
  siteEdit: state.site.siteEdit,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover
});

const mapDispatchToProps = dispatch => ({
  updateTabValue: value => dispatch(updateTabValue(value)),
  saveDesignSite: ({ site, logo, cover }) =>
    dispatch(saveDesignSite({ site, logo, cover }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ClippedDrawer));
