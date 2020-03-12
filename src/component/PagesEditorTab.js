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
  DialogContent
} from "@material-ui/core";
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
  savePosts
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
  zIndex: "99999999",
  height: "3.5rem"
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
      <Grid container item alignItems="center" xs={5}>
        <DragHandle />
        {value}
      </Grid>
      <Grid container item justify="flex-end" xs={7}>
        {item.name === "Home" ? (
          <></>
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

function handleActivePost(posts, setActivePost, item) {
  const index = posts.find(e => e._id === item._id);
  if (index.isActive) {
    index.isActive = false;
  } else {
    index.isActive = true;
  }
  setActivePost(posts);
}

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const columns = ["Avata", "Title", "Message", "Create At", "Show/Hide"];

function PostsList({
  filteredData,
  posts,
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
                      onChange={() =>
                        handleActivePost(posts, setActivePost, row)
                      }
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

  setListData = listData => {
    this.setState({
      filteredData: listData
    });
  };

  setPageCount = listData => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage)
    });
  };

  setPosts = () => {
    this.setListData(
      this.props.posts.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(this.props.posts);
  };

  componentDidMount() {
    this.setPosts();
  }

  setStatePost = posts => {
    this.setState({ filteredData: posts });
  };

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.posts.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
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
      setActivePost
    } = this.props;

    return (
      <>
        <ExpansionPanel style={expanStyle}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">Navigation</Typography>
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
            <Typography variant="body1">News</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container style={gridContainer}>
              <Grid
                container
                style={{
                  ...gridItem,
                  height: "inherit",
                  width: "-webkit-fill-available"
                }}
                alignItems="center"
              >
                <Grid item xs={6} sm={12} md={6}>
                  <Typography variant="body1" style={{ paddingRight: "2rem" }}>
                    News Setting:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
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
                      setActivePost={setActivePost}
                      pageCount={this.state.pageCount}
                      handlePageClick={this.handlePageClick}
                    />
                  </Grid>
                  <DialogActions>
                    <Button
                      autoFocus
                      variant="contained"
                      onClick={closeDialog}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => this.handleSave(posts)}
                      color="primary"
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
  setActivePost: posts => dispatch(setActivePost(posts)),
  updateNavItemValue: value => dispatch(updateNavItemValue(value)),
  savePosts: posts => dispatch(savePosts(posts))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesEditorTab);
