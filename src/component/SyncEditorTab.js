import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon
} from "@material-ui/icons";
import moment from "moment";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  applyAutoSync,
  closeDialog,
  openDialog,
  setAutoSync,
  syncDataFromFB,
  syncEventFromFB,
  syncGalleryFromFB,
  syncPostFromFB
} from "../actions";
import ButtonComponent from "./Button";

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
  },
  gridBtnSync: {
    margin: "0.2rem 0"
  },
  datePicker: {
    padding: "0.2rem 0",
    margin: "0.1rem 0"
  },
  picker: {
    height: "1.8rem",
    width: "-webkit-fill-available",
    padding: "0 0.5rem"
  },
  gridItem: {
    padding: "0.5rem 0"
  },
  "&.MuiSelect-outlined": {
    padding: "0"
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

const tableStyle = makeStyles({
  success: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#5ea95a",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center"
  },
  failed: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#cc2127",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center"
  }
});

function CreateTable({ data }) {
  const classes = tableStyle();
  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead style={{ backgroundColor: "#ccccb3" }}>
          <TableRow>
            <TableCell align="center">Sync At</TableCell>
            <TableCell align="center">Data Type</TableCell>
            <TableCell align="center">Sync Type</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {moment(row.createdAt).format("LT-DD-MM-YYYY")}
                </TableCell>
                <TableCell align="center">{row.dataType}</TableCell>
                <TableCell align="center">
                  {!row.dateFrom && !row.dateTo ? (
                    "All"
                  ) : (
                    <Grid container justify="center">
                      <Grid item xs={12}>
                        From: {moment(row.dateFrom).format("DD-MM-YYYY")}
                      </Grid>
                      <Grid item xs={12}>
                        To: {moment(row.dateTo).format("DD-MM-YYYY")}
                      </Grid>
                    </Grid>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Grid
                    container
                    className={"mainFont"}
                    style={{ fontSize: "12px", overflow: "hidden" }}
                    justify="center"
                  >
                    <Grid
                      item
                      className={
                        row.status.toString() === "true"
                          ? classes.success
                          : classes.failed
                      }
                    >
                      {row.status.toString() === "true"
                        ? "Success "
                        : "Failed "}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
class SyncEditorTab extends React.Component {
  state = {
    open: false,
    tab: 0,
    radioValue: "",
    startDate: new Date(),
    endDate: new Date(),
    selectValue: "All",
    msg: null,
    selectValueSchedule: "None"
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

  handleRadioChange = event => {
    this.setState({ radioValue: event.target.value });
  };
  setStartDate = date => {
    this.setState({ startDate: date });
  };
  setEndDate = date => {
    this.setState({ endDate: date });
  };

  handleChange = event => {
    this.setState({
      selectValue: event.target.value
    });
  };

  handleChangeSchedule = e => {
    const { setAutoSync } = this.props;
    setAutoSync({
      dataType: e.target.value
    });
  };

  handleChangeScheduleTime = e => {
    const { setAutoSync, site } = this.props;
    const time = e.target.value;
    switch (time) {
      case "2min":
        setAutoSync({
          dataType: site.autoSync.dataType,
          minute: 2
        });
        break;
      case "30min":
        setAutoSync({
          dataType: site.autoSync.dataType,
          minute: 30
        });
        break;
      case "1hr":
        setAutoSync({
          dataType: site.autoSync.dataType,
          hour: 1
        });
        break;
      case "2hr":
        setAutoSync({
          dataType: site.autoSync.dataType,
          hour: 2
        });
        break;
      case "12hr":
        setAutoSync({
          dataType: site.autoSync.dataType,
          hour: 12
        });
        break;
      case "daily":
        setAutoSync({
          dataType: site.autoSync.dataType,
          day: 1
        });
        break;
      default:
        break;
    }
  };

  handleSyncData = () => {
    const {
      syncDataFromFB,
      site,
      syncEventFromFB,
      syncGalleryFromFB,
      syncPostFromFB
    } = this.props;
    const { startDate, endDate, radioValue, selectValue } = this.state;
    const msg = "Please choose the data type you want to sync.";

    if (radioValue === "") {
      this.setState({ msg: msg });
    } else if (radioValue === "post") {
      this.setState({ msg: "" });
      syncPostFromFB(
        site.id,
        selectValue === "All" ? null : startDate,
        selectValue === "All" ? null : endDate
      );
    } else if (radioValue === "event") {
      this.setState({ msg: "" });
      syncEventFromFB(
        site.id,
        selectValue === "All" ? null : startDate,
        selectValue === "All" ? null : endDate
      );
    } else if (radioValue === "gallery") {
      this.setState({ msg: "" });
      syncGalleryFromFB(
        site.id,
        selectValue === "All" ? null : startDate,
        selectValue === "All" ? null : endDate
      );
    } else if (radioValue === "all") {
      this.setState({ msg: "" });
      syncDataFromFB(
        site.id,
        selectValue === "All" ? null : startDate,
        selectValue === "All" ? null : endDate
      );
    }
  };

  handleApply = () => {
    const { applyAutoSync, site } = this.props;
    applyAutoSync(site.id, site.autoSync);
  };

  render() {
    const { site, classes } = this.props;
    const { open, startDate, endDate } = this.state;
    const btnSync = {
      width: "-webkit-fill-available",
      backgroundColor: "rgb(0, 116, 170)",
      color: "white"
    };
    return (
      <>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">Last Sync</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item container justify={"center"}>
                <Grid item>
                  <Button
                    variant="contained"
                    style={btnSync}
                    onClick={this.toggleDialog}
                  >
                    View Log
                  </Button>
                  <Dialog
                    onClose={this.toggleDialog}
                    open={open}
                    fullWidth
                    fullScreen
                  >
                    <DialogTitle
                      id="customized-dialog-title"
                      onClose={this.toggleDialog}
                    >
                      {site.lastSync
                        ? moment(site.lastSync).format("LLL")
                        : "Log"}
                    </DialogTitle>
                    <DialogContent>
                      {site.syncRecords && (
                        <CreateTable data={site.syncRecords} />
                      )}
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
          <Divider variant="fullWidth" />
          <ExpansionPanelDetails>
            <Grid container justify="center" alignItems="center">
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                className={classes.gridItem}
              >
                <Grid item xs={4} style={{ textAlign: "start" }}>
                  Sync Type:
                </Grid>
                <Grid item xs={6}>
                  <Select
                    inputProps={{ style: { padding: "0.5rem" } }}
                    fullWidth
                    native
                    variant={"outlined"}
                    value={this.state.selectValue}
                    onChange={this.handleChange}
                  >
                    <option>All</option>
                    <option>Date</option>
                  </Select>
                </Grid>
              </Grid>

              {this.state.selectValue === "Date" && (
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  className={classes.gridItem}
                >
                  <Grid container className={classes.datePicker}>
                    <Grid item xs={4} sm={4} md={4}>
                      From:
                    </Grid>
                    <Grid item xs={6} sm={12} md={6}>
                      <DatePicker
                        className={classes.picker}
                        selected={startDate}
                        onChange={date => this.setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.datePicker}>
                    <Grid item xs={4} sm={4} md={4}>
                      To:
                    </Grid>
                    <Grid item xs={6} sm={12} md={6}>
                      <DatePicker
                        className={classes.picker}
                        selected={this.state.endDate}
                        onChange={date => this.setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid
                container
                item
                xs={12}
                alignItems="center"
                className={classes.gridItem}
              >
                <Grid item xs={4} sm={4}>
                  Data type:
                </Grid>
                <Grid item xs={6} sm={12} className={classes.gridItem}>
                  <RadioGroup
                    row
                    value={this.state.radioValue}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel
                      value="post"
                      control={<Radio color="primary" />}
                      label={
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Segoe UI" }}
                        >
                          Post
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="event"
                      control={<Radio color="primary" />}
                      label={
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Segoe UI" }}
                        >
                          Event
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="gallery"
                      control={<Radio color="primary" />}
                      label={
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Segoe UI" }}
                        >
                          Gallery
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="all"
                      control={<Radio color="primary" />}
                      label={
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Segoe UI" }}
                        >
                          All
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              {this.state.msg && (
                <Grid
                  container
                  justify="center"
                  style={{ marginBottom: "1.5rem", textAlign: "center" }}
                >
                  {this.state.msg}
                </Grid>
              )}
              <Grid container justify="center" alignItems="center">
                <Grid item xs={5}>
                  <ButtonComponent
                    onClick={this.handleSyncData}
                    label="Sync"
                    style={btnSync}
                  />
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
            <Grid container justify="center" alignItems="center">
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                className={classes.gridItem}
              >
                <Grid item xs={4} style={{ textAlign: "start" }}>
                  Data Type:
                </Grid>
                <Grid item xs={6}>
                  <Select
                    inputProps={{ style: { padding: "0.5rem" } }}
                    fullWidth
                    native
                    variant={"outlined"}
                    value={site.autoSync.dataType}
                    onChange={this.handleChangeSchedule}
                  >
                    <option value="none">None</option>
                    <option value="post">Post</option>
                    <option value="event">Event</option>
                    <option value="gallery">Gallery</option>
                    <option value="all">All</option>
                  </Select>
                </Grid>
              </Grid>

              {site.autoSync.dataType !== "none" && (
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  className={classes.gridItem}
                >
                  <Grid item xs={4} sm={4}>
                    Time:
                  </Grid>
                  <Grid item xs={6} sm={6} className={classes.gridItem}>
                    <Select
                      fullWidth
                      inputProps={{ style: { padding: "0.5rem" } }}
                      native
                      variant={"outlined"}
                      value={
                        site.autoSync.convertAutoSyncValue
                          ? site.autoSync.convertAutoSyncValue
                          : "2min"
                      }
                      onChange={this.handleChangeScheduleTime}
                    >
                      <option value="2min">2 minutes</option>
                      <option value="30min">30 minutes</option>
                      <option value="1hr">1 hour</option>
                      <option value="2hr">2 hours</option>
                      <option value="12hr">12 hours</option>
                      <option value="daily">Daily</option>
                    </Select>
                  </Grid>
                </Grid>
              )}
              {this.state.msg && (
                <Grid
                  container
                  justify="center"
                  style={{ marginBottom: "1.5rem", textAlign: "center" }}
                >
                  {this.state.msg}
                </Grid>
              )}
              <Grid container justify="center" alignItems="center">
                <Grid item xs={5}>
                  <ButtonComponent
                    onClick={this.handleApply}
                    label="Apply"
                    style={btnSync}
                  />
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
  syncDataFromFB: (pageId, dateFrom, dateTo) =>
    dispatch(syncDataFromFB(pageId, dateFrom, dateTo)),
  syncPostFromFB: (pageId, dateFrom, dateTo) =>
    dispatch(syncPostFromFB(pageId, dateFrom, dateTo)),
  syncEventFromFB: (pageId, dateFrom, dateTo) =>
    dispatch(syncEventFromFB(pageId, dateFrom, dateTo)),
  syncGalleryFromFB: (pageId, dateFrom, dateTo) =>
    dispatch(syncGalleryFromFB(pageId, dateFrom, dateTo)),
  setAutoSync: autoSync => dispatch(setAutoSync(autoSync)),
  applyAutoSync: (id, autoSync) => dispatch(applyAutoSync(id, autoSync))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SyncEditorTab));
