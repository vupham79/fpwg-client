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
  closeCreateNewSite,
  confirmPage,
  getUserSites,
  openCreateNewSite,
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
      <Grid container item sm={8} xs={12} alignItems="center">
        <Grid
          item
          sm={4}
          md={4}
          xs={4}
          className={styles.web_logo}
          style={{
            backgroundImage: `url(${site.logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%"
          }}
        />
        <Grid item sm={8} xs={8} md={6}>
          <Typography variant="h5" className={styles.web_content}>
            {site.title}
          </Typography>
          <Typography variant="body2" className={styles.web_content}>
            {site.category}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item sm={4} xs={12}>
        <Grid container item>
          <Grid item md={4} sm={6}>
            <Link to={`/${site.id}`}>
              <Button className={styles.help_button}>
                View
                {/* <FontAwesomeIcon className={styles.web_icon} icon={faEye} /> */}
              </Button>
            </Link>
          </Grid>
          <Grid item sm={5}>
            <Link to="/edit">
              <Button
                className={styles.help_button}
                onClick={() => setCurrentEditId(site.id)}
              >
                Edit
                {/* <FontAwesomeIcon icon={faCog} className={styles.web_icon} /> */}
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container item sm={11} justify="flex-end">
          <Button
            className={styles.help_button}
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            onClick={() => fetchDataFromFB()}
          >
            Sync
          </Button>
        </Grid>
      </Grid>
      <Grid container item justify="flex-end" md={12}>
        <SwitchButton
          siteId={site.id}
          siteName={site.title}
          isPublish={site.isPublish}
        />
      </Grid>
    </Grid>
  );
}

class MainPage extends Component {
  state = {
    pageUrl: "",
    pageId: "",
    pageName: ""
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
      closeCreateNewSite,
      userId,
      getUserSites
    } = this.props;
    const { pageId, pageUrl, pageName } = this.state;
    const confirm = await confirmPage({
      pageId,
      pageUrl,
      accessToken,
      profile,
      name: pageName
    });
    confirm && (await getUserSites(userId, accessToken));
    closeCreateNewSite();
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
      closeCreateNewSite,
      openCreateNewSite,
      open,
      sites,
      setCurrentEditId
    } = this.props;
    const { pageUrl } = this.state;
    return (
      <>
        <Header />
        <Grid container item className={styles.body}>
          <Grid
            container
            item
            direction="column"
            sm={3}
            md={2}
            className={styles.navigation}
          >
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
                  sm={6}
                  md={4}
                  className={styles.info}
                  alignItems="center"
                >
                  <Typography variant="body1" className={styles.info_content}>
                    CURRENTLY EDITING
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  sm={6}
                  md={4}
                  className={styles.info}
                  alignItems="center"
                >
                  <Grid item sm={2}>
                    <Typography variant="body1" className={styles.info_content}>
                      Foody
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={10}
                  md={4}
                  className={styles.info}
                  alignItems="center"
                >
                  <Typography variant="body1" className={styles.info_content}>
                    Last Logged in: 06-02-2020
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
                  <Button className={styles.manage_button}>Manage Site</Button>
                </Grid>
                <Grid container item sm={6}>
                  <Button
                    className={styles.create_button}
                    onClick={openCreateNewSite}
                  >
                    Create A New Site
                  </Button>
                  <Dialog
                    onClose={closeCreateNewSite}
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    maxWidth="xs"
                    fullWidth
                  >
                    <List>
                      {this.renderPagesNotGenerated()}
                      <ListItem autoFocus button>
                        <TextField
                          fullWidth
                          label="Facebook Page Url"
                          onChange={e => this.handleChangeURL(e)}
                          value={pageUrl ? pageUrl : ""}
                        />
                      </ListItem>
                      <ListItem autoFocus button>
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
  closeCreateNewSite: () => dispatch(closeCreateNewSite()),
  openCreateNewSite: () => dispatch(openCreateNewSite()),
  confirmPage: data => dispatch(confirmPage(data)),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
  setCurrentEditId: id => dispatch(setCurrentEditId(id)),
  fetchDataFromFB: (pageId, accessToken) =>
    dispatch(syncDataFromFB(pageId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
