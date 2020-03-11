import {
  Button,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  Typography,
  Divider
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { connect } from "react-redux";
import Switch from "./SwitchButton";
import { closeDialog, openDialog, syncDataFromFB } from "../actions";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

const expanStyle = {
  marginTop: "1rem"
};
const useStyles = theme => ({
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2e2a",
    padding: "0.5rem"
  }
});
class SyncEditorTab extends React.Component {
  state = {
    open: false
  };

  toggleDialog = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { syncDataFromFB, site, classes } = this.props;
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
                    open={this.state.open}
                    maxWidth="sm"
                    fullWidth
                  >
                    <Grid container alignItems="center">
                      {/* <PostsList posts={posts} setActivePost={setActivePost} /> */}
                    </Grid>
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
                    <Typography
                      variant={"subtitle2"}
                      // color="textPrimary"
                      // style={{ paddingRight: "2rem" }}
                    >
                      Active
                    </Typography>
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
