import {
  Button,
  Divider,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FontPicker from "font-picker-react";
import React from "react";
import { ChromePicker, TwitterPicker } from "react-color";
import { connect } from "react-redux";
import toastr from "./Toastr";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeTheme,
  getImageUrl,
  setShowCustomColor,
  uploadLogo,
  changeSiteTitle
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
  state = {
    file: null
  };

  handleChangeTheme = event => {
    const { changeTheme, themes, site } = this.props;
    const theme = themes.find(e => e.name === event.target.value);
    site.theme = theme;
    changeTheme(site);
  };
  handleChangeTitle = font => {
    const { site, changeFontTitle } = this.props;
    site.fontTitle = font.family;
    changeFontTitle(site);
  };
  handleChangeColor = color => {
    const { site, changeColor } = this.props;
    site.color = color.hex;
    changeColor(site);
  };
  handleChangeFontBody = font => {
    const { site, changeFontBody } = this.props;
    site.fontBody = font.family;
    changeFontBody(site);
  };

  handleUpload = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (file === null) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    //check if the image size is larger than 1MB
    if (file.size > 1048576) {
      toastr.error("Image size must be less than 1MB!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      this.setState({ file });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleChangeSiteTitle = e => {
    const { site, changeSiteTitle } = this.props;
    site.title = e.target.value;
    changeSiteTitle(site);
  };
  render() {
    const drawerWidth = 280;
    const {
      isShow,
      setShowCustomColor,
      classes,
      getImageUrl,
      themes,
      site,
      uploadLogo
    } = this.props;

    return (
      <>
        <div style={{ overflowY: "scroll" }}>
          <Typography className={classes.title}>Theme</Typography>
          <Grid className={classes.sideBarBox}>
            <Select
              autoComplete="true"
              value={site && site.theme.name}
              fullWidth
              onChange={this.handleChangeTheme}
            >
              {themes.map((element, index) => (
                <MenuItem value={element.name} key={index}>
                  {element.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Typography className={classes.title}>Font</Typography>
          <Grid container className={classes.sideBarBox}>
            <Typography className={classes.title2}>Font Title</Typography>
            <Grid item container>
              <FontPicker
                apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
                sort="alphabet"
                activeFontFamily={site.fontTitle}
                onChange={this.handleChangeTitle}
              />
            </Grid>
            <Divider />
            <Typography className={classes.title2}>Font Body</Typography>
            <Grid container>
              <FontPicker
                apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
                sort="alphabet"
                activeFontFamily={site.fontBody}
                onChange={this.handleChangeFontBody}
              />
            </Grid>
          </Grid>
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Typography className={classes.title}>Color</Typography>
          <Grid className={classes.sideBarBox}>
            <Typography className={classes.title2}>Suggested Color</Typography>
            <TwitterPicker
              width={"fit-content"}
              color={site.color}
              onChangeComplete={this.handleChangeColor}
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
                  color={site.color}
                  onChangeComplete={this.handleChangeColor}
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
          <Grid className={classes.sideBarBox}>
            <Input
              type="file"
              name="Logo"
              onChange={e => this.handleUpload(e)}
            />
            <Button
              variant={"contained"}
              onClick={() => uploadLogo(this.state.file, site.id)}
            >
              Upload
            </Button>
          </Grid>
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
          <Grid className={classes.sideBarBox}>
            <TextField
              id="standard-multiline-static"
              label="Your Title"
              rows="4"
              value={site.title}
              onChange={e => this.handleChangeSiteTitle(e)}
            />
          </Grid>
          <Divider
            style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  isShow: state.theme.isShow,
  site: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site)),
  changeColor: site => dispatch(changeColor(site)),
  changeFontTitle: site => dispatch(changeFontTitle(site)),
  changeFontBody: site => dispatch(changeFontBody(site)),
  setShowCustomColor: isShow => dispatch(setShowCustomColor(isShow)),
  getImageUrl: url => dispatch(getImageUrl(url)),
  uploadLogo: (path, name) => dispatch(uploadLogo(path, name)),
  changeSiteTitle: site => dispatch(changeSiteTitle(site))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DesignEditorTab));
