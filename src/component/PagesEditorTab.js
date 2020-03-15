import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
  DialogActions,
  TextField
} from "@material-ui/core";
import { withStyles as withStylesStyle } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import moment from "moment";
import React from "react";
import ReactPaginate from "react-paginate";
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
  updateNavItemValue,
  savePosts,
  changeNavItemName
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

const useStyles = theme => ({
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2e2a",
    padding: "0.5rem"
  }
});

const gridItem = {
  borderStyle: "solid",
  borderColor: "#2a2e2a",
  borderWidth: 1.5,
  padding: "0.2rem 0.5rem",
  margin: "0.7rem",
  zIndex: "99999999"
};

const DragHandle = sortableHandle(() => <MenuIcon />);

function handleChangeActive(id, site, setActiveNavItems, updateNavItemValue) {
  const index = site && site.navItems && site.navItems.find(e => e._id === id);
  if (index.isActive) {
    index.isActive = false;
    updateNavItemValue(0);
  } else {
    index.isActive = true;
  }
  setActiveNavItems(site);
}

function handleChangeNavName(id, site, newName, changeNavItemName) {
  const index = site && site.navItems && site.navItems.find(e => e._id === id);
  index.name = newName;
  changeNavItemName(site);
}

const SortableItem = sortableElement(
  ({
    value,
    site,
    item,
    setActiveNavItems,
    updateNavItemValue,
    changeNavItemName
  }) => (
    <Grid container style={gridItem}>
      <Grid
        container
        item
        alignItems="center"
        xs={10}
        sm={12}
        md={10}
        style={{ padding: "0.2rem 0" }}
      >
        <Grid container justify="center" item xs={2} md={2} sm={12}>
          <DragHandle />
        </Grid>
        <Grid item xs={10} md={10} sm={12}>
          <TextField
            inputProps={{
              style: {
                padding: "0.5rem"
              }
            }}
            fullWidth
            variant={"outlined"}
            value={value}
            onChange={e =>
              handleChangeNavName(
                item._id,
                site,
                e.target.value,
                changeNavItemName
              )
            }
          />
        </Grid>
      </Grid>
      <Grid container item justify="center" xs={2} sm={12} md={2}>
        {item.original === "home" ? (
          <></>
        ) : (
          <IconButton
            style={viewButton}
            onClick={() =>
              handleChangeActive(
                item._id,
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
  ({
    items,
    site,
    setActiveNavItems,
    updateNavItemValue,
    changeNavItemName
  }) => {
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
              changeNavItemName={changeNavItemName}
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

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const columns = ["Avatar", "Title", "Message", "Created At", "Show"];

function PostsList({
  filteredData,
  setActivePost,
  pageCount,
  handlePageClick
}) {
  return (
    <>
      <TableContainer style={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell align="center" key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {(row.attachments.media_type === "photo" && (
                      <Avatar src={row.attachments.images[0]} />
                    )) ||
                      (row.attachments.media_type === "video" && (
                        <Avatar src={row.attachments.video} />
                      )) ||
                      (row.attachments.media_type === "album" && (
                        <Avatar src={row.attachments.images[0]} />
                      ))}
                  </TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="left">
                    <Grid
                      style={{
                        maxWidth: "20rem",
                        height: "2.5rem",
                        overflow: "hidden"
                      }}
                    >
                      {row.message}
                    </Grid>
                  </TableCell>
                  <TableCell align="center">
                    {moment(row.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <GreenCheckbox
                      checked={row.isActive}
                      onChange={() => setActivePost(row, !row.isActive)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justify="center">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Grid>
    </>
  );
}

class PagesEditorTab extends React.Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5
  };

  setPageCount = listData => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage)
    });
  };

  setPosts = () => {
    const { posts } = this.props;
    const slicePosts = posts.slice(
      this.state.offset,
      this.state.itemPerPage + this.state.offset
    );
    this.setState({
      filteredData: slicePosts
    });
    this.setPageCount(posts);
  };

  componentDidMount() {
    const { posts } = this.props;
    if (posts) {
      this.setPosts();
    }
  }

  setStatePost = posts => {
    this.setState({ filteredData: [...posts] });
  };

  handlePageClick = data => {
    const { posts } = this.props;
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);
    this.setState({ offset: offset }, () => {
      const slicePosts = posts.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      );
      this.setState({
        filteredData: slicePosts
      });
    });
  };

  setListData = listData => {
    this.setState({
      filteredData: listData
    });
  };

  handleSearch = keyword => {
    let searchResult = this.props.paths.filter(function(user) {
      return user.pathName.toLowerCase().includes(keyword.toLowerCase());
    });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  onChangeItem = ({ oldIndex, newIndex }) => {
    const { site, changeNavItems } = this.props;
    let temp = site.navItems[oldIndex];
    site.navItems[oldIndex] = site.navItems[newIndex];
    site.navItems[newIndex] = temp;
    site.navItems.map((item, index) => (item.order = index + 1));
    changeNavItems(site);
  };

  setActivePost = (post, status) => {
    const { posts, setActivePost } = this.props;
    setActivePost(post, status);
    this.setState({ filteredData: [...posts] });
  };

  handleSave = async posts => {
    await this.props.savePosts(posts);
    this.props.closeDialog();
  };

  render() {
    const {
      site,
      setActiveNavItems,
      openDialog,
      open,
      closeDialog,
      updateNavItemValue,
      posts,
      classes,
      changeNavItemName
    } = this.props;

    return (
      <>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">Navigation</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <SortableList
              items={site.navItems}
              onSortEnd={this.onChangeItem}
              useDragHandle
              site={site}
              setActiveNavItems={setActiveNavItems}
              updateNavItemValue={updateNavItemValue}
              changeNavItemName={changeNavItemName}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="button">News</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container className={classes.sideBarBox}>
              <Grid container alignItems="center">
                <Grid item xs={6} sm={12} md={6}>
                  <Typography variant="body1" style={{ paddingRight: "2rem" }}>
                    Posts Setting:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={12} md={6}>
                  <Button
                    variant="contained"
                    onClick={openDialog}
                    style={{ width: "-webkit-fill-available" }}
                  >
                    Setting
                  </Button>
                </Grid>

                <Dialog
                  disableBackdropClick
                  disableEscapeKeyDown
                  open={open}
                  maxWidth="md"
                  fullWidth
                >
                  <Grid container alignItems="center">
                    <PostsList
                      posts={posts}
                      filteredData={this.state.filteredData}
                      setActivePost={this.setActivePost}
                      pageCount={this.state.pageCount}
                      handlePageClick={this.handlePageClick}
                    />
                  </Grid>
                  <DialogActions>
                    <Button
                      autoFocus
                      variant="contained"
                      onClick={closeDialog}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => this.handleSave(posts)}
                      color={"primary"}
                    >
                      Save
                    </Button>
                  </DialogActions>
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
  setActivePost: (post, status) => dispatch(setActivePost(post, status)),
  updateNavItemValue: value => dispatch(updateNavItemValue(value)),
  savePosts: posts => dispatch(savePosts(posts)),
  changeNavItemName: site => dispatch(changeNavItemName(site))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStylesStyle(useStyles)(PagesEditorTab));
