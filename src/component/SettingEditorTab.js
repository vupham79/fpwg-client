import {
  faInstagram,
  faWhatsapp,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import "toastr/build/toastr.min.css";
import { changeSiteLinks, setNewFavicon, setNewMetas } from "../actions";
import toastr from "./Toastr";
const useStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    fontFamily: "Segoe UI, sans-serif",
    marginBottom: theme.spacing(1),
    fontWeight: "600",
    color: "#555d66",
    fontSize: 14
  },
  title2: {
    fontSize: "12px",
    marginTop: "0.25rem",
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#555d66"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b4c0cf",
    padding: "1rem"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important"
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important"
  },
  pickerButton: {
    margin: 0,
    backgroundColor: "white",
    marginBottom: "0.2rem"
  },
  customButton: {
    border: "1px solid #0071a1",
    borderRadius: 5,
    color: "#0071a1",
    fontSize: 11
  },
  logoButton: {
    marginTop: 5,
    border: "1px solid #555d66",
    borderRadius: 5,
    color: "#555d66",
    borderStyle: "dashed",
    fontSize: 13,
    height: 40,
    width: "100%",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  fontPickerRoot: {
    width: "100% !important"
  },
  inputTitle: {
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: 13,
    color: "#555d66"
  },
  inputLabel: {
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: 13
  }
});

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const expanStyle = {
  marginTop: "1rem"
};

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "2rem",
  height: "2rem"
};
class SettingEditorTab extends React.Component {
  handleChangeWhatsapp = e => {
    const { site, changeSiteLinks } = this.props;
    site.whatsapp = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeInstagram = e => {
    const { site, changeSiteLinks } = this.props;
    site.instagram = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeYoutube = e => {
    const { site, changeSiteLinks } = this.props;
    site.youtube = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeMail = e => {
    const { site, changeSiteLinks } = this.props;
    site.email = e.target.value;
    changeSiteLinks(site);
  };

  handleChangePhone = e => {
    const { site, changeSiteLinks } = this.props;
    site.phone = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeSitepath = e => {
    const { site, changeSiteLinks } = this.props;
    site.sitePath = e.target.value;
    changeSiteLinks(site);
  };

  handleBrowseFavicon = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
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
      var output = document.getElementById("previewFavicon");
      output.style.backgroundImage = `url('${URL.createObjectURL(
        e.target.files[0]
      )}')`;
      this.props.setNewFavicon(e.target.files[0]);
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleChangeMetas = e => {
    const { setNewMetas } = this.props;
    setNewMetas(e.target.value);
  };

  render() {
    const { site, classes, metas } = this.props;
    return (
      <div style={{ padding: 10 }}>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
          xs={12}
          style={{ marginTop: 10 }}
        >
          <Grid
            item
            style={{
              color: "#555d66",
              textAlign: "left",
              fontStyle: "italic",
              fontFamily: "Segoe UI, sans-serif"
            }}
          >
            Set a unique path name to your website. Example: Site path "abc"
            means your website url will be "https://fpwg.herokuapp.com/abc"
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              inputMode={"url"}
              fullWidth
              value={site.sitePath ? site.sitePath : ""}
              onChange={e => this.handleChangeSitepath(e)}
              style={{ marginTop: 10, backgroundColor: "white" }}
              InputLabelProps={{
                classes: {
                  focused: classes.focused,
                  root: classes.inputLabel
                }
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.notchedOutline,
                  input: classes.inputTitle
                }
              }}
            />
          </Grid>
        </Grid>
        <Divider
          style={{
            height: "1rem",
            width: "100%",
            backgroundColor: "#ffffff00"
          }}
        />
        <Typography className={classes.title}>Links</Typography>
        <Grid container>
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={12}
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2} sm={12} md={2} justify="center">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="WhatsApp"
                size="small"
                fullWidth
                value={site.whatsapp ? site.whatsapp : ""}
                onChange={e => this.handleChangeWhatsapp(e)}
                InputLabelProps={{
                  classes: {
                    focused: classes.focused,
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputTitle
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={12}
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2} sm={12} md={2} justify="center">
              <FontAwesomeIcon icon={faInstagram} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Instagram"
                size="small"
                inputMode={"url"}
                fullWidth
                value={site.instagram ? site.instagram : ""}
                onChange={e => this.handleChangeInstagram(e)}
                InputLabelProps={{
                  classes: {
                    focused: classes.focused,
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputTitle
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={12}
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2} sm={12} md={2} justify="center">
              <FontAwesomeIcon icon={faYoutube} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Youtube"
                size="small"
                inputMode={"url"}
                fullWidth
                value={site.youtube ? site.youtube : ""}
                onChange={e => this.handleChangeYoutube(e)}
                InputLabelProps={{
                  classes: {
                    focused: classes.focused,
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputTitle
                  }
                }}
              />
            </Grid>
          </Grid>
          <Divider
            style={{
              height: "1rem",
              width: "100%",
              backgroundColor: "#ffffff00"
            }}
          />
          <Typography className={classes.title}>Contact</Typography>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            justify="center"
            xs={12}
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2} sm={12} md={2} justify="center">
              <FontAwesomeIcon icon={faEnvelope} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Mail"
                size="small"
                inputMode={"email"}
                fullWidth
                value={site.email ? site.email : ""}
                onChange={e => this.handleChangeMail(e)}
                InputLabelProps={{
                  classes: {
                    focused: classes.focused,
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputTitle
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={12}
            style={{ marginTop: 10 }}
          >
            <Grid item xs={2} sm={12} md={2} justify="center">
              <FontAwesomeIcon icon={faPhoneAlt} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Phone"
                size="small"
                inputMode={"url"}
                fullWidth
                value={site.phone ? site.phone : ""}
                onChange={e => this.handleChangePhone(e)}
                InputLabelProps={{
                  classes: {
                    focused: classes.focused,
                    root: classes.inputLabel
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputTitle
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">SEO</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid
                container
                item
                direction="row"
                justify="space-around"
                alignItems="center"
                xs={12}
                md={12}
                style={{ marginTop: 10 }}
              >
                <Grid item xs={2} sm={2}>
                  <Typography className={classes.title2}>Favicon</Typography>
                </Grid>
                <Grid item container xs={8} sm={8} justify={"center"}>
                  <Grid
                    onClick={() =>
                      document.getElementById("selectedFavicon").click()
                    }
                    id={"previewFavicon"}
                    item
                    // sm={6}
                    style={{
                      cursor: "pointer",
                      ...imgStyles,
                      backgroundImage: `url('${
                        site.favicon ? site.favicon : site.logo
                        }')`
                    }}
                  >
                    <Input
                      type="file"
                      id="selectedFavicon"
                      onChange={e => this.handleBrowseFavicon(e)}
                      style={{ display: "none" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                direction="row"
                justify="space-around"
                alignItems="center"
                xs={12}
                sm={12}
                style={{ marginTop: 10 }}
              >
                <Grid item xs={4} sm={4}>
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">Format to input</Typography>
                        {"meta1=ABC"}
                        <br />
                        {"meta2=ABC"}
                        <br />
                        {"meta3=ABC"}
                        <br />
                      </React.Fragment>
                    }
                  >
                    <Typography className={classes.title2}>
                      Metadata
                      <FontAwesomeIcon icon={faInfoCircle} size={"sm"} />
                    </Typography>
                  </HtmlTooltip>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TextField
                    value={metas}
                    fullWidth
                    variant={"outlined"}
                    multiline
                    onChange={this.handleChangeMetas}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel> */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  site: state.site.siteEdit,
  metas: state.site.metas
});

const mapDispatchToProps = dispatch => ({
  changeSiteLinks: site => dispatch(changeSiteLinks(site)),
  setNewFavicon: file => dispatch(setNewFavicon(file)),
  setNewMetas: metas => dispatch(setNewMetas(metas))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SettingEditorTab));
