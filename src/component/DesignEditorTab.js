import React from "react";
import { ChromePicker, TwitterPicker } from "react-color";
import { themes } from "../constant/constant";
import FontPicker from "font-picker-react";
import {
  Button,
  Grid,
  Divider,
  List,
  MenuItem,
  Typography,
  Select
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  changeTheme,
  changeFontTitle,
  changeFontBody,
  changeColor,
  setShowCustomColor,
  getImageUrl
} from "../actions";

const useStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    marginTop: theme.spacing(2),
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

const images = [
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/coffee-918926_1920.jpg",
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/cover-1589426_1920.jpg",
  "https://s3.amazonaws.com/pv-featured-images/restaurant-cafe/alcohol-1869282_1920.jpg",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "20%",
  marginRight: "1rem"
};

class DesignEditorTab extends React.Component {
  render() {
    const drawerWidth = 280;
    const {
      themeName,
      changeTheme,
      themeFontTitle,
      changeColor,
      changeFontTitle,
      themeFontBody,
      changeFontBody,
      isShow,
      themeColor,
      setShowCustomColor,
      classes,
      getImageUrl
    } = this.props;
    return (
      <>
        <Typography className={classes.title}>Theme</Typography>
        <Select
          // defaultValue={themeName}
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
              onChange={font => changeFontTitle(font.family)}
            />
          </List>
          <Divider />
          <Typography className={classes.title2}>Font Body</Typography>
          <FontPicker
            apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
            sort="alphabet"
            activeFontFamily={themeFontBody}
            onChange={font => changeFontBody(font.family)}
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
            onChangeComplete={color => changeColor(color.hex)}
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
                left: drawerWidth - 30,
                width: 220,
                color: "white",
                borderRadius: 3,
                zIndex: 1000,
                top: "50%"
              }}
            >
              <ChromePicker
                color={themeColor}
                onChangeComplete={color => changeColor(color.hex)}
              />
            </Grid>
          ) : null}
        </Grid>
        <Divider
          style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Logo</Typography>
        <Grid className={classes.sideBarBox}>
          {images.map((img, i) => (
            <img
              style={imgStyles}
              src={img}
              alt=""
              key={i}
              onClick={() => getImageUrl(img)}
            />
          ))}
        </Grid>
        <Divider
          style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  themeName: state.theme.name,
  themeColor: state.theme.color,
  themeFontTitle: state.theme.fontTitle,
  themeFontBody: state.theme.fontBody,
  isShow: state.theme.isShow,
  toast_option: state.toastr.option
});

const mapDispatchToProps = dispatch => ({
  changeTheme: name => dispatch(changeTheme(name)),
  changeColor: color => dispatch(changeColor(color)),
  changeFontTitle: fontTitle => dispatch(changeFontTitle(fontTitle)),
  changeFontBody: fontBody => dispatch(changeFontBody(fontBody)),
  setShowCustomColor: isShow => dispatch(setShowCustomColor(isShow)),
  getImageUrl: url => dispatch(getImageUrl(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DesignEditorTab));
