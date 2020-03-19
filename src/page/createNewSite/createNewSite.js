import {
  Avatar,
  Button,
  Container,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmPage } from "../../actions";
import Link from "../../component/link";

class createNewSite extends Component {
  state = {
    pageUrl: "",
    sitepath: "",
    isPublish: false,
    sitepathError: false,
    id: "",
    picture: "",
    pageName: ""
  };

  handleConfirm = async () => {
    const {
      confirmPage,
      accessToken,
      profile,
      closeDialog,
      getUserSites
    } = this.props;
    const { pageId, pageUrl, pageName, sitepath, isPublish } = this.state;
    if (pageUrl && sitepath) {
      this.setState({
        pageUrlError: false,
        sitepathError: false
      });
      const confirm = await confirmPage({
        pageId,
        pageUrl,
        accessToken,
        profile,
        name: pageName,
        sitepath,
        isPublish
      });
      confirm &&
        (await getUserSites(profile.userId, accessToken)) &&
        closeDialog();
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
      pageId: id,
      pageName: name,
      picture: picture
    });
  };

  renderPagesNotGenerated = () => {
    const { pages, sites } = this.props;
    const { pageUrl, sitepath, isPublish } = this.state;
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
            <p style={{ textAlign: "center", marginLeft: 5, marginRight: 5 }}>
              No Facebook page to use. Please create one below.
            </p>
          </Grid>
          <Grid item xs={6}>
            <a
              href="https://www.facebook.com/pages/create/?ref_type=universal_creation_hub"
              rel="noopener noreferrer"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button color="primary" variant={"contained"}>
                Create Facebook Page
              </Button>
            </a>
          </Grid>
        </Grid>
      );
    }
  };

  renderSelectedPage = () => {
    const {} = this.props;
    const { id, pageUrl, picture } = this.state;
    return (
      <Grid container>
        <Grid
          item
          sm={12}
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
        <Grid item sm={12}>
          <Typography
            style={{
              marginBottom: ".75em",
              fontSize: "24px",
              lineHeight: "1.25em"
            }}
          >
            Title
          </Typography>
          <TextField FormHelperTextProps />
        </Grid>
      </Grid>
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
  open: state.dialog.open,
  pages: state.user.pages,
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  confirmPage: data => dispatch(confirmPage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(createNewSite);
