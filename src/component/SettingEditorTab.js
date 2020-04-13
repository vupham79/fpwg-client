import {
  faInstagramSquare,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhoneAlt,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import "toastr/build/toastr.min.css";
import {
  changeSiteEmail,
  changeSiteInstagram,
  changeSitePhone,
  changeSiteSitepath,
  changeSiteWhatsapp,
  changeSiteYoutube,
  changeSiteAddress,
} from "../actions";
import toastr from "./Toastr";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const useStyles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90,
  },
  title: {
    fontFamily: "Segoe UI, sans-serif",
    marginBottom: theme.spacing(1),
    fontWeight: "600",
    color: "#555d66",
    fontSize: 14,
  },
  title2: {
    fontSize: "12px",
    marginTop: "0.25rem",
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#555d66",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b4c0cf",
    padding: "1rem",
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
  pickerButton: {
    margin: 0,
    backgroundColor: "white",
    marginBottom: "0.2rem",
  },
  customButton: {
    border: "1px solid #0071a1",
    borderRadius: 5,
    color: "#0071a1",
    fontSize: 11,
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
      backgroundColor: "white",
    },
  },
  fontPickerRoot: {
    width: "100% !important",
  },
  inputTitle: {
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: 13,
    color: "#555d66",
  },
  inputLabel: {
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: 13,
  },
});

class SettingEditorTab extends React.Component {
  state = {
    gmapsLoaded: false,
  };

  handleSelect = (address) => {
    this.props.changeSiteAddress(address);
    try {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => console.log("Success", latLng))
        .catch((error) => console.error("Error", error));
    } catch (error) {
      console.log(error);
    }
  };

  handleChangeWhatsapp = (e) => {
    const { changeSiteWhatsapp } = this.props;
    changeSiteWhatsapp(e.target.value);
  };

  handleChangeInstagram = (e) => {
    const { changeSiteInstagram } = this.props;
    changeSiteInstagram(e.target.value);
  };

  handleChangeYoutube = (e) => {
    const { changeSiteYoutube } = this.props;
    changeSiteYoutube(e.target.value);
  };

  handleChangeMail = (e) => {
    const { changeSiteEmail } = this.props;
    changeSiteEmail(e.target.value);
  };

  handleChangePhone = (e) => {
    const { changeSitePhone } = this.props;
    changeSitePhone(e.target.value);
  };

  handleChangeSitepath = (e) => {
    const { changeSiteSitepath } = this.props;
    changeSiteSitepath(e.target.value);
  };

  handleChangeAddress = (address) => {
    const { changeSiteAddress } = this.props;
    changeSiteAddress(address);
  };

  handleBrowseFavicon = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    //check if the image size is larger than 1MB
    if (file.size > 4194304) {
      toastr.error("Image size must be less than 4MB!", "Error");
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

  render() {
    const {
      classes,
      email,
      youtube,
      instagram,
      phone,
      whatsapp,
      sitepath,
      address,
    } = this.props;

    const searchOptions = {
      types: ["address"],
      // types: ['establisment'],
      // componentRestrictions: ['us'],
      // location: new google.maps.LatLng(-34, 151),
      // radius: 2000,
    };

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
              fontFamily: "Segoe UI, sans-serif",
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
              value={sitepath ? sitepath : ""}
              onChange={(e) => this.handleChangeSitepath(e)}
              style={{ marginTop: 10, backgroundColor: "white" }}
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
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
        </Grid>
        <Divider
          style={{
            height: "1rem",
            width: "100%",
            backgroundColor: "#ffffff00",
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
            <Grid item xs={2} sm={12} md={2}>
              <FontAwesomeIcon icon={faWhatsapp} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="WhatsApp"
                size="small"
                fullWidth
                value={whatsapp ? whatsapp : ""}
                onChange={(e) => this.handleChangeWhatsapp(e)}
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
                inputProps={{
                  maxLength: 15,
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
            <Grid item xs={2} sm={12} md={2}>
              <FontAwesomeIcon
                icon={faInstagramSquare}
                size="2x"
                color="#555d66"
              />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Instagram Account"
                size="small"
                inputMode={"url"}
                fullWidth
                value={instagram ? instagram : ""}
                onChange={(e) => this.handleChangeInstagram(e)}
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
                inputProps={{
                  maxLength: 250,
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
            <Grid item xs={2} sm={12} md={2}>
              <FontAwesomeIcon icon={faYoutube} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Youtube URL"
                size="small"
                inputMode={"url"}
                fullWidth
                value={youtube ? youtube : ""}
                onChange={(e) => this.handleChangeYoutube(e)}
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
                inputProps={{
                  maxLength: 250,
                }}
              />
            </Grid>
          </Grid>
          <Divider
            style={{
              height: "1rem",
              width: "100%",
              backgroundColor: "#ffffff00",
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
            <Grid container item xs={2} sm={12} md={2}>
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                size="2x"
                color="#555d66"
              />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <PlacesAutocomplete
                value={address ? address : ""}
                onChange={this.handleChangeAddress}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
                debounce={1000}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <TextField
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                      variant="outlined"
                      label="Address"
                      size="small"
                      inputMode={"Address"}
                      fullWidth
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
                      inputProps={{
                        maxLength: 250,
                      }}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && (
                        <div style={{ color: "#565d66", fontSize: 13 }}>
                          Loading...
                        </div>
                      )}
                      {suggestions.map((suggestion) => {
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#0074aa",
                              cursor: "pointer",
                              color: "white",
                              borderBottom: "1px solid #0074aa",
                              fontSize: 13,
                            }
                          : {
                              backgroundColor: "#ffffff",
                              borderLeft: "1px solid #0074aa",
                              borderRight: "1px solid #0074aa",
                              borderBottom: "1px solid #f0eded",
                              color: "#565d66",
                              fontSize: 13,
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            justify="center"
            xs={12}
            style={{ marginTop: 10 }}
          >
            <Grid container item xs={2} sm={12} md={2}>
              <FontAwesomeIcon icon={faEnvelope} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Mail"
                size="small"
                inputMode={"email"}
                fullWidth
                value={email ? email : ""}
                onChange={(e) => this.handleChangeMail(e)}
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
                inputProps={{
                  maxLength: 54,
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
            <Grid item xs={2} sm={12} md={2}>
              <FontAwesomeIcon icon={faPhoneAlt} size="2x" color="#555d66" />
            </Grid>
            <Grid item xs={10} sm={12} md={10}>
              <TextField
                variant="outlined"
                label="Phone"
                size="small"
                inputMode={"url"}
                fullWidth
                value={phone ? phone : ""}
                onChange={(e) => this.handleChangePhone(e)}
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
                inputProps={{
                  maxLength: 75,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  site: state.site.siteEdit,
  email: state.site.email,
  youtube: state.site.youtube,
  instagram: state.site.instagram,
  phone: state.site.phone,
  whatsapp: state.site.whatsapp,
  sitepath: state.site.sitepath,
  address: state.site.address,
});

const mapDispatchToProps = (dispatch) => ({
  changeSiteEmail: (email) => dispatch(changeSiteEmail(email)),
  changeSiteInstagram: (instagram) => dispatch(changeSiteInstagram(instagram)),
  changeSitePhone: (phone) => dispatch(changeSitePhone(phone)),
  changeSiteSitepath: (sitepath) => dispatch(changeSiteSitepath(sitepath)),
  changeSiteWhatsapp: (whatsapp) => dispatch(changeSiteWhatsapp(whatsapp)),
  changeSiteYoutube: (youtube) => dispatch(changeSiteYoutube(youtube)),
  changeSiteAddress: (address) => dispatch(changeSiteAddress(address)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SettingEditorTab));
