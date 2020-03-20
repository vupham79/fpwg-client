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
  getUserSites
} from "../../actions";

const imgStyle = {
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  height: "2rem"
};
const useStyle = {
  listSites: {
    borderRight: "0.5px solid ",
    padding: 0,
    width: " -webkit-fill-available"
  },
  numberSite: {
    border: "1px solid",
    textAlign: "center",
    borderRadius: "2px",
    padding: "0.4rem 0"
  },
  item: {
    minHeight: "4rem",
    "&:hover": {
      background: "#c3c4c7",
      transitionDuration: ".5s"
    }
  },
  published: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#5ea95a",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center"
  },
  unpublished: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#cc2127",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center"
  }
};
class Design extends Component {
  state = {
    selectedIndex: -1
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
          <Grid container alignItems="center">
            <Grid item xs={2} className={classes.numberSite}>
              {sites.length}
            </Grid>
            <Grid
              container
              item
              xs={10}
              style={{ padding: "0 1rem" }}
              className={"mainFont"}
            >
              <Grid item xs={12}>
                My Pages Site
              </Grid>
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

  getSite = async id => {
    const { getSiteById, setSiteEdit, getAllPost } = this.props;
    const data = await getSiteById(id);
    if (data) {
      const titleStyle = {
        fontFamily: data.fontTitle,
        color: data.color
      };
      const bodyStyle = {
        fontFamily: data.fontBody
      };
      await setSiteEdit(data, titleStyle, bodyStyle);
      data.posts && getAllPost(data.posts);
    }
  };

  handleClickItem = (index, id) => {
    const { setCurrentEditId } = this.props;
    setCurrentEditId(id);
    // this.getAllThemes();
    this.getSite(id);
    this.setState({ selectedIndex: index });
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
            <Grid item xs={12} className={"mainFont"}>
              {item.title}
            </Grid>
            <Grid
              item
              xs={12}
              className={"mainFont"}
              style={{ fontSize: "12px", overflow: "hidden" }}
            >
              {"http://localhost:3000/" + item.sitePath}
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

const mapStateToProps = state => ({
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  setCurrentEditId: id => dispatch(setCurrentEditId(id)),
  getAllThemes: () => dispatch(getAllThemes()),
  getSiteById: id => dispatch(getSiteById(id)),
  setSiteEdit: (site, titleStyle, bodyStyle) =>
    dispatch(setSiteEdit(site, titleStyle, bodyStyle)),
  getAllPost: posts => dispatch(getAllPost(posts)),
  setEditOn: () => dispatch(setEditOn()),
  getUserSites: (id, accessToken) => dispatch(getUserSites(id, accessToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(Design));
