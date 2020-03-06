import { faThLarge } from "@fortawesome/free-solid-svg-icons";
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
  setCurrentEditId,
  syncDataFromFB
} from "../../actions";
import Header from "../../component/Header";
import Link from "../../component/link";
import SwitchButton from "../../component/SwitchButton";
import styles from "./main.module.css";

function WebsiteItem({ setCurrentEditId, site, fetchDataFromFB }) {
  return (
    <Grid container justify="space-between" className={styles.web_item}>
      <Grid
        item
        sm={2}
        md={2}
        xs={2}
        container
        style={{
          backgroundImage: `url(${site.logo})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <Grid container item sm={4} xs={4}>
        <Typography variant="subtitle1" style={{ fontWeight: "bolder" }}>
          {site.title}
        </Typography>
      </Grid>
      <Grid container item sm={4} xs={4}>
        <Grid container item>
          <Grid item md={4} sm={6}>
            <Link to={`/${site.sitePath}`}>
              <Button variant={"outlined"}>View</Button>
            </Link>
          </Grid>
          <Grid item md={4} sm={6}>
            <Link to="/edit">
              <Button
                variant={"outlined"}
                onClick={() => setCurrentEditId(site.id)}
              >
                Edit
              </Button>
            </Link>
          </Grid>
          <Grid item md={4} sm={6}>
            <Button variant={"outlined"} onClick={() => fetchDataFromFB()}>
              Sync
            </Button>
          </Grid>
        </Grid>
        <Grid item container md={6}>
          <Grid item>
            <SwitchButton
              siteId={site.id}
              siteName={site.title}
              isPublish={site.isPublish}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

class MainPage extends Component {
  state = {
    pageUrl: "",
    pageId: "",
    pageName: "",
    sitepath: "",
    isPublish: false,
    sitepathError: false,
    pageUrlError: false
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

  handleFetchData = async pageId => {
    const { fetchDataFromFB, accessToken } = this.props;
    fetchDataFromFB(pageId, accessToken);
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
    let nonGenerated = pages.map(page => page.id);
    let index = -1;
    sites.forEach(site => {
      index = nonGenerated.indexOf(site.id);
      if (index >= 0) {
        nonGenerated.splice(index, 1);
      }
    });
    if (nonGenerated) {
      return pages.map(page => {
        return (
          nonGenerated.includes(page.id) && (
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
          )
        );
      });
    } else {
      return <ListItemText>No pages left</ListItemText>;
    }
  };

  render() {
    const {
      closeDialog,
      openDialog,
      open,
      sites,
      setCurrentEditId
    } = this.props;
    const { pageUrl, sitepath, isPublish } = this.state;
    return (
      <>
        <Header />
        <Grid container item className={styles.body} md={12}>
          <Grid container item sm={3} md={2} className={styles.navigation}>
            <MenuList className={styles.menu_list}>
              <MenuItem>
                <FontAwesomeIcon className={styles.nav_icon} icon={faThLarge} />
                <Typography variant="inherit">Sites</Typography>
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
          >
            <Grid container item className={styles.current_edit}>
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
                    <List>
                      {this.renderPagesNotGenerated()}
                      <ListItem>
                        <TextField
                          variant={"outlined"}
                          fullWidth
                          error={this.state.sitepathError}
                          required
                          label="Sitepath"
                          onChange={e => this.handleChangeSitepath(e)}
                          value={sitepath ? sitepath : ""}
                        />
                        <SwitchButton
                          value={isPublish}
                          style={{ marginLeft: 0 }}
                          onChange={() =>
                            this.setState({ isPublish: !isPublish })
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <TextField
                          fullWidth
                          required
                          error={this.state.pageUrlError}
                          variant={"outlined"}
                          label="Facebook Page Url"
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
                    </List>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item sm={12} xs={12} md={12}>
              {sites.length === 0 ? (
                <h3>You don't have any Website. Please create a new site.</h3>
              ) : (
                sites.map((item, index) => (
                  <Grid
                    item
                    md={6}
                    sm={12}
                    key={index}
                    className={styles.siteItem}
                  >
                    <WebsiteItem
                      site={item}
                      setCurrentEditId={setCurrentEditId}
                      fetchDataFromFB={() => this.handleFetchData(item.id)}
                    />
                  </Grid>
                ))
              )}
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
  userId: state.user.profile.id,
  token: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(closeDialog()),
  openDialog: () => dispatch(openDialog()),
  confirmPage: data => dispatch(confirmPage(data)),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
  setCurrentEditId: id => dispatch(setCurrentEditId(id)),
  fetchDataFromFB: (pageId, accessToken) =>
    dispatch(syncDataFromFB(pageId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
