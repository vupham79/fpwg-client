import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Typography
} from "@material-ui/core";
import Title from "./Title";
import { connect } from "react-redux";
import {
  getAllCategoriesAdmin,
  updateCategory,
  insertCategory
} from "../actions";
import ReactPaginate from "react-paginate";
import { SearchOutlined as SearchIcon, Add } from "@material-ui/icons";
import toastr from "./Toastr";
import "./adminStyleSheet.css";

const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  title2: {
    fontSize: "13px",
    marginTop: "0.25rem",
    fontFamily: "Segoe UI, sans-serif",
    fontWeight: 600,
    marginBottom: "1rem",
    color: "#555d66"
  }
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
      preview: ""
    }
  };

  setOpenDialogue = item => {
    this.setState({
      showDialog: true,
      name: "",
      picture: "",
      preview: ""
    });
  };

  setCloseDialogue = () => {
    this.setState({
      showDialog: false
    });
  };

  setOpenEditDialogue = item => {
    this.setState({
      showEditDialog: true,
      edit: {
        id: item._id,
        name: item.name,
        picture: item.picture,
        preview: item.picture
      }
    });
  };

  setCloseEditDialogue = () => {
    this.setState({
      showEditDialog: false
    });
  };

  handleChangeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleUpdate = async () => {
    const { updateCategory } = this.props;
    const { edit } = this.state;
    await updateCategory(edit.id, edit.name, edit.picture);
    await this.getCategories();
  };

  handleInsert = async () => {
    const { insertCategory } = this.props;
    await insertCategory(this.state.name, this.state.picture);
    await this.getCategories();
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

  getCategories = async () => {
    const { getAllCategoriesAdmin, categories } = this.props;
    await getAllCategoriesAdmin();
    this.setListData(
      categories.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(categories);
  };

  componentDidMount() {
    this.getCategories();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.themes.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  handleBrowsePictureEdit = async e => {
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
          preview: URL.createObjectURL(file)
        }
      });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleBrowsePicture = async e => {
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
        preview: URL.createObjectURL(file)
      });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleSearch = keyword => {
    let searchResult = this.props.categories.filter(function (category) {
      return category.name.toLowerCase().includes(keyword.toLowerCase());
    });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  handleChangeNameEdit = e => {
    this.setState({
      edit: {
        ...this.state.edit,
        name: e.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Title>
          Theme Category
          <IconButton onClick={this.setOpenDialogue}>
            <Add />
          </IconButton>
        </Title>
        <Paper component="form" className={classes.root}>
          <InputBase
            id="searchBox"
            className={classes.input}
            placeholder="Search by name..."
            onChange={() =>
              this.handleSearch(document.getElementById("searchBox").value)
            }
          />
          <IconButton
            className={classes.iconButton}
            color="primary"
            aria-label="search"
            onClick={() =>
              this.handleSearch(document.getElementById("searchBox").value)
            }
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Grid container direction="row">
          <Grid item xs={1}>
            <p style={{ fontWeight: "bold" }}>Name</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Picture</p>
          </Grid>
          <Grid item xs={1}>
            <p style={{ fontWeight: "bold" }}></p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
            this.state.filteredData.map((row) => (
              <div key={row._id}>
                <Grid container direction="row">
                  <Grid item xs={1}>
                    {row.name}
                    <div style={{ height: 20 }} />
                  </Grid>
                  <Grid item xs={2}>
                    <img
                      style={{
                        height: "4rem"
                      }}
                      alt=""
                      src={row.picture}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      color="primary"
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
            />
          </div>
        )}
        <Dialog
          open={this.state.showDialog}
          onClose={() => this.setCloseDialogue()}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Insert</DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              <Grid container item xs={7}>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      color="primary"
                      value={this.state.name}
                      onChange={e => this.handleChangeName(e)}
                      inputProps={{
                        maxLength: 50
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>Picture</Typography>
                    <Input
                      type="file"
                      id="selectedFile"
                      onChange={e => this.handleBrowsePicture(e)}
                      style={{ display: "none" }}
                    />
                    <img
                      style={{
                        height: "4rem",
                        display: this.state.preview ? "block" : "none"
                      }}
                      alt=""
                      src={this.state.preview}
                    />
                  </Grid>
                  <Grid container justify={"center"}>
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
          </DialogContent>

          <DialogActions>
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
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <Grid container direction="row">
              <Grid container item xs={7}>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      color="primary"
                      value={this.state.edit.name}
                      onChange={e => this.handleChangeNameEdit(e)}
                      inputProps={{
                        maxLength: 50
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>Picture</Typography>
                    <Input
                      type="file"
                      id="selectedEditFile"
                      onChange={e => this.handleBrowsePictureEdit(e)}
                      style={{ display: "none" }}
                    />
                    <img
                      style={{
                        height: "4rem"
                      }}
                      alt=""
                      src={this.state.edit.preview}
                    />
                  </Grid>
                  <Grid container justify={"center"}>
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
          </DialogContent>
          <DialogActions>
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
const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
  categories: state.admin.categories
});

const mapDispatchToProps = dispatch => ({
  getAllCategoriesAdmin: () => dispatch(getAllCategoriesAdmin()),
  updateCategory: (id, name, picture) =>
    dispatch(updateCategory(id, name, picture)),
  insertCategory: (name, picture) => dispatch(insertCategory(name, picture))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableCategory));
