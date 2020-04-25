import { Divider, Grid, List, ListItem, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllPost,
  getAllThemes,
  getSiteById,
  setCurrentEditId,
  setEditOn,
  setSiteEdit,
  getUserSites,
  setPostView,
} from "../../actions";
import WebFontLoader from "webfontloader";
require("dotenv").config();

const imgStyle = {
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  height: "2rem",
};
const useStyle = {
  listSites: {
    borderRight: "0.5px solid ",
    padding: 0,
    width: " -webkit-fill-available",
  },
  numberSite: {
    border: "1px solid",
    textAlign: "center",
    borderRadius: "2px",
    padding: "0.4rem 0",
  },
  item: {
    minHeight: "4rem",
    "&:hover": {
      background: "#c3c4c7",
      transitionDuration: ".5s",
    },
  },
  published: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "rgb(142,142,147)",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center",
    textSpacing: "0.2px",
  },
  unpublished: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "rgb(209,209,214)",
    marginTop: "0.2rem",
    color: "#121212",
    textAlign: "center",
    textSpacing: "0.2px",
  },
};
class Design extends Component {
  state = {
    selectedIndex: -1,
  };

  getAllUserSites = async () => {
    const { accessToken, profile, getUserSites } = this.props;
    await getUserSites(profile.id, accessToken);
  };

  renderListSites = () => {
    const { classes, sites } = this.props;
    return (
      <List className={classes.listSites}>
        <ListItem>
          <Grid
            container
            alignItems="center"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            <Grid
              item
              xs={2}
              className={classes.numberSite}
              style={{ color: "#fff", fontSize: "14px", fontWeight: "bold" }}
            >
              {sites.length}
            </Grid>
            <Grid
              container
              item
              xs={10}
              style={{
                padding: "0 1rem",
                color: "#fff",
                fontSize: "14px",
                // textTransform: "uppercase",
                fontWeight: "bold",
              }}
              className={"mainFont"}
            >
              {/* <Grid item xs={12}> */}
              My Generated Sites
              {/* </Grid> */}
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        {sites ? (
          sites.map((item, index) => this.renderSiteItem(item, index))
        ) : (
          <></>
        )}
        <Divider />
      </List>
    );
  };

  getAllThemes = async () => {
    const { getAllThemes } = this.props;
    await getAllThemes();
  };

  getSite = async (id) => {
    const { getSiteById, setSiteEdit, getAllPost } = this.props;
    const data = await getSiteById(id);
    if (data) {
      const titleStyle = {
        fontFamily: data.fontTitle,
        color: data.color,
      };
      const bodyStyle = {
        fontFamily: data.fontBody,
      };
      await setSiteEdit(data, titleStyle, bodyStyle);
      WebFontLoader.load({
        google: {
          families: [data.fontTitle, data.fontBody],
        },
      });
      data.posts && getAllPost(data.posts);
    }
  };

  handleClickItem = (index, id) => {
    const { setCurrentEditId, setPostView } = this.props;
    setCurrentEditId(id);
    // this.getAllThemes();
    this.getSite(id);
    this.setState({ selectedIndex: index });
    setPostView(null);
  };

  renderSiteItem = (item, index) => {
    const { classes } = this.props;
    return (
      <ListItem
        key={index}
        button
        className={classes.item}
        selected={this.state.selectedIndex === index}
        onClick={() => this.handleClickItem(index, item.id)}
        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
      >
        <Grid container alignItems="center">
          <Grid container item xs={2} sm={3} justify="center">
            <Grid
              item
              xs={6}
              sm={12}
              style={{ backgroundImage: `url('${item.logo}')`, ...imgStyle }}
            />
          </Grid>
          <Grid container item xs={8}>
            <Grid
              item
              xs={12}
              className={"mainFont"}
              style={{ color: "#fff", fontSize: "14px" }}
            >
              {item.title}
            </Grid>
            <Grid
              item
              xs={12}
              className={"mainFont"}
              style={{
                fontSize: "11px",
                overflow: "hidden",
                color: "#fff",
                textOverflow: "ellipsis",
              }}
            >
              {process.env.REACT_APP_HOST
                ? `${process.env.REACT_APP_HOST}${item.sitePath}`
                : `http://localhost:3000/${item.sitePath}`}
            </Grid>
            <Grid
              item
              xs={12}
              className={"mainFont"}
              style={{ fontSize: "12px", overflow: "hidden" }}
            >
              <Grid
                item
                lg={8}
                sm={12}
                xs={8}
                className={
                  item.isPublish ? classes.published : classes.unpublished
                }
              >
                {item.isPublish ? "Published " : "Unpublished "}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    );
  };
  render() {
    return <Grid container>{this.renderListSites()}</Grid>;
  }
}

const mapStateToProps = (state) => ({
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentEditId: (id) => dispatch(setCurrentEditId(id)),
  getAllThemes: () => dispatch(getAllThemes()),
  getSiteById: (id) => dispatch(getSiteById(id)),
  setSiteEdit: (site, titleStyle, bodyStyle) =>
    dispatch(setSiteEdit(site, titleStyle, bodyStyle)),
  getAllPost: (posts) => dispatch(getAllPost(posts)),
  setEditOn: () => dispatch(setEditOn()),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken)),
  setPostView: (post) => dispatch(setPostView(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(Design));
