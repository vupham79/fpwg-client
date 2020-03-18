import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeSiteTitle,
  changeTheme,
  removeCover,
  setColorPallete,
  setNewCover,
  setNewLogo,
  setShowCustomColor
} from "../actions";
import DialogThemes from "./DialogThemes";

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
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#434d58 !important",
    color: "#434d58 !important"
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#434d58 !important",
    color: "#434d58 !important"
  },
  pickerButton: {
    margin: 0
  }
});

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "6rem",
  height: "6rem"
};

class ThemeEditorTab extends React.Component {
  state = {
    file: null,
    pallete: [],
    covers: [],
    logo: ""
  };

  handleChangeTheme = event => {
    const { changeTheme, themes, site } = this.props;
    const theme = themes.find(e => e.id === event.target.value);
    site.theme = theme;
    this.setState({ changeTheme: true });
    changeTheme(site);
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

  render() {
    const drawerWidth = 280;
    const {
      isShow,
      setShowCustomColor,
      classes,
      site,
      colorPallete,
      isChanged
    } = this.props;

    return (
      <div>
        <Typography className={classes.title}>Theme</Typography>
        <DialogThemes />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  isShow: state.theme.isShow,
  site: state.site.siteEdit,
  colorPallete: state.site.colorPallete,
  newCover: state.site.newCover,
  isChanged: state.site.isChanged
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site)),
  changeColor: site => dispatch(changeColor(site)),
  changeFontTitle: site => dispatch(changeFontTitle(site)),
  changeFontBody: site => dispatch(changeFontBody(site)),
  setShowCustomColor: isShow => dispatch(setShowCustomColor(isShow)),
  changeSiteTitle: site => dispatch(changeSiteTitle(site)),
  setColorPallete: pallete => dispatch(setColorPallete(pallete)),
  setNewLogo: file => dispatch(setNewLogo(file)),
  setNewCover: file => dispatch(setNewCover(file)),
  removeCover: cover => dispatch(removeCover(cover))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThemeEditorTab));
