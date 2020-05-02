import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { SearchOutlined as SearchIcon } from "@material-ui/icons";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import React, { Component } from "react";
import { ChromePicker } from "react-color";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import {
  deleteTheme,
  getAllCategoriesAdmin,
  getAllThemesAdmin,
  insertTheme,
  updateTheme,
} from "../actions";
import "./adminStyleSheet.css";
import FontPickerComponent from "./fontPicker";
import toastr from "./Toastr";

const useStyles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    padding: "0.7rem",
    fontSize: "13px",
    // display: "flex",
    // alignItems: "center",
    // width: 400
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

class TableTheme extends Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5, // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
    showDialog: false,
    showEditDialog: false,
    newItem: {
      mainColor: "#212121",
      name: "",
      fontBody: "",
      fontTitle: "",
      previewImage: "",
      preview: "",
      category: "",
      isOnePage: false,
    },
    edit: {
      id: "",
      mainColor: "#212121",
      name: "",
      fontBody: "",
      fontTitle: "",
      previewImage: "",
      preview: "",
      category: "",
      isOnePage: false,
    },
    currentPage: 0,
    searchData: null,
  };

  setOpenEditDialogue = (item) => {
    this.setState({
      showEditDialog: true,
      edit: {
        id: item._id,
        mainColor: item.mainColor,
        fontBody: item.fontBody,
        fontTitle: item.fontTitle,
        name: item.name,
        category: item.category ? item.category._id : "",
        previewImage: item.previewImage,
        preview: item.previewImage,
        isOnePage: item.isOnePage,
      },
    });
  };

  setOpenDialogue = (item) => {
    this.setState({
      showDialog: true,
    });
  };

  setCloseDialogue = () => {
    this.setState({
      showDialog: false,
    });
  };

  setCloseEditDialogue = () => {
    this.setState({
      showEditDialog: false,
    });
  };

  handleChangeName = (e) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        name: e.target.value,
      },
    });
  };

  handleChangeNameEdit = (e) => {
    this.setState({
      edit: {
        ...this.state.edit,
        name: e.target.value,
      },
    });
  };

  handleChangeColor = (color) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        mainColor: color.hex,
      },
    });
  };

  handleChangeFontTitle = (font) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        fontTitle: font,
      },
    });
  };

  handleChangeFontBody = (font) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        fontBody: font,
      },
    });
  };

  handleChangeColorEdit = (color) => {
    this.setState({
      edit: {
        ...this.state.edit,
        mainColor: color.hex,
      },
    });
  };

  handleChangeFontTitleEdit = (font) => {
    this.setState({
      edit: {
        ...this.state.edit,
        fontTitle: font,
      },
    });
  };

  handleChangeFontBodyEdit = (font) => {
    this.setState({
      edit: {
        ...this.state.edit,
        fontBody: font,
      },
    });
  };

  handleUpdate = async () => {
    const { edit } = this.state;
    await this.props.updateTheme(
      edit.id,
      edit.name,
      edit.fontBody,
      edit.fontTitle,
      edit.mainColor,
      edit.previewImage,
      edit.category,
      edit.isOnePage
    );
    this.setCloseEditDialogue();
    this.getThemes();
  };

  handleDelete = async () => {
    const { deleteTheme } = this.props;
    await deleteTheme(this.state.edit.id);
    this.setCloseEditDialogue();
    this.getThemes();
  };

  handleInsert = async () => {
    const { newItem } = this.state;
    await this.props.insertTheme(
      newItem.name,
      newItem.fontBody,
      newItem.fontTitle,
      newItem.mainColor,
      newItem.previewImage,
      newItem.category,
      newItem.isOnePage
    );
    this.setCloseDialogue();
    this.getThemes();
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

  getThemes = async () => {
    const { getAllThemesAdmin } = this.props;
    await getAllThemesAdmin();
    this.setListData(
      this.props.themes.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(this.props.themes);
  };

  componentDidMount() {
    this.getThemes();
    this.props.getAllCategoriesAdmin();
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
          this.props.themes.slice(
            this.state.offset,
            this.state.itemPerPage + this.state.offset
          )
        );
      });
    }
  };

  handleSearch = (event) => {
    let searchResult = this.props.themes.filter(function (theme) {
      return theme.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setState({ currentPage: 0, searchData: searchResult });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  handleChangeCategory = (e) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        category: e.target.value,
      },
    });
  };

  handleChangeCategoryEdit = (e) => {
    this.setState({
      edit: {
        ...this.state.edit,
        category: e.target.value,
      },
    });
  };

  handleChangeOnepage = (e) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        isOnePage: !this.state.newItem.isOnePage,
      },
    });
  };

  handleChangeOnepageEdit = (e) => {
    this.setState({
      edit: {
        ...this.state.edit,
        isOnePage: !this.state.edit.isOnePage,
      },
    });
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
        newItem: {
          ...this.state.newItem,
          previewImage: file,
          preview: URL.createObjectURL(file),
        },
      });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
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
          previewImage: file,
          preview: URL.createObjectURL(file),
        },
      });
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
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
                padding: "0 0.3rem",
                color: "rgb(0, 96, 136)",
                fontSize: "24px",
              }}
            >
              Themes
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
            padding: "0.5rem 0",
            color: "white",
            backgroundColor: "rgb(0, 96, 136)",
          }}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Name</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Font Body</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Font Title</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Main Color</p>
          </Grid>
          <Grid item xs={1}>
            <p style={{ fontWeight: "bold" }}>Category</p>
          </Grid>
          <Grid item xs={1}>
            <p style={{ fontWeight: "bold" }}></p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          this.state.filteredData.map((row, index) => (
            <div key={index}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <img
                    style={{
                      width: "80%",
                    }}
                    alt=""
                    src={row.previewImage}
                  />
                </Grid>
                <Grid item xs={2}>
                  {row.name}
                  {/* <div style={{ height: 20 }} /> */}
                </Grid>
                <Grid item xs={2}>
                  {row.fontBody}
                </Grid>
                <Grid item xs={2}>
                  {row.fontTitle}
                </Grid>
                <Grid container item xs={2}>
                  <Grid item xs={1}>
                    <div
                      style={{ backgroundColor: row.mainColor, height: 18 }}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    {row.mainColor}
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  {row.category && row.category.name}
                </Grid>
                <Grid container justify="flex-end" item xs={1}>
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
          <DialogTitle style={{ color: "rgb(0, 96, 136)" }}>
            Insert theme
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid container item xs={7} alignItems="center">
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Name
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="Name"
                      margin="dense"
                      variant="outlined"
                      value={this.state.newItem.name}
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
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Font Title
                  </Grid>
                  <Grid item xs={8}>
                    <FontPickerComponent
                      selectedValue={this.state.newItem.fontTitle}
                      onChange={this.handleChangeFontTitle}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Font Body
                  </Grid>
                  <Grid item xs={8}>
                    <FontPickerComponent
                      selectedValue={this.state.newItem.fontBody}
                      onChange={this.handleChangeFontBody}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Category
                  </Grid>
                  <Grid item xs={8}>
                    <Select
                      classes={{
                        root: classes.root,
                      }}
                      fullWidth
                      variant={"outlined"}
                      value={this.state.newItem.category}
                      onChange={this.handleChangeCategory}
                    >
                      {this.props.categories &&
                        this.props.categories.map((category, index) => {
                          if (category.name !== "All") {
                            return (
                              <MenuItem key={index} value={category._id}>
                                {category.name}
                              </MenuItem>
                            );
                          } else return <></>;
                        })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Is one-page
                  </Grid>
                  <Grid item xs={8}>
                    <Checkbox
                      checked={this.state.newItem.isOnePage}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      onChange={(e) => this.handleChangeOnepage(e)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
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
                    {this.state.newItem.preview && (
                      <Grid
                        item
                        xs={8}
                        style={{
                          backgroundImage: `URL("${this.state.newItem.preview}")`,
                          height: "4rem",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {/* <img
                          style={{
                            height: "4rem",
                          }}
                          alt=""
                          src={this.state.newItem.preview}
                        /> */}
                      </Grid>
                    )}

                    <Grid
                      container
                      item
                      xs={4}
                      justify={
                        this.state.newItem.preview ? "flex-end" : "flex-start"
                      }
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
              <Grid item xs={5}>
                <ChromePicker
                  style={{ marginTop: "2rem" }}
                  color={this.state.newItem.mainColor}
                  onChangeComplete={this.handleChangeColor}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: "1rem" }}>
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
          <DialogTitle style={{ color: "rgb(0, 96, 136)" }}>
            Edit theme
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row" spacing={2}>
              <Grid container item xs={7}>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title3}>
                    Id
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="ID"
                      color="primary"
                      value={this.state.edit.id}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title3}>
                    Name
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="Name"
                      color="primary"
                      margin="dense"
                      variant="outlined"
                      value={this.state.edit.name}
                      onChange={(e) => this.handleChangeNameEdit(e)}
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
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Font Title
                  </Grid>
                  <Grid item xs={8}>
                    <FontPickerComponent
                      selectedValue={this.state.edit.fontTitle}
                      onChange={this.handleChangeFontTitleEdit}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Font Body
                  </Grid>
                  <Grid item xs={8}>
                    <FontPickerComponent
                      selectedValue={this.state.edit.fontBody}
                      onChange={this.handleChangeFontBodyEdit}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4} className={classes.title2}>
                    Category
                  </Grid>
                  <Grid item xs={8}>
                    <Select
                      classes={{
                        root: classes.root,
                      }}
                      fullWidth
                      variant={"outlined"}
                      value={this.state.edit.category}
                      onChange={this.handleChangeCategoryEdit}
                    >
                      {this.props.categories &&
                        this.props.categories.map((category, index) => {
                          if (category.name !== "All") {
                            return (
                              <MenuItem key={index} value={category._id}>
                                {category.name}
                              </MenuItem>
                            );
                          } else return <></>;
                        })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Typography className={classes.title2}>
                      Is one-page
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Checkbox
                      checked={this.state.edit.isOnePage}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      onChange={(e) => this.handleChangeOnepageEdit(e)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  className={classes.gridItems}
                  alignItems="center"
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
                      >
                        {/* <img
                      style={{
                        height: "4rem",
                      }}
                      alt=""
                      src={this.state.edit.preview}
                    /> */}
                      </Grid>
                    )}
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
              <Grid item xs={5}>
                <ChromePicker
                  color={this.state.edit.mainColor}
                  onChangeComplete={this.handleChangeColorEdit}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ padding: "1rem 2rem" }}>
            <Button
              autoFocus
              variant="contained"
              color="secondary"
              onClick={() => this.handleDelete()}
            >
              Delete
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="primary"
              onClick={() => this.handleUpdate()}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  themes: state.theme.data,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
  categories: state.admin.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getAllThemesAdmin: (id, accessToken) =>
    dispatch(getAllThemesAdmin(id, accessToken)),
  updateTheme: (
    id,
    name,
    fontTitle,
    fontBody,
    color,
    previewImage,
    category,
    isOnePage
  ) =>
    dispatch(
      updateTheme(
        id,
        name,
        fontTitle,
        fontBody,
        color,
        previewImage,
        category,
        isOnePage
      )
    ),
  insertTheme: (
    name,
    fontTitle,
    fontBody,
    mainColor,
    previewImage,
    category,
    isOnePage
  ) =>
    dispatch(
      insertTheme(
        name,
        fontTitle,
        fontBody,
        mainColor,
        previewImage,
        category,
        isOnePage
      )
    ),
  getAllCategoriesAdmin: () => dispatch(getAllCategoriesAdmin()),
  deleteTheme: (id) => dispatch(deleteTheme(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableTheme));
