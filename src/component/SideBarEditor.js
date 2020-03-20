import {
  faArrowLeft,
  faTimes as faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Button, CssBaseline, Drawer, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { saveDesignSite, updateTabValue } from "../actions";
import AccordionButton from "../theme/component/mainComponent";
import DesignTab from "./DesignEditorTab";
import Link from "./link";
import PagesEditorTab from "./PagesEditorTab";
import SettingEditorTab from "./SettingEditorTab";
import SyncEditorTab from "./SyncEditorTab";
import ThemeEditorTab from "./ThemeEditorTab";
import HomepageEditorTab from "./HomepageEditorTab";

const useStyles = theme => ({
  root: {
    height: "100vh"
  },
  drawer: {
    flexShrink: 0,
    height: "100%"
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    backgroundColor: "#f0eded"
    // minWidth: 300
    // overflowY: "scroll"
  }
});

class ClippedDrawer extends React.Component {
  state = {
    currentNavName: "",
    navigating: false
  };

  setNavigating = (bool, name) => {
    this.setState({
      navigating: bool,
      currentNavName: name
    });
  };

  render() {
    const {
      classes,
      siteEdit,
      saveDesignSite,
      newLogo,
      newCover,
      youtube,
      sitepath,
      instagram,
      whatsapp,
      email,
      phone
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
          <Grid container style={{ border: "1px solid #dddddd" }}>
            <Grid item xs={2}>
              <Link to="/view">
                <Button
                  fullWidth
                  style={{
                    borderRight: "1px solid #dddddd",
                    borderRadius: 0,
                    color: "#565d66",
                    fontSize: 14,
                    fontWeight: "bold",
                    height: 40
                  }}
                >
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    // color="#0074aa"
                    size="sm"
                  />
                </Button>
              </Link>
            </Grid>
            <Grid
              item
              xs={10}
              style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 10 }}
            >
              <Button
                variant="contained"
                style={{
                  float: "right",
                  backgroundColor: "#0074aa",
                  width: 70,
                  borderRadius: 5,
                  color: "white",
                  fontSize: 11
                }}
                onClick={() =>
                  saveDesignSite({
                    site: siteEdit,
                    logo: newLogo,
                    cover: newCover,
                    youtube,
                    sitepath,
                    instagram,
                    whatsapp,
                    email,
                    phone
                  })
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ backgroundColor: "white" }}>
            <Grid
              item
              xs={2}
              style={{ display: this.state.navigating ? "block" : "none" }}
            >
              <Button
                onClick={() => this.setNavigating(false, "")}
                fullWidth
                style={{
                  borderRight: "1px solid #dddddd",
                  borderRadius: 0,
                  borderLeft: "4px solid #0074aa",
                  height: 80,
                  minWidth: "unset"
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} color="#0074aa" size="2x" />
              </Button>
            </Grid>
            <Grid container item xs={10} style={{ padding: 15 }}>
              <Grid item xs={12} style={{ color: "#555d66", fontSize: 13 }}>
                {this.state.navigating ? "" : "You are customizing"}
              </Grid>
              <Grid item xs={12}>
                <strong
                  style={{
                    fontFamily: "Segoe UI Light",
                    fontSize: 20,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    display: "block",
                    color: "#555d66"
                  }}
                >
                  {this.state.navigating
                    ? this.state.currentNavName
                    : this.props.siteEdit.title}
                </strong>
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ height: 50 }} />

          <AccordionButton
            comp={<ThemeEditorTab />}
            label="Select theme"
            currentNav={this.state.currentNavName}
            isNav={this.state.navigating}
            setNav={this.setNavigating}
          />
          <AccordionButton
            comp={<DesignTab />}
            label="Customize theme"
            currentNav={this.state.currentNavName}
            isNav={this.state.navigating}
            setNav={this.setNavigating}
          />
          <AccordionButton
            comp={<PagesEditorTab />}
            label="Pages"
            currentNav={this.state.currentNavName}
            isNav={this.state.navigating}
            setNav={this.setNavigating}
          />
          <AccordionButton
            comp={<HomepageEditorTab />}
            label="Homepage Settings"
            currentNav={this.state.currentNavName}
            isNav={this.state.navigating}
            setNav={this.setNavigating}
          />
          <AccordionButton
            comp={<SettingEditorTab />}
            label="Settings"
            currentNav={this.state.currentNavName}
            isNav={this.state.navigating}
            setNav={this.setNavigating}
          />
          <AccordionButton
            comp={<SyncEditorTab />}
            label="Sync"
            currentNav={this.state.currentNavName}
            isNav={this.state.navigating}
            setNav={this.setNavigating}
          />
        </Drawer>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  tabValue: state.tab.value,
  siteEdit: state.site.siteEdit,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover,
  youtube: state.site.youtube,
  sitepath: state.site.sitepath,
  instagram: state.site.instagram,
  whatsapp: state.site.whatsapp,
  email: state.site.email,
  phone: state.site.phone,
  isPreview: state.site.isPreview
});

const mapDispatchToProps = dispatch => ({
  updateTabValue: value => dispatch(updateTabValue(value)),
  saveDesignSite: data => dispatch(saveDesignSite(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ClippedDrawer));
