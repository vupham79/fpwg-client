import {
  Avatar,
  Button,
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  withStyles,
  Tooltip
} from "@material-ui/core";
import { ArrowBackIos, Public, Facebook } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmPage } from "../../actions";
import Link from "../../component/link";
import ButtonStyled from "../../component/Button";

const useStyle = theme => ({
  textField: {
    overflow: "hidden",
    backgroundColor: "#fcfcfb",
    "&:hover": {},
    "&:focused": {
      backgroundColor: "red !important",
      borderColor: "red !important"
    }
  }
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
    name: ""
  };

  handleConfirm = async () => {
    const { confirmPage, accessToken, profile } = this.props;
    const { id, pageUrl, name, sitepath, isPublish } = this.state;
    if (pageUrl && sitepath) {
      this.setState({
        pageUrlError: false,
        sitepathError: false
      });
      const confirm = await confirmPage({
        pageId: id,
        pageUrl,
        accessToken,
        profile,
        name,
        sitepath,
        isPublish
      });
      if (confirm) {
        window.location.href = "/";
      }
    } else {
      if (!pageUrl) {
        this.setState({
          pageUrlError: true
        });
      } else {
        this.setState({
          pageUrlError: false
        });
      }
      if (!sitepath) {
        this.setState({
          sitepathError: true
        });
      } else {
        this.setState({
          sitepathError: false
        });
      }
    }
  };

  handleChangeURL = e => {
    this.setState({
      pageUrl: e.target.value
    });
  };

  handleChangeSitepath = e => {
    this.setState({
      sitepath: e.target.value
    });
  };

  handleSelectPage = ({ id, link, name, picture }) => {
    this.setState({
      pageUrl: link,
      id: id,
      name: name,
      picture: picture
    });
  };

  renderPagesNotGenerated = () => {
    const { pages, sites } = this.props;
    let nonGenerated = pages && pages.map(page => page.id);
    let index = -1;
    sites.forEach(site => {
      index = nonGenerated.indexOf(site.id);
      if (index >= 0) {
        nonGenerated.splice(index, 1);
      }
    });
    if (nonGenerated && nonGenerated.length > 0) {
      return (
        <>
          {pages.map(
            page =>
              nonGenerated.includes(page.id) && (
                <React.Fragment key={page.id}>
                  <ListItem
                    button
                    onClick={() =>
                      this.handleSelectPage({
                        id: page.id,
                        link: page.link,
                        name: page.name,
                        picture: page.picture.data.url
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
                fontFamily: "Segoe UI,sans-serif",
                fontSize: "16px"
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
              border: !picture ? "1px dashed black" : ""
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
                fontFamily: "Segoe UI,sans-serif",
                fontSize: "12px"
              }
            }}
            onChange={this.handleChangeURL}
            fullWidth
            error={this.state.pageUrlError}
            variant={"outlined"}
            value={pageUrl}
            InputProps={{
              startAdornment: (
                <Tooltip title="Facebook Page URL">
                  <Facebook />
                </Tooltip>
              )
            }}
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
                fontFamily: "Segoe UI,sans-serif",
                fontSize: "12px"
              }
            }}
            error={this.state.sitepathError}
            fullWidth
            variant={"outlined"}
            value={sitepath}
            InputProps={{
              startAdornment: (
                <Tooltip
                  title={`Set a unique path name to your website. Example: Site path "abc" means your website url will be "https://fpwg.herokuapp.com/abc"`}
                >
                  <Public />
                </Tooltip>
              )
            }}
          />
        </Grid>
        <Grid
          item
          sm={12}
          style={{
            borderTop: "1px solid #f6f7f7",
            // margin: "24px -24px -24px",
            justifyContent: "flex-end",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography
            style={{
              fontSize: "11px",
              margin: "0 0 16px",
              textAlign: "center"
            }}
          >
            By submit creating new site you agree to our{" "}
            <span style={{ color: "#2271b1" }}>Terms of Service</span> and to
            sync{" "}
            <span style={{ color: "#2271b1" }}>certain data and settings</span>{" "}
            to FPWG
          </Typography>
          <ButtonStyled
            style={{
              color: "#006088",
              borderColor: "#006088",
              fontWeight: "bold"
            }}
            label="Confirm"
            onClick={this.handleConfirm}
          />
        </Grid>
      </>
    );
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f6f7f7", height: "100vh" }}>
        <Link to="/">
          <Button
            style={{ color: "#646970", fontFamily: "Segoe UI, sans-serif" }}
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
              fontWeight: 300,
              color: "#3c434a"
            }}
            align={"center"}
            // variant={"h5"}
          >
            Create New Site
          </Typography>
          <Grid container>
            <Grid
              item
              container
              sm={6}
              style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                boxShadow: "0 0 0 1px #dcdcde",
                height: "40vh",
                overflow: "auto"
              }}
            >
              {this.renderPagesNotGenerated()}
            </Grid>
            <Grid
              item
              container
              sm={6}
              style={{
                backgroundColor: "#fff",
                padding: "1.5rem",
                boxShadow: "0 0 0 1px #dcdcde",
                height: "40vh",
                overflow: "auto"
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

const mapStateToProps = state => ({
  pages: state.user.pages,
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  confirmPage: data => dispatch(confirmPage(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(createNewSite));
