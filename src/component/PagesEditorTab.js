import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  Button,
  Table,
  TableCell,
  TableRow,
  Avatar,
  Divider,
  TableHead,
  TableBody,
  TableContainer,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/DragHandle";
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
  changeNavItemName,
  changeNavItems,
  closeDialog,
  openDialog,
  savePosts,
  setActiveNavItems,
  setActivePost,
  updateNavItemValue
} from "../actions";
import ReactPaginate from "react-paginate";

const useStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: "600",
    color: "#555d66",
    fontSize: 14
  },
  title2: {
    fontSize: "12px",
    marginTop: "0.25rem",
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#555d66"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b4c0cf",
    padding: "1rem"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important"
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#0087be !important",
    color: "#434d58 !important"
  },
  pickerButton: {
    margin: 0,
    backgroundColor: "white",
    marginBottom: "0.2rem"
  },
  customButton: {
    border: "1px solid #0071a1",
    borderRadius: 5,
    color: "#0071a1",
    fontSize: 11
  },
  logoButton: {
    marginTop: 5,
    border: "1px solid #555d66",
    borderRadius: 5,
    color: "#555d66",
    borderStyle: "dashed",
    fontSize: 13,
    height: 40,
    width: "100%",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  fontPickerRoot: {
    width: "100% !important"
  },
  inputTitle: {
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: 13,
    color: "#555d66"
  }
});

const gridContainer = {};

const viewButton = {
  color: "black"
};

const gridItem = {
  padding: "0.2rem 0.5rem",
  zIndex: "99999999",
  backgroundColor: "white",
  border: "1px solid #dddddd"
};

const DragHandle = sortableHandle(() => (
  <MenuIcon style={{ color: "#555d66", cursor: "move" }} />
));

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
    let searchResult = this.props.paths.filter(function (user) {
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
      updateNavItemValue,
      classes,
      changeNavItemName
    } = this.props;

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
                  InputLabelProps={{
                    classes: {
                      focused: classes.focused
                    }
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      input: classes.inputTitle
                    }
                  }}
                  size="small"
                  style={{ backgroundColor: "white" }}
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
                      <VisibilityOutlinedIcon style={{ color: "#555d66" }} />
                    ) : (
                        <VisibilityOffOutlinedIcon style={{ color: "#555d66" }} />
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

    return (
      <div style={{ padding: 10 }}>
        <Grid container justify={"center"} direction={"column"}>
          <Grid
            item
            style={{
              color: "#555d66",
              textAlign: "left",
              fontStyle: "italic",
              fontFamily: "Segoe UI, sans-serif"
            }}
          >
            Select which post from Facebook you want to see on your site.
          </Grid>
          <Grid container justify={"center"} style={{ marginTop: "1rem" }}>
            <button
              className={classes.logoButton}
              color={"default"}
              onClick={openDialog}
            >
              Select
            </button>
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

        <Divider
          style={{ height: 10, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Pages</Typography>
        <Divider
          style={{
            height: "1.2rem",
            width: "100%",
            backgroundColor: "#ffffff00"
          }}
        />

        <Grid
          item
          style={{
            color: "#555d66",
            textAlign: "left",
            fontStyle: "italic",
            fontFamily: "Segoe UI, sans-serif",
            marginBottom: "0.8rem"
          }}
        >
          Reorder or hide pages of your site.
        </Grid>
        <SortableList
          items={site.navItems}
          onSortEnd={this.onChangeItem}
          useDragHandle
          site={site}
          setActiveNavItems={setActiveNavItems}
          updateNavItemValue={updateNavItemValue}
          changeNavItemName={changeNavItemName}
        />
      </div>
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
)(withStyles(useStyles)(PagesEditorTab));
