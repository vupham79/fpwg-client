import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import FontPicker from "font-picker-react";
import { Overlay, Button } from "react-bootstrap";
import { TwitterPicker, ChromePicker } from "react-color";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Theme1Home from "../pages/theme1-home/Theme1Home";
import MenuItem from "@material-ui/core/MenuItem";
import ShowPage from "../../theme2/components/show"

export default function ClippedDrawer() {
  const drawerWidth = 280;

  const [themeToChange, setTheme] = React.useState("");

  const [themeFont, setThemeFont] = useState("Arial");

  const [themeFontBody, setThemeFontBody] = useState("Arial");

  const [show, setShow] = useState(false);

  const [themeColor, setThemeColor] = useState("#FF6900");

  const target = useRef(null);

  const handleChange = event => {
    setTheme(event.target.value);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      height: 10,
      top: 62,
      backgroundColor: "#2a2e2a",
      position: "fixed"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 70,
      overflowY: "scroll",
      height: "85%",
      minHeight: 300
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
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
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
          id="theme-select"
          defaultValue={themeToChange}
          autoComplete="true"
          value={themeToChange}
          onChange={handleChange}
        >
          <MenuItem value={1}>Theme 1</MenuItem>
          <MenuItem value={2}>Theme 2</MenuItem>
          <MenuItem value={3}>Theme 3</MenuItem>
        </Select>

        <Divider
          style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
        />

        <Typography className={classes.title}>Font</Typography>

        <div className={classes.sideBarBox}>
          <Typography className={classes.title2}>Font Title</Typography>

          <List>
            <FontPicker
              apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
              sort="alphabet"
              activeFontFamily={themeFont}
              onChange={nextFont => setThemeFont(nextFont.family)}
            />
          </List>

          <Divider />

          <Typography className={classes.title2}>Font Body</Typography>

          <FontPicker
            apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
            sort="alphabet"
            activeFontFamily={themeFontBody}
            onChange={nextFont => setThemeFontBody(nextFont.family)}
          />
        </div>

        <Divider
          style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
        />

        <Typography className={classes.title}>Color</Typography>

        <div className={classes.sideBarBox}>
          <Typography className={classes.title2}>Suggested Color</Typography>

          <TwitterPicker
            width={220}
            color={themeColor}
            onChangeComplete={color => setThemeColor(color.hex)}
          />

          <Divider />

          <Typography className={classes.title2}>Custom Color</Typography>

          <Button variant="info" ref={target} onClick={() => setShow(!show)}>
            Select custom color
          </Button>
          <Overlay target={target.current} show={show} placement="right">
            {({
              placement,
              scheduleUpdate,
              arrowProps,
              outOfBoundaries,
              show: _show
            }) => (
              <div
                style={{
                  left: drawerWidth + 10,
                  width: 220,
                  color: "white",
                  borderRadius: 3,
                  position: "fixed",
                  zIndex: 1000,
                  top: "50%"
                }}
              >
                <ChromePicker
                  width={220}
                  color={themeColor}
                  onChangeComplete={color => setThemeColor(color.hex)}
                />
              </div>
            )}
          </Overlay>
        </div>
      </Drawer>
      <main className={classes.content}>
        {/* <Theme1Home themeFont={themeFont} themeFontBody={themeFontBody} themeColor={themeColor} mapLat={10.8231} mapLng={106.6297} /> */}

        <ShowPage />
      </main>
    </div>
  );
}
