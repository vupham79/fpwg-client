import {
  Avatar,
  Button,
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ArrowBackIos, Facebook, Public } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmPage } from "../../actions";
import ButtonStyled from "../../component/Button";
import Link from "../../component/link";
require("dotenv").config();

const useStyle = (theme) => ({
  textField: {
    padding: "2px !important",
  },
  secondary: {
    color: "#fff",
  },
  primary: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputRoot: {
    position: "relative",
    "& $notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#4A90E2",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
    },
    "&$focused $notchedOutline": {
      borderColor: "#4A90E2",
      borderWidth: 1,
    },
  },
  containerLeft: {
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
    [theme.breakpoints.up("sm")]: {
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "0px",
    },
  },
  containerRight: {
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
    [theme.breakpoints.up("sm")]: {
      borderTopRightRadius: "80px",
      borderBottomRightRadius: "80px",
    },
  },
});

class createNewSite extends Component {
  state = {
    pageUrl: "",
    sitepath: "",
    isPublish: false,
    sitepathError: false,
    pageUrlError: false,
    id: "",
    picture: "",
    name: "",
  };

  handleConfirm = async () => {
    const { confirmPage, accessToken, profile } = this.props;
    const { id, pageUrl, name, sitepath, isPublish } = this.state;
    if (pageUrl && sitepath) {
      this.setState({
        pageUrlError: false,
        sitepathError: false,
      });
      const confirm = await confirmPage({
        pageId: id,
        pageUrl,
        accessToken,
        profile,
        name,
        sitepath,
        isPublish,
      });
      if (confirm) {
        window.location.href = "/";
      }
    } else {
      if (!pageUrl) {
        this.setState({
          pageUrlError: true,
        });
      } else {
        this.setState({
          pageUrlError: false,
        });
      }
      if (!sitepath) {
        this.setState({
          sitepathError: true,
        });
      } else {
        this.setState({
          sitepathError: false,
        });
      }
    }
  };

  handleChangeURL = (e) => {
    this.setState({
      pageUrl: e.target.value,
    });
  };

  handleChangeSitepath = (e) => {
    this.setState({
      sitepath: e.target.value,
    });
  };

  handleSelectPage = ({ id, link, name, picture }) => {
    this.setState({
      pageUrl: link,
      id: id,
      name: name,
      picture: picture,
    });
  };

  renderPagesNotGenerated = () => {
    const { pages, sites, classes } = this.props;
    let nonGenerated = pages && pages.map((page) => page.id);
    let index = -1;
    sites.forEach((site) => {
      index = nonGenerated.indexOf(site.id);
      if (index >= 0) {
        nonGenerated.splice(index, 1);
      }
    });
    if (nonGenerated && nonGenerated.length > 0) {
      return (
        <>
          {pages.map(
            (page) =>
              nonGenerated.includes(page.id) && (
                <React.Fragment key={page.id}>
                  <ListItem
                    button
                    onClick={() =>
                      this.handleSelectPage({
                        id: page.id,
                        link: page.link,
                        name: page.name,
                        picture: page.picture.data.url,
                      })
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <img src={page.picture.data.url} alt="" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={page.name}
                      secondary={page.category}
                      classes={{
                        primary: classes.primary,
                        secondary: classes.secondary,
                      }}
                    />
                  </ListItem>
                </React.Fragment>
              )
          )}
        </>
      );
    } else {
      return (
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <p
              style={{
                textAlign: "center",
                fontFamily: "Roboto,sans-serif",
                fontSize: "16px",
              }}
            >
              No Facebook page to use or no page you authorized left.
            </p>
          </Grid>
          <Grid item xs={6}>
            <a
              href="https://www.facebook.com/pages/create/?ref_type=universal_creation_hub"
              rel="noopener noreferrer"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <ButtonStyled
                backgroundColor="#4267b2"
                color="#fff"
                label={"Create Facebook Page"}
              />
            </a>
          </Grid>
        </Grid>
      );
    }
  };

  renderSelectedPage = () => {
    const { picture, pageUrl, name, sitepath } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Grid
          item
          sm={12}
          lg={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={picture}
            alt=""
            style={{
              height: "5rem",
              width: "5rem",
              borderRadius: "100%",
              border: !picture ? "1px dashed black" : "",
            }}
          />
        </Grid>
        <Grid
          item
          sm={12}
          lg={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography>{name}</Typography>
        </Grid>
        <Grid item sm={12}>
          <TextField
            placeholder={"Facebook Page URL"}
            inputProps={{
              style: {
                padding: "7px 14px",
                textAlign: "center",
                // fontFamily: "Roboto,sans-serif",
                fontSize: "12px",
              },
              maxLength: 250,
            }}
            onChange={this.handleChangeURL}
            fullWidth
            disabled
            error={this.state.pageUrlError}
            variant={"outlined"}
            value={pageUrl}
            InputProps={{
              startAdornment: (
                <Tooltip title="Facebook Page URL">
                  <Facebook />
                </Tooltip>
              ),
            }}
            classes={classes.inputRoot}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            placeholder={"Sitepath"}
            onChange={this.handleChangeSitepath}
            inputProps={{
              style: {
                padding: "7px 14px",
                textAlign: "center",
                fontFamily: "Roboto,sans-serif",
                fontSize: "12px",
              },
              maxLength: 50,
            }}
            error={this.state.sitepathError}
            fullWidth
            variant={"outlined"}
            value={sitepath}
            InputProps={{
              startAdornment: (
                <Tooltip
                  title={`Set a unique path name to your website. Example: Site path "your_sitepath" means your website url will be "${process.env.REACT_APP_HOST}your_sitepath"`}
                >
                  <Public />
                </Tooltip>
              ),
            }}
            classes={classes.inputRoot}
          />
        </Grid>
        <Grid
          item
          sm={12}
          style={{
            borderTop: "1px solid #f6f7f7",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{
              fontSize: "11px",
              margin: "0 0 16px",
              textAlign: "center",
            }}
          >
            By submit creating new site you agree to our{" "}
            <span style={{ color: "#000" }}>Terms of Service</span> to sync{" "}
            <span style={{ color: "#000" }}>certain data and settings</span> to
            FPWG
          </Typography>
          <ButtonStyled
            style={{
              color: "#006088",
              borderColor: "#006088",
              fontWeight: "bold",
            }}
            label="Confirm"
            onClick={this.handleConfirm}
          />
        </Grid>
      </>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          // backgroundColor: "#f6f7f7",
          height: "100vh",
          backgroundImage: `url('/images/dark_background.jpg')`,
          backgroundSize: "cover",
        }}
      >
        <Link to="/">
          <Button
            style={{ color: "#fff", fontFamily: "Roboto, sans-serif" }}
            startIcon={<ArrowBackIos />}
          >
            Back
          </Button>
        </Link>
        <Container maxWidth={"md"} style={{ paddingTop: "2rem" }}>
          <Typography
            style={{
              marginBottom: ".35em",
              fontSize: "34px",
              fontWeight: 400,
              color: "#fff",
              // textTransform: "uppercase",
            }}
            align={"center"}
          >
            Create New Site
          </Typography>
          <Grid container>
            <Grid
              item
              container
              sm={6}
              classes={classes.containerLeft}
              style={{
                // backgroundColor: "#fff",
                backgroundColor: "rgb(222,228,231, 0.2)",
                padding: "1.5rem",
                // boxShadow: "0 0 0 1px #dcdcde",
                height: "40vh",
                overflow: "auto",
              }}
            >
              {this.renderPagesNotGenerated()}
            </Grid>
            <Grid
              item
              container
              sm={6}
              classes={classes.containerRight}
              style={{
                // backgroundColor: "#fff",
                backgroundColor: "rgb(222,228,231, 0.7)",
                padding: "1.5rem",
                // boxShadow: "0 0 0 1px #dcdcde",
                height: "40vh",
                overflow: "auto",
              }}
            >
              {this.renderSelectedPage()}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.user.pages,
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  confirmPage: (data) => dispatch(confirmPage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(createNewSite));
