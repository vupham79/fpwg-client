import {
  faArrowLeft,
  faTimes as faWindowClose,
  faTablet,
  faDesktop,
  faTabletAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  saveDesignSite,
  setIsChanged,
  updateTabValue,
  setFramePreview,
} from "../actions";
import AccordionButton from "../theme/component/mainComponent";
import DesignTab from "./DesignEditorTab";
import HomepageEditorTab from "./HomepageEditorTab";
import Link from "./link";
import PagesEditorTab from "./PagesEditorTab";
import SettingEditorTab from "./SettingEditorTab";
import SyncEditorTab from "./SyncEditorTab";
import ThemeEditorTab from "./ThemeEditorTab";
import styles from "./index.module.css";

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  drawer: {
    flexShrink: 0,
    height: "100%",
  },
  drawerPaper: {
    position: "relative",
    height: "100%",
    backgroundColor: "#f0eded",
  },
});

class ClippedDrawer extends React.Component {
  state = {
    currentNavName: "",
    navigating: false,
    open: false,
  };

  setNavigating = (bool, name) => {
    this.setState({
      navigating: bool,
      currentNavName: name,
    });
  };

  openDialog = () => {
    const { isChanged } = this.props;
    if (isChanged) {
      this.setState({ open: true });
    } else {
      this.props.history.push("/view");
    }
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    const { setIsChangedToFalse } = this.props;
    setIsChangedToFalse();
    this.setState({ open: false });
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
      phone,
      posts,
      address,
    } = this.props;
    return (
      <AppBar className={classes.root} position="sticky">
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Grid container style={{ border: "1px solid #dddddd" }}>
            <Grid item xs={2}>
              <Button
                fullWidth
                style={{
                  borderRight: "1px solid #dddddd",
                  borderRadius: 0,
                  color: "#565d66",
                  fontSize: 14,
                  fontWeight: "bold",
                  height: "100%",
                }}
                onClick={this.openDialog}
              >
                <FontAwesomeIcon icon={faWindowClose} size="sm" />
              </Button>
              <Dialog
                open={this.state.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Unsaved Changes
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You haven't save changes. Confirm if you want to discard all
                    changes and back to homepage?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.closeDialog} color="primary">
                    Cancel
                  </Button>
                  <Link to="/view">
                    <Button
                      onClick={this.handleConfirm}
                      color="primary"
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
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
                  borderRadius: 5,
                  color: "white",
                  fontSize: 11,
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
                    phone,
                    posts,
                    address,
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
                  minWidth: "unset",
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
                    color: "#555d66",
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

          <Grid container>
            <Grid item xs={12}>
              <AccordionButton
                comp={<ThemeEditorTab />}
                label="Select theme"
                currentNav={this.state.currentNavName}
                isNav={this.state.navigating}
                setNav={this.setNavigating}
              />
            </Grid>
            <Grid item xs={12}>
              <AccordionButton
                comp={<DesignTab />}
                label="Customize theme"
                currentNav={this.state.currentNavName}
                isNav={this.state.navigating}
                setNav={this.setNavigating}
              />
            </Grid>
            <Grid item xs={12}>
              <AccordionButton
                comp={<PagesEditorTab />}
                label="Content settings"
                currentNav={this.state.currentNavName}
                isNav={this.state.navigating}
                setNav={this.setNavigating}
              />
            </Grid>
            <Grid item xs={12}>
              <AccordionButton
                comp={<HomepageEditorTab />}
                label="Homepage settings"
                currentNav={this.state.currentNavName}
                isNav={this.state.navigating}
                setNav={this.setNavigating}
              />
            </Grid>
            <Grid item xs={12}>
              <AccordionButton
                comp={<SettingEditorTab />}
                label="Links"
                currentNav={this.state.currentNavName}
                isNav={this.state.navigating}
                setNav={this.setNavigating}
              />
            </Grid>
            <Grid item xs={12}>
              <AccordionButton
                comp={<SyncEditorTab />}
                label="Sync"
                currentNav={this.state.currentNavName}
                isNav={this.state.navigating}
                setNav={this.setNavigating}
              />
            </Grid>
          </Grid>

          {/* <Grid
            container
            item
            justify="center"
            style={{
              borderTop: "1px solid #dddddd",
              bottom: 0,
              position: this.state.navigating ? "sticky" : "absolute",
              backgroundColor: "#f0eded",
              zIndex: 999999,
            }}
            xs={12}
          >
            <Grid item className={styles.fadeShow}>
              <IconButton
                aria-label=""
                color="primary"
                onClick={() => this.props.setFramePreview(0)}
              >
                <FontAwesomeIcon icon={faDesktop} color="#565d66" size="sm" />
              </IconButton>
            </Grid>
            <Grid item className={styles.fadeShow}>
              <IconButton
                aria-label=""
                color="primary"
                onClick={() => this.props.setFramePreview(1)}
              >
                <FontAwesomeIcon icon={faTablet} color="#565d66" size="sm" />
              </IconButton>
            </Grid>
            <Grid item className={styles.fadeShowPhone}>
              <IconButton
                aria-label=""
                color="primary"
                onClick={() => this.props.setFramePreview(2)}
              >
                <FontAwesomeIcon icon={faTabletAlt} color="#565d66" size="xs" />
              </IconButton>
            </Grid>
          </Grid> */}
        </Drawer>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
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
  isPreview: state.site.isPreview,
  posts: state.post.posts,
  isChanged: state.site.isChanged,
  address: state.site.address,
});

const mapDispatchToProps = (dispatch) => ({
  updateTabValue: (value) => dispatch(updateTabValue(value)),
  saveDesignSite: (data) => dispatch(saveDesignSite(data)),
  setIsChangedToFalse: () => dispatch(setIsChanged()),
  setFramePreview: (mode) => dispatch(setFramePreview(mode)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(ClippedDrawer)));
