import { faCog, faEye, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, MenuItem, MenuList, Typography, Dialog, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import Header from "../../component/Header";
import Link from "../../component/link";
import styles from "./main.module.css";
import { connect } from "react-redux";
import SwitchButton from "../../component/SwitchButton";
import {
  setEdit,
  openCreateNewSite,
  closeCreateNewSite,
  confirmPage
} from "../../actions";
import { openLoading, closeLoading } from "../../actions";
import { getUserSites } from "../../actions/site";

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

function WebsiteItem(props) {
  return (
    <Grid container justify="space-between" className={styles.web_item}>
      <Grid container item sm={8} xs={12} alignItems="center">
        <Grid item sm={4} md={4} xs={4} className={styles.web_logo}>
          <img src={props.logo} alt="logo" style={imgStyles} />
        </Grid>
        <Grid item sm={8} xs={8} md={6}>
          <Typography variant="h5" className={styles.web_content}>
            {props.title}
          </Typography>
          <Typography variant="body2" className={styles.web_content}>
            {props.category}
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
            <Button className={styles.help_button}>
              View
              <FontAwesomeIcon className={styles.web_icon} icon={faEye} />
            </Button>
          </Grid>
          <Grid item sm={5}>
            <Link to="/edit">
              <Button
                className={styles.help_button}
                onClick={() => props.setEdit(true)}
              >
                Edit
                <FontAwesomeIcon icon={faCog} className={styles.web_icon} />
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container item justify="flex-end" md={12}>
          <SwitchButton />
        </Grid>
      </Grid>
    </Grid>
  );
}

class MainPage extends Component {
  state = {
    pageUrl: "",
    pageId: ""
  };

  getAllUserSites = async () => {
    const { isLogin, token, userId, getUserSites } = this.props;
    if (isLogin) {
      this.props.openLoading();
      await getUserSites(userId, token);
      this.props.closeLoading();
    }
  };

  componentDidMount() {
    this.getAllUserSites();
  }

  handleSelectPage = ({ id, link }) => {
    this.setState({
      pageUrl: link,
      pageId: id
    });
  };

  handleConfirm = () => {
    const {
      confirmPage,
      accessToken,
      color,
      fontBody,
      fontTitle,
      name,
      navItems,
      profile,
      pages
    } = this.props;
    const { pageId, pageUrl } = this.state;
    confirmPage({
      pageId,
      pageUrl,
      accessToken,
      color,
      fontBody,
      fontTitle,
      name,
      navItems,
      profile,
      pages
    });
  };

  render() {
    const {
      setEdit,
      closeCreateNewSite,
      openCreateNewSite,
      open,
      pages,
      data,
      loading
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
                      {pages &&
                        pages.map(page => (
                          <ListItem
                            button
                            onClick={() =>
                              this.handleSelectPage({
                                id: page.id,
                                link: page.link
                              })
                            }
                            key={page.id}
                          >
                            <ListItemAvatar>
                              <Avatar
                              >
                                <img src={page.picture.data.url} alt="" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={page.name}
                              secondary={page.category}
                            />
                          </ListItem>
                        ))}

                      <ListItem
                        autoFocus
                        button
                      >
                        <TextField
                          fullWidth
                          label="Facebook Page Url"
                          value={pageUrl ? pageUrl : ""}
                        />
                      </ListItem>
                      <ListItem
                        autoFocus
                        button
                      >
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
              {loading && (
                <Grid container justify="center">
                  <CircularProgress color="primary" style={{ marginTop: 50, color: 'lightgreen' }} />
                </Grid>
              )}
              {!loading && !test ? (
                <Grid container justify="center">
                  <p style={{ fontStyle: "italic", textAlign: "center", color: "#121212", marginTop: 50 }}>No site to show.</p>
                </Grid>
              ) :
                <List>
                  {!loading && test && test.map(item => (
                    <ListItem key={item.id}>
                      <WebsiteItem setEdit={setEdit} title={item.title} category={item.category} logo={item.logo} />
                    </ListItem>
                  ))}
                </List>
              }
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
  sites: state.user.sites,
  accessToken: state.user.accessToken,
  profile: state.user.profile,
  name: state.theme.name,
  color: state.theme.color,
  fontBody: state.theme.fontBody,
  fontTitle: state.theme.fontTitle,
  navItems: state.theme.navItems,
  data: state.site.data,
  loading: state.theme.loading,
  userId: state.user.id,
  token: state.user.accessToken,
});

const mapDispatchToProps = dispatch => ({
  setEdit: isEdit => dispatch(setEdit(isEdit)),
  closeCreateNewSite: () => dispatch(closeCreateNewSite()),
  openCreateNewSite: () => dispatch(openCreateNewSite()),
  confirmPage: data => dispatch(confirmPage(data)),
  openLoading: () => dispatch(openLoading()),
  closeLoading: () => dispatch(closeLoading()),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
