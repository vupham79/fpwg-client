import {
  Button,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import { connect } from "react-redux";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import {
  changeNavItems,
  closeDialog,
  openDialog,
  setActiveNavItems,
  setActivePost,
  updateNavItemValue
} from "../actions";

const gridContainer = {
  borderStyle: "solid",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#2a2e2a"
};

const viewButton = {
  color: "black"
};

const gridItem = {
  borderStyle: "solid",
  borderColor: "#2a2e2a",
  borderWidth: 1.5,
  padding: "0.2rem 0.5rem",
  margin: "0.7rem",
  zIndex: "99999999"
};

const DragHandle = sortableHandle(() => <MenuIcon />);

function handleChangeActive(item, site, setActiveNavItems, updateNavItemValue) {
  const index = site.navItems.find(e => e._id === item._id);
  if (index.isActive) {
    index.isActive = false;
    updateNavItemValue(0);
  } else {
    index.isActive = true;
  }
  setActiveNavItems(site);
}

const SortableItem = sortableElement(
  ({ value, site, item, setActiveNavItems, updateNavItemValue }) => (
    <Grid container style={gridItem}>
      <Grid container item alignItems="center" sm={5}>
        <DragHandle />
        {value}
      </Grid>
      <Grid container item justify="flex-end" sm={7}>
        {item.name === "Home" ? (
          <IconButton style={viewButton} disabled>
            <VisibilityOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            style={viewButton}
            onClick={() =>
              handleChangeActive(
                item,
                site,
                setActiveNavItems,
                updateNavItemValue
              )
            }
          >
            {item.isActive && item.name !== "Home" ? (
              <VisibilityOutlinedIcon />
            ) : (
              <VisibilityOffOutlinedIcon />
            )}
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
);

const SortableList = sortableContainer(
  ({ items, site, setActiveNavItems, updateNavItemValue }) => {
    if (items) {
      return (
        <Grid container style={gridContainer} alignItems="center">
          {items.map((value, index) => (
            <SortableItem
              key={index}
              index={index}
              value={value.name}
              item={value}
              site={site}
              setActiveNavItems={setActiveNavItems}
              updateNavItemValue={updateNavItemValue}
            />
          ))}
        </Grid>
      );
    }
    return <></>;
  }
);

const expanStyle = {
  marginTop: "1rem"
};

const imageStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "60%"
};

function handleActivePost(posts, setActivePost, item) {
  const index = posts.find(e => e._id === item._id);
  if (index.isActive) {
    index.isActive = false;
  } else {
    index.isActive = true;
  }
  setActivePost(posts);
}

function PostsList({ posts, setActivePost, item }) {
  return (
    <>
      {posts ? (
        posts.map((item, index) =>
          item.attachments.media_type === "photo" ? (
            <Grid container style={gridItem} key={index}>
              <Grid container item sm={2} xs={4}>
                <img src={item.attachments.images} style={imageStyle} alt="" />
              </Grid>
              <Grid
                container
                item
                sm={8}
                xs={6}
                direction="column"
                justify="flex-start"
              >
                <Grid item>
                  <Typography color="primary" variant="h6">
                    {item.message}
                  </Typography>
                </Grid>
                <Grid item>{item.createdAt}</Grid>
              </Grid>
              <Grid container justify="flex-end" item sm={2} xs={2}>
                <IconButton
                  style={viewButton}
                  onClick={() => handleActivePost(posts, setActivePost, item)}
                >
                  {item.isActive ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          ) : null
        )
      ) : (
        <Grid container justify="center" style={{ padding: "1rem" }}>
          <Typography> You don have any post</Typography>
        </Grid>
      )}
      {posts.length === 0 && (
        <Grid container justify="center" style={{ padding: "1rem" }}>
          <Typography> You don have any post</Typography>
        </Grid>
      )}
    </>
  );
}

class PagesEditorTab extends React.Component {
  onChangeItem = ({ oldIndex, newIndex }) => {
    const { site, changeNavItems } = this.props;
    let temp = site.navItems[oldIndex];
    site.navItems[oldIndex] = site.navItems[newIndex];
    site.navItems[newIndex] = temp;
    site.navItems.map((item, index) => (item.order = index + 1));
    changeNavItems(site);
  };

  render() {
    const {
      site,
      setActiveNavItems,
      openDialog,
      closeDialog,
      open,
      posts,
      setActivePost,
      updateNavItemValue
    } = this.props;
    return (
      <>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" color="primary">
              Navigation
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SortableList
              items={site.navItems}
              onSortEnd={this.onChangeItem}
              useDragHandle
              site={site}
              setActiveNavItems={setActiveNavItems}
              updateNavItemValue={updateNavItemValue}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1" color="primary">
              News
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container style={gridContainer}>
              <Grid container style={gridItem} alignItems="center">
                <Grid item>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    style={{ paddingRight: "2rem" }}
                  >
                    News Setting:
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openDialog}
                  >
                    Setting
                  </Button>
                </Grid>

                <Dialog
                  onClose={closeDialog}
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  maxWidth="sm"
                  fullWidth
                >
                  <Grid container alignItems="center">
                    <PostsList posts={posts} setActivePost={setActivePost} />
                  </Grid>
                </Dialog>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
}
const mapStateToProps = state => ({
  site: state.site.siteEdit,
  open: state.dialog.open,
  posts: state.post.posts
});

const mapDispatchToProps = dispatch => ({
  changeNavItems: value => dispatch(changeNavItems(value)),
  setActiveNavItems: site => dispatch(setActiveNavItems(site)),
  openDialog: () => dispatch(openDialog()),
  closeDialog: () => dispatch(closeDialog()),
  setActivePost: posts => dispatch(setActivePost(posts)),
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesEditorTab);
