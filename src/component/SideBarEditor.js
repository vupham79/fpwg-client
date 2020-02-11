import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FontPicker from "font-picker-react";
import React, { useRef, useState } from "react";
import { Overlay } from "react-bootstrap";
import { ChromePicker, TwitterPicker } from "react-color";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Grid, Button } from "@material-ui/core";

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
      position: "sticky",
      height: "100%"
    },
    appBar: {
      backgroundColor: "#2a2e2a"
    },
    drawer: {
      flexShrink: 0,
      height: "100%"
    },
    drawerPaper: {
      // paddingTop: 10,
      // paddingLeft: 10,
      // paddingRight: 10,
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
  }));

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
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

        <Grid className={classes.sideBarBox}>
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
        </Grid>

        <Divider
          style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
        />

        <Typography className={classes.title}>Color</Typography>

        <Grid className={classes.sideBarBox}>
          <Typography className={classes.title2}>Suggested Color</Typography>

          <TwitterPicker
            width={220}
            color={themeColor}
            onChangeComplete={color => setThemeColor(color.hex)}
          />

          <Divider />

          <Typography className={classes.title2}>Custom Color</Typography>

          <Button
            variant="contained"
            color="primary"
            ref={target}
            onClick={() => setShow(!show)}
          >
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
              <Grid
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
              </Grid>
            )}
          </Overlay>
        </Grid>
      </Drawer>
    </Grid>
  );
}
