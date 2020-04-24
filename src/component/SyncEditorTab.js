import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  Typography,
  Checkbox,
  TextField,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
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
  syncPostFromFB,
} from "../actions";

const expanStyle = {
  marginTop: "1rem",
};
const useStyles = (theme) => ({
  sideBarBox: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2a2e2a",
    padding: "0.5rem",
  },
  gridBtnSync: {
    margin: "0.2rem 0",
  },
  datePicker: {
    padding: "0.2rem 0",
    margin: "0.1rem 0",
  },
  picker: {
    height: "1.8rem",
    width: "-webkit-fill-available",
    padding: "0 0.5rem",
  },
  gridItem: {
    padding: "0.5rem 0",
  },
  "&.MuiSelect-outlined": {
    padding: "0",
  },
  expanPanel: {
    marginTop: "1rem",
    zIndex: "999999",
    border: "1px solid #dddddd",
    width: "100%",
    backgroundColor: "#f0eded",
    "&:hover": {
      transitionDuration: "0.5s",
      border: "1px solid #0074aa",
      color: "#0074aa",
      borderLeft: "4px solid #0074aa",
    },
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important",
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important",
  },
  inputTitle: {
    fontFamily: "Roboto, sans-serif !important",
    fontSize: 13,
    color: "#555d66",
  },
  title2: {
    fontSize: "12px",
    marginTop: "0.25rem",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#555d66",
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
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
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
  },
  failed: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#cc2127",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
  },
});

const fontTable = {
  fontFamily: "Roboto, sans-serif",
  fontSize: 13,
};

function CreateTable({ data }) {
  const classes = tableStyle();
  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead
          style={{
            backgroundColor: "#ccccb3",
          }}
        >
          <TableRow>
            <TableCell style={fontTable} align="center">
              Sync At
            </TableCell>
            <TableCell style={fontTable} align="center">
              Data Type
            </TableCell>
            <TableCell style={fontTable} align="center">
              Sync Type
            </TableCell>
            <TableCell style={fontTable} align="center">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={fontTable} align="center">
                  {moment(row.createdAt).format("LT-DD-MM-YYYY")}
                </TableCell>
                <TableCell style={fontTable} align="center">
                  {row.dataType}
                </TableCell>
                <TableCell style={fontTable} align="center">
                  {!row.dateFrom && !row.dateTo ? (
                    "All"
                  ) : (
                    <Grid container justify="center">
                      <Grid style={fontTable} item xs={12}>
                        From: {moment(row.dateFrom).format("DD-MM-YYYY")}
                      </Grid>
                      <Grid style={fontTable} item xs={12}>
                        To: {moment(row.dateTo).format("DD-MM-YYYY")}
                      </Grid>
                    </Grid>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Grid
                    container
                    className={"mainFont"}
                    style={{
                      fontSize: "12px",
                      overflow: "hidden",
                    }}
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
    selectValueSchedule: "None",
    hover: {
      expanTab: 1,
      onHover: false,
    },
    previousExpandItem: "",
    isExpanding: false,
    currentExpandItem: "",
    manualPostWithCheck: false,
    manualContainMsgCheck: false,
    manualPostRadioValue: "",
    manualTitleEventCheck: false,
    manualPostMessage: "",
    maunalEventTitle: "",
    autoPostWithCheck: false,
    autoContainMsgCheck: false,
    autoPostRadioValue: "",
    autoTitleMsgCheck: false,
    autoPostMsg: "",
    autoEventTitle: "",
    manualAboutCheck: false,
    manualAddressCheck: false,
    manualMailCheck: false,
    manualStoryCheck: false,
    manualPhoneCheck: false,
    autoAboutCheck: false,
    autoAddressCheck: false,
    autoEmailCheck: false,
    autoStoryCheck: false,
    autoPhoneCheck: false,
  };

  selectTab = (event, tab) => {
    this.setState({
      tab: tab,
    });
  };
  toggleDialog = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleRadioChange = (event) => {
    this.setState({ radioValue: event.target.value });
  };

  handleRadioPostChange = (type, event) => {
    if (type === "manual") {
      this.setState({ manualPostRadioValue: parseInt(event.target.value) });
    } else {
      this.setState({ autoPostRadioValue: parseInt(event.target.value) });
    }
  };

  setStartDate = (date) => {
    this.setState({ startDate: date });
  };
  setEndDate = (date) => {
    this.setState({ endDate: date });
  };

  handleChange = (event) => {
    this.setState({
      selectValue: event.target.value,
    });
  };

  handleChangeSchedule = (e) => {
    const { setAutoSync } = this.props;
    setAutoSync({
      dataType: e.target.value,
    });
  };

  handleChangeScheduleTime = (e) => {
    const { setAutoSync, site } = this.props;
    const time = e.target.value;
    switch (time) {
      case "2min":
        setAutoSync({
          dataType: site.autoSync.dataType,
          minute: 2,
        });
        break;
      case "30min":
        setAutoSync({
          dataType: site.autoSync.dataType,
          minute: 30,
        });
        break;
      case "1hr":
        setAutoSync({
          dataType: site.autoSync.dataType,
          hour: 1,
        });
        break;
      case "2hr":
        setAutoSync({
          dataType: site.autoSync.dataType,
          hour: 2,
        });
        break;
      case "12hr":
        setAutoSync({
          dataType: site.autoSync.dataType,
          hour: 12,
        });
        break;
      case "daily":
        setAutoSync({
          dataType: site.autoSync.dataType,
          day: 1,
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
      syncPostFromFB,
    } = this.props;

    const {
      manualAboutCheck,
      manualStoryCheck,
      manualAddressCheck,
      manualMailCheck,
      manualPhoneCheck,
      manualPostRadioValue,
      manualPostMessage,
      maunalEventTitle,
    } = this.state;

    const { startDate, endDate, radioValue, selectValue } = this.state;
    const msg = "Please choose the data type you want to sync.";

    if (radioValue === "") {
      this.setState({ msg: msg });
    } else if (radioValue === "post") {
      this.setState({ msg: "" });
      syncPostFromFB(
        site.id,
        selectValue === "All" ? null : startDate,
        selectValue === "All" ? null : endDate,
        manualPostRadioValue,
        manualPostMessage
      );
    } else if (radioValue === "event") {
      this.setState({ msg: "" });
      syncEventFromFB(
        site.id,
        selectValue === "All" ? null : startDate,
        selectValue === "All" ? null : endDate,
        maunalEventTitle
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
        selectValue === "All" ? null : endDate,
        manualAboutCheck,
        manualStoryCheck,
        manualAddressCheck,
        manualMailCheck,
        manualPhoneCheck,
        manualPostRadioValue,
        manualPostMessage,
        maunalEventTitle
      );
    }
  };

  handleApply = () => {
    const { applyAutoSync, site } = this.props;
    const {
      autoAboutCheck,
      autoStoryCheck,
      autoAddressCheck,
      autoEmailCheck,
      autoPhoneCheck,
      autoPostRadioValue,
      autoPostMsg,
      autoEventTitle,
    } = this.state;

    applyAutoSync(
      site.id,
      site.autoSync,
      autoAboutCheck,
      autoStoryCheck,
      autoAddressCheck,
      autoEmailCheck,
      autoPhoneCheck,
      autoPostRadioValue,
      autoPostMsg,
      autoEventTitle
    );
  };

  setHover = (position, onHover) => {
    this.setState({
      hover: { expanTab: position, onHover: onHover },
    });
  };

  onChangePanel = (item, expand) => {
    if (item !== this.state.previousExpandItem) {
      this.setState({
        previousExpandItem: item,
        isExpanding: true,
        currentExpandItem: item,
      });
    } else {
      this.setState({
        currentExpandItem: item,
        isExpanding: expand,
      });
    }
  };

  handleChangeCheckBox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    if (!event.target.checked) {
      switch (event.target.name) {
        case "manualTitleEventCheck":
          this.setState({ maunalEventTitle: "" });
          break;
        case "manualPostWithCheck":
          this.setState({ manualPostRadioValue: "" });
          break;
        case "manualContainMsgCheck":
          this.setState({ manualPostMessage: "" });
          break;
        case "autoPostWithCheck":
          this.setState({ autoPostRadioValue: "" });
          break;
        case "autoContainMsgCheck":
          this.setState({ autoPostMsg: "" });
          break;
        case "autoTitleMsgCheck":
          this.setState({ autoEventTitle: "" });
          break;
        default:
          break;
      }
    }
  };

  handleChangeContainMessage = (type, event) => {
    if (type === "manual") {
      this.setState({ manualPostMessage: event.target.value });
    } else {
      this.setState({ autoPostMsg: event.target.value });
    }
  };

  handleChangeContainTitle = (type, event) => {
    if (type === "manual") {
      this.setState({ maunalEventTitle: event.target.value });
    } else {
      this.setState({ autoEventTitle: event.target.value });
    }
  };

  render() {
    const { site, classes } = this.props;
    const { open, startDate, endDate } = this.state;
    const btnSync = {
      width: "-webkit-fill-available",
      backgroundColor: "rgb(0, 116, 170)",
      color: "white",
      fontFamily: "Roboto, sans-serif",
    };

    const radioButton = {
      fontSize: "13px",
      fontFamily: "Roboto, sans-serif",
      color: "#555d66",
    };
    const titleExpan = {
      fontFamily: "Roboto, sans-serif",
      fontWeight: "600",
      color: "#555d66",
      fontSize: 14,
    };
    const { hover } = this.state;

    return (
      <>
        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t1" && this.state.isExpanding
              ? true
              : false
          }
          style={expanStyle}
          className={classes.expanPanel}
          onMouseEnter={() => this.setHover(1, true)}
          onMouseLeave={() => this.setHover(1, false)}
        >
          <ExpansionPanelSummary
            style={{ backgroundColor: "white" }}
            onClick={() => this.onChangePanel("t1", !this.state.isExpanding)}
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 1 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
          >
            <Typography style={titleExpan}>Sync Records</Typography>
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
        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t2" && this.state.isExpanding
              ? true
              : false
          }
          style={expanStyle}
          className={classes.expanPanel}
          onMouseEnter={() => this.setHover(2, true)}
          onMouseLeave={() => this.setHover(2, false)}
        >
          <ExpansionPanelSummary
            style={{ backgroundColor: "white" }}
            onClick={() => this.onChangePanel("t2", !this.state.isExpanding)}
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 2 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
          >
            <Typography style={titleExpan}>Manual</Typography>
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
                <Grid item xs={12} className={classes.title2}>
                  Sync Type:
                </Grid>
                <Grid item xs={6}>
                  <Select
                    inputProps={{
                      style: {
                        padding: "0.5rem",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: 14,
                        color: "#555d66",
                      },
                    }}
                    fullWidth
                    native
                    variant={"outlined"}
                    value={this.state.selectValue}
                    onChange={this.handleChange}
                  >
                    <option style={{ fontSize: 14, color: "#555d66" }}>
                      All
                    </option>
                    <option style={{ fontSize: 14, color: "#555d66" }}>
                      Date
                    </option>
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
                    <Grid item xs={12} className={classes.title2}>
                      From
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker
                        className={classes.picker}
                        selected={startDate}
                        onChange={(date) => this.setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.datePicker}>
                    <Grid item xs={12} className={classes.title2}>
                      To
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker
                        className={classes.picker}
                        selected={this.state.endDate}
                        onChange={(date) => this.setEndDate(date)}
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
                justify="center"
                className={classes.gridItem}
              >
                <Grid item xs={12} className={classes.title2}>
                  Data type:
                </Grid>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  item
                  xs={10}
                  className={classes.gridItem}
                >
                  <RadioGroup
                    row
                    value={this.state.radioValue}
                    onChange={this.handleRadioChange}
                  >
                    <Grid container item xs={12} justify="center">
                      <Grid item xs={12}>
                        <FormControlLabel
                          value="post"
                          control={<Radio style={{ color: "#0074aa" }} />}
                          label={
                            <Typography style={radioButton}>Post</Typography>
                          }
                        />
                      </Grid>
                      {this.state.radioValue === "post" && (
                        <Grid container item xs={10}>
                          <Grid container item xs={12} justify="center">
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.manualPostWithCheck}
                                    onChange={this.handleChangeCheckBox}
                                    name="manualPostWithCheck"
                                    style={{ color: "#0074aa" }}
                                  />
                                }
                                label={
                                  <p style={{ fontSize: 13, color: "#555d66" }}>
                                    with specified attachment only
                                  </p>
                                }
                              />
                            </Grid>
                            {this.state.manualPostWithCheck && (
                              <Grid container item xs={10}>
                                <RadioGroup
                                  row
                                  value={this.state.manualPostRadioValue}
                                  onChange={(e) =>
                                    this.handleRadioPostChange("manual", e)
                                  }
                                >
                                  <Grid item xs={9}>
                                    <FormControlLabel
                                      value={1}
                                      control={
                                        <Radio style={{ color: "#0074aa" }} />
                                      }
                                      label={
                                        <Typography style={radioButton}>
                                          None
                                        </Typography>
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={9}>
                                    <FormControlLabel
                                      value={2}
                                      control={
                                        <Radio style={{ color: "#0074aa" }} />
                                      }
                                      label={
                                        <Typography style={radioButton}>
                                          Video
                                        </Typography>
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={9}>
                                    <FormControlLabel
                                      value={3}
                                      control={
                                        <Radio style={{ color: "#0074aa" }} />
                                      }
                                      label={
                                        <Typography style={radioButton}>
                                          Photo
                                        </Typography>
                                      }
                                    />
                                  </Grid>
                                </RadioGroup>
                              </Grid>
                            )}
                          </Grid>
                          <Grid container item xs={12} justify="center">
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.manualContainMsgCheck}
                                    onChange={this.handleChangeCheckBox}
                                    name="manualContainMsgCheck"
                                    style={{ color: "#0074aa" }}
                                  />
                                }
                                label={
                                  <p style={{ fontSize: 13, color: "#555d66" }}>
                                    containing specified text only
                                  </p>
                                }
                              />
                            </Grid>
                            {this.state.manualContainMsgCheck && (
                              <Grid item xs={10}>
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  value={this.state.manualPostMessage}
                                  onChange={(e) =>
                                    this.handleChangeContainMessage("manual", e)
                                  }
                                  InputLabelProps={{
                                    classes: {
                                      focused: classes.focused,
                                      root: classes.inputLabel,
                                    },
                                  }}
                                  InputProps={{
                                    classes: {
                                      notchedOutline: classes.notchedOutline,
                                      input: classes.inputTitle,
                                    },
                                  }}
                                  rows={3}
                                  multiline
                                  size="small"
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <Grid container item xs={12} justify="center">
                      <Grid item xs={12}>
                        <FormControlLabel
                          value="event"
                          control={<Radio style={{ color: "#0074aa" }} />}
                          label={
                            <Typography style={radioButton}>Event</Typography>
                          }
                        />
                      </Grid>
                      {this.state.radioValue === "event" && (
                        <Grid container item xs={10}>
                          <Grid container item xs={12} justify="center">
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.manualTitleEventCheck}
                                    onChange={this.handleChangeCheckBox}
                                    name="manualTitleEventCheck"
                                    style={{ color: "#0074aa" }}
                                  />
                                }
                                label={
                                  <Typography style={radioButton}>
                                    containing specified title
                                  </Typography>
                                }
                              />
                            </Grid>
                            {this.state.manualTitleEventCheck && (
                              <Grid item xs={10}>
                                <TextField
                                  variant="outlined"
                                  label="Titlte"
                                  fullWidth
                                  value={this.state.maunalEventTitle}
                                  onChange={(e) =>
                                    this.handleChangeContainTitle("manual", e)
                                  }
                                  InputLabelProps={{
                                    classes: {
                                      focused: classes.focused,
                                      root: classes.inputLabel,
                                    },
                                  }}
                                  InputProps={{
                                    classes: {
                                      notchedOutline: classes.notchedOutline,
                                      input: classes.inputTitle,
                                    },
                                  }}
                                  size="small"
                                />
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        value="gallery"
                        control={<Radio style={{ color: "#0074aa" }} />}
                        label={
                          <Typography style={radioButton}>Gallery</Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        value="all"
                        control={<Radio style={{ color: "#0074aa" }} />}
                        label={<Typography style={radioButton}>All</Typography>}
                      />
                    </Grid>
                  </RadioGroup>
                </Grid>
              </Grid>

              {this.state.radioValue === "all" && (
                <Grid container item xs={12} justify="center">
                  <Grid item xs={12} className={classes.title2}>
                    Additional data:
                  </Grid>
                  <Grid container item xs={10}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.manualAboutCheck}
                            onChange={this.handleChangeCheckBox}
                            name="manualAboutCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            About
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.manualStoryCheck}
                            onChange={this.handleChangeCheckBox}
                            name="manualStoryCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Story
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.manualAddressCheck}
                            onChange={this.handleChangeCheckBox}
                            name="manualAddressCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Address
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.manualMailCheck}
                            onChange={this.handleChangeCheckBox}
                            name="manualMailCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Email
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.manualPhoneCheck}
                            onChange={this.handleChangeCheckBox}
                            name="manualPhoneCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Phone
                          </p>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {this.state.msg && (
                <Grid
                  container
                  justify="center"
                  style={{
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {this.state.msg}
                </Grid>
              )}
              <Grid container justify="center" alignItems="center">
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    onClick={this.handleSyncData}
                    style={btnSync}
                  >
                    Sync
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={
            this.state.currentExpandItem === "t3" && this.state.isExpanding
              ? true
              : false
          }
          style={expanStyle}
          className={classes.expanPanel}
          onMouseEnter={() => this.setHover(3, true)}
          onMouseLeave={() => this.setHover(3, false)}
        >
          <ExpansionPanelSummary
            style={{ backgroundColor: "white" }}
            onClick={() => this.onChangePanel("t3", !this.state.isExpanding)}
            expandIcon={
              <FontAwesomeIcon
                style={{ float: "right", fontSize: "1rem" }}
                icon={faArrowCircleDown}
                color={
                  hover.expanTab === 3 && hover.onHover ? "#0074aa" : "#dddddd"
                }
                size="1x"
              />
            }
          >
            <Typography style={titleExpan}>Schedule</Typography>
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
                <Grid item xs={12} className={classes.title2}>
                  Data Type:
                </Grid>
                <Grid item xs={6}>
                  <Select
                    inputProps={{
                      style: {
                        padding: "0.5rem",
                        fontFamily: "Roboto, sans-serif",
                        fontSize: 14,
                        color: "#555d66",
                      },
                    }}
                    fullWidth
                    native
                    variant={"outlined"}
                    value={site.autoSync.dataType}
                    onChange={this.handleChangeSchedule}
                  >
                    <option
                      value="none"
                      style={{ fontSize: 14, color: "#555d66" }}
                    >
                      None
                    </option>
                    <option
                      value="post"
                      style={{ fontSize: 14, color: "#555d66" }}
                    >
                      Post
                    </option>
                    <option
                      value="event"
                      style={{ fontSize: 14, color: "#555d66" }}
                    >
                      Event
                    </option>
                    <option
                      value="gallery"
                      style={{ fontSize: 14, color: "#555d66" }}
                    >
                      Gallery
                    </option>
                    <option
                      value="all"
                      style={{ fontSize: 14, color: "#555d66" }}
                    >
                      All
                    </option>
                  </Select>
                </Grid>
              </Grid>

              {site.autoSync.dataType === "post" && (
                <Grid container item xs={12}>
                  <Grid container item xs={10} justify="center">
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoPostWithCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoPostWithCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 13, color: "#555d66" }}>
                            with specified attachment only
                          </p>
                        }
                      />
                    </Grid>
                    {this.state.autoPostWithCheck && (
                      <Grid container item xs={10}>
                        <RadioGroup
                          row
                          value={this.state.autoPostRadioValue}
                          onChange={(e) =>
                            this.handleRadioPostChange("auto", e)
                          }
                        >
                          <Grid item xs={9}>
                            <FormControlLabel
                              value={1}
                              control={<Radio style={{ color: "#0074aa" }} />}
                              label={
                                <Typography style={radioButton}>
                                  None
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <FormControlLabel
                              value={2}
                              control={<Radio style={{ color: "#0074aa" }} />}
                              label={
                                <Typography style={radioButton}>
                                  Video
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <FormControlLabel
                              value={3}
                              control={<Radio style={{ color: "#0074aa" }} />}
                              label={
                                <Typography style={radioButton}>
                                  Photo
                                </Typography>
                              }
                            />
                          </Grid>
                        </RadioGroup>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container item xs={12} justify="center">
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoContainMsgCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoContainMsgCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 13, color: "#555d66" }}>
                            containing specified text only
                          </p>
                        }
                      />
                    </Grid>
                    {this.state.autoContainMsgCheck && (
                      <Grid item xs={10}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={this.state.autoPostMsg}
                          onChange={(e) =>
                            this.handleChangeContainMessage("auto", e)
                          }
                          InputLabelProps={{
                            classes: {
                              focused: classes.focused,
                              root: classes.inputLabel,
                            },
                          }}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutline,
                              input: classes.inputTitle,
                            },
                          }}
                          rows={3}
                          multiline
                          size="small"
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}

              {site.autoSync.dataType === "event" && (
                <Grid container item xs={10}>
                  <Grid container item xs={12} justify="center">
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoTitleMsgCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoTitleMsgCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 13, color: "#555d66" }}>
                            containing specified title
                          </p>
                        }
                      />
                    </Grid>
                    {this.state.autoTitleMsgCheck && (
                      <Grid item xs={10}>
                        <TextField
                          variant="outlined"
                          label="Titlte"
                          fullWidth
                          value={this.state.autoEventTitle}
                          onChange={(e) =>
                            this.handleChangeContainTitle("auto", e)
                          }
                          InputLabelProps={{
                            classes: {
                              focused: classes.focused,
                              root: classes.inputLabel,
                            },
                          }}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutline,
                              input: classes.inputTitle,
                            },
                          }}
                          size="small"
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}

              {site.autoSync.dataType !== "none" && (
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  className={classes.gridItem}
                >
                  <Grid item xs={12} className={classes.title2}>
                    Time:
                  </Grid>
                  <Grid item xs={6} className={classes.gridItem}>
                    <Select
                      fullWidth
                      inputProps={{
                        style: {
                          padding: "0.5rem",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: 14,
                          color: "#555d66",
                        },
                      }}
                      native
                      variant={"outlined"}
                      value={
                        site.autoSync.convertAutoSyncValue
                          ? site.autoSync.convertAutoSyncValue
                          : "2min"
                      }
                      onChange={this.handleChangeScheduleTime}
                    >
                      <option
                        value="2min"
                        style={{ fontSize: 14, color: "#555d66" }}
                      >
                        2 minutes
                      </option>
                      <option
                        value="30min"
                        style={{ fontSize: 14, color: "#555d66" }}
                      >
                        30 minutes
                      </option>
                      <option
                        value="1hr"
                        style={{ fontSize: 14, color: "#555d66" }}
                      >
                        1 hour
                      </option>
                      <option
                        value="2hr"
                        style={{ fontSize: 14, color: "#555d66" }}
                      >
                        2 hours
                      </option>
                      <option
                        value="12hr"
                        style={{ fontSize: 14, color: "#555d66" }}
                      >
                        12 hours
                      </option>
                      <option
                        value="daily"
                        style={{ fontSize: 14, color: "#555d66" }}
                      >
                        Daily
                      </option>
                    </Select>
                  </Grid>
                </Grid>
              )}

              {site.autoSync.dataType === "all" && (
                <Grid container item xs={12} justify="center">
                  <Grid item xs={12} className={classes.title2}>
                    Additional data:
                  </Grid>
                  <Grid container item xs={10}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoAboutCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoAboutCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            About
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoStoryCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoStoryCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Story
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoAddressCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoAddressCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Address
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoEmailCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoEmailCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Email
                          </p>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.autoPhoneCheck}
                            onChange={this.handleChangeCheckBox}
                            name="autoPhoneCheck"
                            style={{ color: "#0074aa" }}
                          />
                        }
                        label={
                          <p style={{ fontSize: 11, color: "#555d66" }}>
                            Phone
                          </p>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {this.state.msg && (
                <Grid
                  container
                  justify="center"
                  style={{
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {this.state.msg}
                </Grid>
              )}
              <Grid container justify="center" alignItems="center">
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    onClick={this.handleApply}
                    style={btnSync}
                  >
                    Apply
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
const mapStateToProps = (state) => ({
  site: state.site.siteEdit,
  open: state.dialog.open,
});

const mapDispatchToProps = (dispatch) => ({
  openDialog: () => dispatch(openDialog()),
  closeDialog: () => dispatch(closeDialog()),
  syncDataFromFB: (
    pageId,
    dateFrom,
    dateTo,
    about,
    story,
    address,
    email,
    phone,
    postWith,
    containMsg,
    eventContainTitle
  ) =>
    dispatch(
      syncDataFromFB(
        pageId,
        dateFrom,
        dateTo,
        about,
        story,
        address,
        email,
        phone,
        postWith,
        containMsg,
        eventContainTitle
      )
    ),
  syncPostFromFB: (pageId, dateFrom, dateTo, postWith, containMsg) =>
    dispatch(syncPostFromFB(pageId, dateFrom, dateTo, postWith, containMsg)),
  syncEventFromFB: (pageId, dateFrom, dateTo, eventContainTitle) =>
    dispatch(syncEventFromFB(pageId, dateFrom, dateTo, eventContainTitle)),
  syncGalleryFromFB: (pageId, dateFrom, dateTo) =>
    dispatch(syncGalleryFromFB(pageId, dateFrom, dateTo)),
  setAutoSync: (autoSync) => dispatch(setAutoSync(autoSync)),
  applyAutoSync: (
    id,
    autoSync,
    about,
    story,
    address,
    email,
    phone,
    postWith,
    containMsg,
    eventContainTitle
  ) =>
    dispatch(
      applyAutoSync(
        id,
        autoSync,
        about,
        story,
        address,
        email,
        phone,
        postWith,
        containMsg,
        eventContainTitle
      )
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SyncEditorTab));
