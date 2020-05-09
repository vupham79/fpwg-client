import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { SearchOutlined as SearchIcon } from "@material-ui/icons";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import {
  deleteCategory,
  getAllCategoriesAdmin,
  insertCategory,
  updateCategory,
} from "../actions";
import "./adminStyleSheet.css";
import toastr from "./Toastr";

const useStyles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  title2: {
    fontSize: "13px",
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: 600,
    color: "#555d66",
  },
  gridItems: {
    padding: "0.7rem 0",
  },
});

class TableCategory extends Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5, // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
    showDialog: false,
    showEditDialog: false,
    name: "",
    picture: "",
    preview: "",
    edit: {
      name: "",
      picture: "",
      preview: "",
    },
    currentPage: 0,
    searchData: null,
  };

  setOpenDialogue = (item) => {
    this.setState({
      showDialog: true,
      name: "",
      picture: "",
      preview: "",
    });
  };

  setCloseDialogue = () => {
    this.setState({
      showDialog: false,
    });
  };

  setOpenEditDialogue = (item) => {
    this.setState({
      showEditDialog: true,
      edit: {
        id: item._id,
        name: item.name,
        picture: item.picture,
        preview: item.picture,
      },
    });
  };

  setCloseEditDialogue = () => {
    this.setState({
      showEditDialog: false,
    });
  };

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleUpdate = async () => {
    const { updateCategory } = this.props;
    const { edit } = this.state;
    await updateCategory(edit.id, edit.name, edit.picture);
    this.getCategories();
    this.setCloseEditDialogue();
  };

  handleInsert = async () => {
    const { insertCategory } = this.props;
    if (!this.state.name || !this.state.picture) {
      toastr.error("Please enter valid info", "Invalid info")
    }
    else {
      await insertCategory(this.state.name, this.state.picture);
      this.getCategories();
      this.setCloseDialogue();
    }
  };

  handleDelete = async () => {
    const { deleteCategory } = this.props;
    await deleteCategory(this.state.edit.id);
    this.getCategories();
    this.setCloseEditDialogue();
  };

  setListData = (listData) => {
    this.setState({
      filteredData: listData,
    });
  };

  setPageCount = (listData) => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage),
    });
  };

  getCategories = async () => {
    const { getAllCategoriesAdmin } = this.props;
    await getAllCategoriesAdmin();
    this.setListData(
      this.props.categories.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(this.props.categories);
  };

  componentDidMount() {
    this.getCategories();
  }

  handlePageClick = (data) => {
    const { searchData } = this.state;
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);
    if (searchData) {
      this.setState({ offset: offset, currentPage: selected }, () => {
        this.setListData(
          searchData.slice(
            this.state.offset,
            this.state.itemPerPage + this.state.offset
          )
        );
      });
    } else {
      this.setState({ offset: offset, currentPage: selected }, () => {
        this.setListData(
          this.props.categories.slice(
            this.state.offset,
            this.state.itemPerPage + this.state.offset
          )
        );
      });
    }
  };

  handleBrowsePictureEdit = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      this.setState({
        edit: {
          ...this.state.edit,
          picture: file,
          preview: URL.createObjectURL(file),
        },
      });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleBrowsePicture = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    //validating the file
    //check if the file is exists
    if (!file) {
      toastr.error("No image is selected!", "Error");
      return;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      this.setState({
        picture: file,
        preview: URL.createObjectURL(file),
      });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleSearch = (event) => {
    let searchResult = this.props.categories.filter(function (category) {
      return category.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setState({ currentPage: 0, searchData: searchResult });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  handleChangeNameEdit = (e) => {
    this.setState({
      edit: {
        ...this.state.edit,
        name: e.target.value,
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container alignItems="center" style={{ padding: "0.5rem 0" }}>
          <Grid container item xs={10} md={11} alignItems="center">
            <Grid
              item
              xs={4}
              style={{
                color: "rgb(0, 96, 136)",
                fontSize: "24px",
                padding: "0 0.3rem",
              }}
            >
              Theme Category
            </Grid>
            <Grid item xs={8} container justify="flex-end">
              <TextField
                label="Search"
                variant="outlined"
                margin="dense"
                onChange={this.handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ color: "rgb(0, 96, 136)" }}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" item xs={2} md={1}>
            <Button
              variant="outlined"
              style={{ color: "rgb(0, 96, 136)" }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={() => this.setOpenDialogue()}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          style={{
            padding: "0.5rem ",
            color: "white",
            backgroundColor: "rgb(0, 96, 136)",
          }}
        >
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Name</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Picture</p>
          </Grid>
          <Grid container justify="flex-end" item xs={7}>
            <p style={{ fontWeight: "bold" }}></p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
            this.state.filteredData.map((row) => (
              <div key={row._id}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  style={{ padding: "0.2rem 0.5rem" }}
                >
                  <Grid item xs={2}>
                    {row.name}
                    {/* <div style={{ height: 20 }} /> */}
                  </Grid>
                  <Grid item xs={3}>
                    <img
                      style={{
                        height: "4rem",
                      }}
                      alt=""
                      src={row.picture}
                    />
                  </Grid>
                  <Grid container justify="flex-end" item xs={7}>
                    <Button
                      style={{ color: "rgb(0, 96, 136)" }}
                      onClick={() => this.setOpenEditDialogue(row)}
                    >
                      Edit
                  </Button>
                  </Grid>
                </Grid>
                <Divider />
              </div>
            ))
          )}
        {this.state.pageCount > 1 && (
          <div className="commentBox">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              forcePage={this.state.currentPage}
            />
          </div>
        )}
        <Dialog
          open={this.state.showDialog}
          onClose={() => this.setCloseDialogue()}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ color: "rgb(0, 96, 136)" }}>Insert</DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              <Grid container item xs={7}>
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  className={classes.gridItems}
                >
                  <Grid item xs={4} className={classes.title2}>
                    Name
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      variant="outlined"
                      margin="dense"
                      label="Name"
                      color="primary"
                      value={this.state.name}
                      onChange={(e) => this.handleChangeName(e)}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  className={classes.gridItems}
                >
                  <Grid item xs={4} className={classes.title2}>
                    Picture
                  </Grid>
                  <Grid container item xs={8} alignItems="center">
                    <Input
                      type="file"
                      id="selectedFile"
                      onChange={(e) => this.handleBrowsePicture(e)}
                      style={{ display: "none" }}
                    />
                    {this.state.preview && (
                      <Grid
                        item
                        xs={8}
                        style={{
                          backgroundImage: `URL("${this.state.preview}")`,
                          height: "4rem",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      ></Grid>
                    )}
                    {/* <img
                      style={{
                        height: "4rem",
                        display: this.state.preview ? "block" : "none",
                      }}
                      alt=""
                      src={this.state.preview}
                    /> */}
                    <Grid
                      container
                      item
                      xs={4}
                      justify={this.state.preview ? "flex-end" : "flex-start"}
                    >
                      <button
                        className={classes.logoButton}
                        color={"default"}
                        onClick={() =>
                          document.getElementById("selectedFile").click()
                        }
                      >
                        Browse
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions style={{ padding: "0.5rem" }}>
            <Button
              autoFocus
              variant="contained"
              color="primary"
              onClick={() => this.handleInsert()}
            >
              Finish
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.showEditDialog}
          onClose={() => this.setCloseEditDialogue()}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle style={{ color: "rgb(0, 96, 136)" }}>Edit</DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              <Grid container item xs={7}>
                <Grid
                  container
                  item
                  xs={12}
                  alignItems="center"
                  className={classes.gridItems}
                >
                  <Grid item xs={4} className={classes.title2}>
                    Name
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="Name"
                      color="primary"
                      variant="outlined"
                      margin="dense"
                      value={this.state.edit.name}
                      onChange={(e) => this.handleChangeNameEdit(e)}
                      inputProps={{
                        maxLength: 50,
                      }}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    alignItems="center"
                    className={classes.gridItems}
                  >
                    <Grid item xs={4} className={classes.title2}>
                      Picture
                    </Grid>
                    <Grid container item xs={8} alignItems="center">
                      <Input
                        type="file"
                        id="selectedEditFile"
                        onChange={(e) => this.handleBrowsePictureEdit(e)}
                        style={{ display: "none" }}
                      />
                      {this.state.edit.preview && (
                        <Grid
                          item
                          xs={8}
                          style={{
                            backgroundImage: `URL("${this.state.edit.preview}")`,
                            height: "4rem",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></Grid>
                      )}
                      {/* <img
                      style={{
                        height: "4rem",
                        display: this.state.edit.preview ? "block" : "none",
                      }}
                      alt=""
                      src={this.state.edit.preview}
                    /> */}
                      <Grid
                        container
                        item
                        xs={4}
                        justify={
                          this.state.edit.preview ? "flex-end" : "flex-start"
                        }
                      >
                        <button
                          className={classes.logoButton}
                          color={"default"}
                          onClick={() =>
                            document.getElementById("selectedEditFile").click()
                          }
                        >
                          Browse
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              color="secondary"
              onClick={() => this.handleDelete(this.state.edit.id)}
            >
              Delete
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="primary"
              onClick={() => this.handleUpdate()}
            >
              Finish
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
  categories: state.admin.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCategoriesAdmin: () => dispatch(getAllCategoriesAdmin()),
  updateCategory: (id, name, picture) =>
    dispatch(updateCategory(id, name, picture)),
  insertCategory: (name, picture) => dispatch(insertCategory(name, picture)),
  deleteCategory: (id) => dispatch(deleteCategory(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableCategory));
