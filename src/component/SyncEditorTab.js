import {
  Button,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  Typography,
  Divider,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  ExpansionPanelDetails,
  AppBar,
  Tab,
  Tabs,
  Box
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon
} from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import Switch from "./SwitchButton";
import { closeDialog, openDialog, syncDataFromFB } from "../actions";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

const expanStyle = {
  marginTop: "1rem"
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = theme => ({
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2e2a",
    padding: "0.5rem"
  }
});

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
class SyncEditorTab extends React.Component {
  state = {
    open: false,
    tab: 0
  };

  selectTab = (event, tab) => {
    this.setState({
      tab: tab
    });
  };
  toggleDialog = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { syncDataFromFB, site, classes } = this.props;
    const { tab, open } = this.state;
    return (
      <>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">Last Sync</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid
                item
                container
                justify={"space-between"}
                className={classes.sideBarBox}
              >
                <Grid item>
                  <Typography variant={"subtitle2"}>Time</Typography>
                </Grid>
                <Grid item>
                  <Typography variant={"subtitle2"}>
                    {site.lastSync
                      ? moment(site.lastSync).format("LLL")
                      : "Not yet"}
                  </Typography>
                </Grid>
              </Grid>
              <Divider
                style={{
                  height: 10,
                  width: "100%",
                  backgroundColor: "#ffffff00"
                }}
              />
              <Grid item container justify={"center"}>
                <Grid item>
                  {site.lastSync && (
                    <Button variant="contained" onClick={this.toggleDialog}>
                      View Log
                    </Button>
                  )}
                  <Dialog
                    onClose={this.toggleDialog}
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    maxWidth="lg"
                    fullWidth
                    fullScreen
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={this.toggleDialog}
                    >
                      {site.lastSync
                        ? moment(site.lastSync).format("LLL")
                        : "Not yet"}
                    </DialogTitle>
                    <DialogContent dividers>
                      <AppBar
                        color={"default"}
                        variant="outlined"
                        position="static"
                      >
                        <Tabs
                          value={tab}
                          onChange={this.selectTab}
                          aria-label="simple tabs example"
                        >
                          <Tab label="Post" {...a11yProps(0)} />
                          <Tab label="Event" {...a11yProps(1)} />
                          <Tab label="Contact" {...a11yProps(2)} />
                        </Tabs>
                      </AppBar>
                      <TabPanel value={tab} index={0}>
                        Post
                      </TabPanel>
                      <TabPanel value={tab} index={1}>
                        Event
                      </TabPanel>
                      <TabPanel value={tab} index={2}>
                        Contact
                      </TabPanel>
                    </DialogContent>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">Manual</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container justify={"center"}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => syncDataFromFB(site.id)}
                  >
                    Sync
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">Schedule</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container className={classes.sideBarBox}>
                <Grid item container sm={6} alignItems={"center"}>
                  <Grid item>
                    <Typography variant={"subtitle2"}>Active</Typography>
                  </Grid>
                </Grid>
                <Grid item container sm={6} justify={"flex-end"}>
                  <Grid item>
                    <Switch noLabel />
                  </Grid>
                </Grid>
              </Grid>
              <Divider
                style={{
                  height: 10,
                  width: "100%",
                  backgroundColor: "#ffffff00"
                }}
              />
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    variant={"subtitle2"}
                    color="textPrimary"
                    style={{ paddingRight: "2rem" }}
                  ></Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant={"subtitle2"}
                    color="textPrimary"
                    style={{ paddingRight: "2rem" }}
                  ></Typography>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
}
const mapStateToProps = state => ({
  site: state.site.siteEdit,
  open: state.dialog.open
});

const mapDispatchToProps = dispatch => ({
  openDialog: () => dispatch(openDialog()),
  closeDialog: () => dispatch(closeDialog()),
  syncDataFromFB: pageId => dispatch(syncDataFromFB(pageId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SyncEditorTab));
