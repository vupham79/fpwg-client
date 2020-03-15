import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  TextField,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  closeDialog,
  confirmPage,
  getUserSites,
  openDialog,
  setEditOff
} from "../../actions";
import Header from "../../component/Header";
import SwitchButton from "../../component/SwitchButton";
import DesignTab from "./design";
import styles from "./main.module.css";

class MainPage extends Component {
  state = {
    pageUrl: "",
    pageId: "",
    pageName: "",
    sitepath: "",
    isPublish: false,
    sitepathError: false,
    pageUrlError: false,
    tab: 0
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
      userId,
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
      confirm && (await getUserSites(userId, accessToken)) && closeDialog();
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
    const { pageUrl, sitepath, isPublish, tab } = this.state;
    let nonGenerated = pages.map(page => page.id);
    let index = -1;
    sites.forEach(site => {
      index = nonGenerated.indexOf(site.id);
      if (index >= 0) {
        nonGenerated.splice(index, 1);
      }
    });
    if (nonGenerated && nonGenerated.length > 0) {
      return pages.map(page => {
        return (
          nonGenerated.includes(page.id) && (
            <>
              <ListItem
                button
                onClick={() =>
                  this.handleSelectPage({
                    id: page.id,
                    link: page.link,
                    name: page.name
                  })
                }
                key={page.id}
              >
                <ListItemAvatar>
                  <Avatar>
                    <img src={page.picture.data.url} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={page.name} secondary={page.category} />
              </ListItem>
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
          )
        );
      });
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
              href="https://www.facebook.com/pages/create/?ref_type=pages_browser"
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

  handleChangeTab = tab => {
    this.setState({
      tab
    });
  };

  componentDidMount() {
    this.props.setEditOff();
  }

  render() {
    const { closeDialog, openDialog, open } = this.props;
    const { tab } = this.state;
    return (
      <>
        <Header />
        <Grid container item className={styles.body} md={12}>
          <Grid container item sm={3} md={2} className={styles.navigation}>
            <MenuList className={styles.menu_list}>
              <MenuItem
                selected={tab === 0}
                onClick={() => this.handleChangeTab(0)}
                style={{ justifyContent: "space-evenly" }}
              >
                <FontAwesomeIcon className={styles.nav_icon} icon={faPalette} />
                <Typography variant="inherit">Design</Typography>
              </MenuItem>
            </MenuList>
          </Grid>
          <Grid
            container
            item
            sm={9}
            xs={12}
            md={10}
            className={styles.righter}
            direction={"column"}
          >
            <Grid container md={12} item className={styles.current_edit}>
              <Grid container item xs sm md>
                <Grid
                  container
                  item
                  className={styles.info}
                  alignItems="center"
                >
                  <Typography variant="body1" className={styles.info_content}>
                    CURRENT SITES
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                sm={6}
                md={4}
                alignItems="center"
                justify="flex-end"
              >
                <Grid container item sm={6}>
                  <Button className={styles.create_button} onClick={openDialog}>
                    Create A New Site
                  </Button>
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
              </Grid>
            </Grid>
            <Grid container item sm={12} xs={12} md={12}>
              {tab === 0 && <DesignTab />}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  open: state.dialog.open,
  pages: state.user.pages,
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog()),
  openDialog: () => dispatch(openDialog()),
  confirmPage: data => dispatch(confirmPage(data)),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
  setEditOff: () => dispatch(setEditOff())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
