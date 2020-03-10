import {
  Button,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  Typography
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { connect } from "react-redux";
import Switch from "./SwitchButton";
import { closeDialog, openDialog } from "../actions";
import moment from "moment";

const expanStyle = {
  marginTop: "1rem"
};

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
    return (
      <>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" color="primary">
              Last Sync
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container justify={"space-between"}>
                <Grid item>
                  <Typography>Time</Typography>
                </Grid>
                <Grid item>
                  <Typography>{moment().format("LLL")}</Typography>
                </Grid>
              </Grid>
              <Grid item container justify={"center"}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.toggleDialog}
                  >
                    View Log
                  </Button>
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
            <Typography variant="body1" color="primary">
              Manual
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container justify={"center"}>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Sync
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" color="primary">
              Schedule
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container justify={"space-between"}>
                <Grid item>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    style={{ paddingRight: "2rem" }}
                  >
                    Active
                  </Typography>
                </Grid>
                <Grid item>
                  <Switch noLabel />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    style={{ paddingRight: "2rem" }}
                  ></Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openDialog}
                  >
                    Setting
                  </Button>
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
  closeDialog: () => dispatch(closeDialog())
});

export default connect(mapStateToProps, mapDispatchToProps)(SyncEditorTab);
