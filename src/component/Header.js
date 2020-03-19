import {
  Avatar,
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  closeDialog,
  confirmPage,
  getUserSites,
  openDialog,
  setEditOff,
  setLogout
} from "../actions";
import imgUrl from "../FBWGLogo.png";
import { firebaseAppAuth } from "../utils/firebase";
import styles from "./index.module.css";
import Link from "./link";
import SwitchButton from "./SwitchButton";
import toastr from "./Toastr";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  },
  list: {
    padding: 0
  }
})(props => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const imgStyles = {
  width: "50%",
  paddingLeft: "1.5rem"
};

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black
      }
    },
    fontSize: "14px",
    fontFamily: "Segoe UI, sans-serif"
  }
}))(MenuItem);

const ButtonCreate = withStyles(theme => ({
  root: {
    borderRadius: "2px",
    padding: "0.5rem 2rem",
    background: "white",
    "&:hover": {
      background: "white"
    },
    minHeight: "auto"
  }
}))(MenuItem);

const useStyle = theme => ({
  root: {
    background: "#006088",
    height: "9vh"
  },
  btnLink: {
    background: "#002c40",
    [theme.breakpoints.up("sm")]: {
      minWidth: "22vh"
    },
    minWidth: "fit-content"
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
      color: "white"
    },
    display: "none",
    color: "white"
  }
});

function ProfileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { profile, logout } = props;
  return (
    <>
      <Button onClick={handleClick}>
        <Avatar
          src={profile && profile.picture && profile.picture.data.url}
          className={styles.profile_img}
        />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => logout()}>Log Out</StyledMenuItem>
      </StyledMenu>
    </>
  );
}

class CustomNavBarEditor extends React.Component {
  state = {
    pageUrl: "",
    pageId: "",
    pageName: "",
    sitepath: "",
    isPublish: false,
    sitepathError: false,
    pageUrlError: false
  };
  handlePreview = body => {
    this.props.setPreviewMode(!this.props.isPreview);
  };

  logout = () => {
    const { setLogout } = this.props;
    firebaseAppAuth
      .signOut()
      .then(function() {
        setLogout();
        return <Redirect to="/" />;
      })
      .catch(function(error) {
        toastr.error(`Logout failed: ${error}`, "Error");
      });
  };

  handleSelectPage = ({ id, link, name }) => {
    this.setState({
      pageUrl: link,
      pageId: id,
      pageName: name
    });
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
                        name: page.name
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
          <ListItem>
            <TextField
              variant={"outlined"}
              fullWidth
              error={this.state.sitepathError}
              required
              label="Sitepath"
              onChange={e => this.handleChangeSitepath(e)}
              inputProps={{ maxLength: 30 }}
              value={sitepath ? sitepath : ""}
            />
            <SwitchButton
              isPublish={isPublish}
              style={{ marginLeft: 0 }}
              onChange={() => this.setState({ isPublish: !isPublish })}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              required
              error={this.state.pageUrlError}
              variant={"outlined"}
              label="Facebook Page Url"
              disabled
              onChange={e => this.handleChangeURL(e)}
              value={pageUrl ? pageUrl : ""}
            />
          </ListItem>
          <ListItem>
            <Button
              variant={"outlined"}
              onClick={() => this.handleConfirm()}
              fullWidth
            >
              Confirm
            </Button>
          </ListItem>
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

  componentDidMount() {
    this.props.setEditOff();
  }

  render() {
    const { profile, classes, closeDialog, openDialog, open } = this.props;
    return (
      <Grid container item justify="space-between" className={classes.root}>
        <Grid
          container
          item
          sm={2}
          xs={1}
          md={1}
          alignItems="center"
          justify="center"
          className={classes.btnLink}
        >
          <Link to="/">
            <Grid item container xs={12} alignItems="center">
              <Grid item xs={6}>
                <img src={imgUrl} alt="" style={imgStyles} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  className={`${classes.title} "mainFont"`}
                >
                  FPWG
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </Grid>
        <Grid
          container
          item
          sm={8}
          xs={8}
          alignItems="center"
          justify="flex-end"
        >
          <Grid container item sm={5} xs={6} justify="flex-end">
            <Link to="/create">
              <ButtonCreate
              // onClick={openDialog}
              >
                <Typography
                  className={"mainFont"}
                  style={{
                    color: "#2271b1",
                    fontSize: "12px",
                    paddingRight: "0.3rem"
                  }}
                >
                  New Site
                </Typography>
                <AddOutlinedIcon
                  style={{ color: "#2271b1" }}
                  fontSize="small"
                />
              </ButtonCreate>
            </Link>
            <Dialog
              onClose={closeDialog}
              aria-labelledby="simple-dialog-title"
              open={open}
              maxWidth="xs"
              fullWidth
            >
              <List>{this.renderPagesNotGenerated()}</List>
            </Dialog>
          </Grid>
          <Grid
            container
            justify="center"
            item
            sm={2}
            xs={3}
            className={styles.profile}
          >
            <ProfileMenu profile={profile} logout={this.logout} />
          </Grid>
        </Grid>
      </Grid>
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
  closeDialog: () => dispatch(closeDialog()),
  openDialog: () => dispatch(openDialog()),
  confirmPage: data => dispatch(confirmPage(data)),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
  setEditOff: () => dispatch(setEditOff()),
  setLogout: () => dispatch(setLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(CustomNavBarEditor));
