import { faCog, faEye, faThLarge } from "@fortawesome/free-solid-svg-icons";
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
  setCurrentEditId
} from "../../actions";
import Header from "../../component/Header";
import Link from "../../component/link";
import SwitchButton from "../../component/SwitchButton";
import styles from "./main.module.css";

const imgUrl = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJZLvDxmOKEfBe-JfqgJ0WQhq808reFgcd0cpAQR1UGjPa6N_3",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199",
  "https://graph.facebook.com/100160931548695/picture?type=large"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "80%"
};

function WebsiteItem({ site, setCurrentEditId }) {
  return (
    <Grid container justify="space-between" className={styles.web_item}>
      <Grid container item sm={8} xs={12} alignItems="center">
        <Grid item sm={4} md={4} xs={4} className={styles.web_logo}>
          <img src={site.logo} alt="logo" style={imgStyles} />
        </Grid>
        <Grid item sm={8} xs={8} md={6}>
          <Typography variant="h5" className={styles.web_content}>
            {site.title}
          </Typography>
          <Typography variant="body2" className={styles.web_content}>
            {site.category}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        sm={4}
        xs={12}
        justify="flex-end"
        alignItems="center"
      >
        <Grid container item spacing={6}>
          <Grid item sm={5}>
            <Link to={`/${site._id}`}>
              <Button className={styles.help_button}>
                View
                <FontAwesomeIcon className={styles.web_icon} icon={faEye} />
              </Button>
            </Link>
          </Grid>
          <Grid item sm={5}>
            <Link to="/edit">
              <Button
                className={styles.help_button}
                onClick={() => setCurrentEditId(site._id)}
              >
                Edit
                <FontAwesomeIcon icon={faCog} className={styles.web_icon} />
              </Button>
            </Link>
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

  renderPagesNotGenerated = () => {
    const { pages, sites } = this.props;
    if (pages) {
      return sites && sites.length > 0
        ? sites.map(site =>
            pages.map(
              page =>
                page.id !== site.id && (
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
                    <ListItemText
                      primary={page.name}
                      secondary={page.category}
                    />
                  </ListItem>
                )
            )
          )
        : pages.map(page => {
            return (
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
            );
          });
    } else {
      return <h3>No pages existing or You haven't authorize any page</h3>;
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
            xs={5}
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
          <Grid container item sm={9} xs={7} md={10} className={styles.righter}>
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
                  <Grid item sm={5} md={3} xs={2}>
                    <img src={imgUrl[3]} alt="logo" style={imgStyles} />
                  </Grid>
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
            <Grid container item sm={10} xs={12} md={6}>
              <Grid item className={styles.siteItem}>
                {sites.length === 0 ? (
                  <h3>You don't have any Website. Please create a new site.</h3>
                ) : (
                  sites.map((item, index) => (
                    <WebsiteItem
                      key={index}
                      site={item}
                      setCurrentEditId={setCurrentEditId}
                    />
                  ))
                )}
              </Grid>
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
  setCurrentEditId: id => dispatch(setCurrentEditId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
