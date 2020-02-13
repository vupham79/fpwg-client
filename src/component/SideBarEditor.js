import { Button, Grid, AppBar } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FontPicker from "font-picker-react";
import React from "react";
import { ChromePicker, TwitterPicker } from "react-color";
import { connect } from "react-redux";
import { themes } from "../constant/constant";
import {
  changeTheme,
  changeFontTitle,
  changeFontBody,
  changeColor,
  setShowCustomColor
} from "../actions";

const useStyles = theme => ({
  root: {
    height: "100vh"
  },
  drawer: {
    flexShrink: 0,
    height: "100%"
  },
  drawerPaper: {
    padding: "1rem",
    position: "relative",
    overflowY: "scroll",
    height: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: "bold"
  },
  title2: {
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    fontSize: 12
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2e2a",
    padding: "1rem"
  }
});

class ClippedDrawer extends React.Component {
  render() {
    const drawerWidth = 280;
    const {
      themeName,
      changeTheme,
      changeFontTitle,
      themeFontTitle,
      changeColor,
      themeFontBody,
      changeFontBody,
      isShow,
      themeColor,
      setShowCustomColor,
      classes
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
          <Typography className={classes.title}>Theme</Typography>
          <Select
            defaultValue={themeName}
            autoComplete="true"
            value={themeName}
            fullWidth
            onChange={event => changeTheme(event.target.value)}
          >
            {themes.map((element, index) => (
              <MenuItem value={element.name} key={index}>
                {element.name}
              </MenuItem>
            ))}
          </Select>
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Typography className={classes.title}>Font</Typography>
          <Grid className={classes.sideBarBox}>
            <Typography className={classes.title2}>Font Title</Typography>
            <List>
              <FontPicker
                apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
                sort="alphabet"
                activeFontFamily={themeFontTitle}
                onChange={e => changeFontTitle(e.family)}
              />
            </List>
            <Divider />
            <Typography className={classes.title2}>Font Body</Typography>
            <FontPicker
              apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
              sort="alphabet"
              activeFontFamily={themeFontBody}
              onChange={e => changeFontBody(e.family)}
            />
          </Grid>
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Typography className={classes.title}>Color</Typography>
          <Grid className={classes.sideBarBox}>
            <Typography className={classes.title2}>Suggested Color</Typography>
            <TwitterPicker
              width={"fit-content"}
              color={themeColor}
              onChangeComplete={e => changeColor(e.hex)}
            />
            <Divider />
            <Typography className={classes.title2}>Custom Color</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCustomColor(!isShow)}
            >
              Select custom color
            </Button>
            {isShow === true ? (
              <Grid
                style={{
                  position: "fixed",
                  left: drawerWidth + 10,
                  width: 220,
                  color: "white",
                  borderRadius: 3,
                  zIndex: 1000,
                  top: "50%"
                }}
              >
                <ChromePicker
                  color={themeColor}
                  onChangeComplete={e => changeColor(e.hex)}
                />
              </Grid>
            ) : null}
          </Grid>
        </Drawer>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  themeName: state.theme.name,
  themeColor: state.theme.color,
  themeFontTitle: state.theme.fontTitle,
  themeFontBody: state.theme.fontBody,
  isShow: state.theme.isShow
});

const mapDispatchToProps = dispatch => ({
  changeTheme: name => dispatch(changeTheme(name)),
  changeColor: color => dispatch(changeColor(color)),
  changeFontTitle: fontTitle => dispatch(changeFontTitle(fontTitle)),
  changeFontBody: fontBody => dispatch(changeFontBody(fontBody)),
  setShowCustomColor: isShow => dispatch(setShowCustomColor(isShow))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ClippedDrawer));
