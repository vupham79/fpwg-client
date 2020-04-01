import {
  Avatar,
  Button,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { Add, Cancel } from "@material-ui/icons";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import {
  changeHomeItemName,
  changeHomeItems,
  changeSiteAbout,
  removeCover,
  savePosts,
  setActiveNavItems,
  setNewCover,
  setNewLogo
} from "../actions";
import toastr from "./Toastr";

const useStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    fontFamily: "Segoe UI, sans-serif",
    marginBottom: theme.spacing(1),
    fontWeight: "600",
    color: "#555d66",
    fontSize: 14
  },
  title2: {
    fontSize: "14px",
    marginTop: "0.25rem",
    fontFamily: "Segoe UI, sans-serif",
    marginBottom: "1rem",
    color: "#555d66",
    fontWeight: 600
  },
  title3: {
    fontFamily: "Segoe UI, sans-serif",
    marginBottom: theme.spacing(1),
    fontWeight: "600",
    color: "#555d66",
    fontSize: 14,
    textAlign: "center"
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
  },
  gridItem: {
    zIndex: "99999999",
    border: "1px solid #dddddd",
    width: "100%",
    backgroundColor: "#f0eded"
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
});

const coverStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
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

const columns = ["", "Title", "Message", "Created Date", "Show"];
const columnsGallery = ["Photo", "Created Date", "Show"];
const columnsEvent = ["Name", "Description", "Start Time", "End Time", "Show"];

const DragHandle = sortableHandle(() => (
  <DragHandleIcon style={{ color: "#555d66", cursor: "move" }} />
));

function handleChangeActive(id, site, setActiveHomeItems) {
  const index = site && site.homepage && site.homepage.find(e => e._id === id);
  index.isActive = !index.isActive;
  setActiveHomeItems(site);
}

function handleChangeNavName(id, site, newName, changeHomeItemName) {
  const index = site && site.homepage && site.homepage.find(e => e._id === id);
  index.name = newName;
  changeHomeItemName(site);
}

class HomepageEditorTab extends React.Component {
  state = {
    openDiag: false,
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5,
    currentExpandItemId: null,
    previousExpandItemId: null,
    isExpanding: false,
    currentExpandType: "",
    currentExpandItem: null,
    currentFocusInput: "nameInput",
    openCropDiag: false,
    currentResolve: null,
    crop: null,
    pixelCrop: {
      unit: "%",
      x: 20,
      y: 20,
      width: 50,
      height: 50
    },
    selectedFile: null,
    selectedFilePath: null
  };

  handleUploadCover = async e => {
    if (this.props.newCover.length < 5) {
      e.preventDefault();
      let file = e.target.files[0];
      //validating the file
      //check if the file is exists
      if (!file) {
        toastr.error("No image is selected!", "Error");
        return;
      }
      //check if the image size is larger than 1MB
      if (file.size > 1048576) {
        toastr.error("Image size must be less than 1MB!", "Error");
        return;
      }
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        let cropImgFile = await new Promise(async (resolve, reject) => {
          try {
            this.setState({
              selectedFile: file,
              selectedFilePath: URL.createObjectURL(file),
              pixelCrop: { unit: "%", x: 20, y: 20, width: 50, height: 50 }
            });
            this.handleOpenCropDialogue(true, resolve);
          } catch (error) {
            toastr.error(`Crop failed`, "Error");
            resolve(file);
          }
        });
        this.props.setNewCover(cropImgFile);
      } else {
        toastr.error(
          "Please provide a valid image. (JPG, JPEG or PNG)",
          "Error"
        );
      }
    } else toastr.error("Maximum banner photo added.", "Error");
  };

  PostsList() {
    return (
      <>
        <TableContainer
          style={{ maxHeight: "70vh", width: "100%", overflow: "hidden" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell align="center" key={index}>
                    {column === "Created At" && (
                      <TableSortLabel>date</TableSortLabel>
                    )}
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.filteredData &&
                this.state.filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {(row.attachments &&
                        row.attachments.media_type === "photo" && (
                          <Avatar src={row.attachments.images[0]} />
                        )) ||
                        (row.attachments &&
                          row.attachments.media_type === "video" && (
                            <Avatar src={row.attachments.video} />
                          )) ||
                        (row.attachments &&
                          row.attachments.media_type === "album" && (
                            <Avatar src={row.attachments.images[0]} />
                          ))}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">
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
                      {moment(row.createdTime).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <GreenCheckbox
                        checked={
                          this.state.currentExpandItem.filter.items &&
                          this.state.currentExpandItem.filter.items.includes(
                            row
                          )
                            ? true
                            : false
                        }
                        onChange={() => this.setActivePost(row)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  EventList() {
    return (
      <>
        <TableContainer
          style={{ maxHeight: "70vh", width: "100%", overflow: "hidden" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnsEvent.map((column, index) => (
                  <TableCell align="center" key={index}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.filteredData &&
                this.state.filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      {moment(row.startTime).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {row.endTime
                        ? moment(row.endTime).format("DD-MM-YYYY")
                        : ""}
                    </TableCell>
                    <TableCell align="center">
                      <GreenCheckbox
                        checked={
                          this.state.currentExpandItem.filter.items &&
                          this.state.currentExpandItem.filter.items.includes(
                            row
                          )
                            ? true
                            : false
                        }
                        onChange={() => this.setActivePost(row)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  GalleryList() {
    return (
      <>
        <TableContainer
          style={{ maxHeight: "70vh", width: "100%", overflow: "hidden" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnsGallery.map((column, index) => (
                  <TableCell align="center" key={index}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.filteredData &&
                this.state.filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: 300 }}>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={row.url}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.createdTime).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <GreenCheckbox
                        checked={
                          this.state.currentExpandItem.filter.items &&
                          this.state.currentExpandItem.filter.items.includes(
                            row
                          )
                            ? true
                            : false
                        }
                        onChange={() => this.setActivePost(row)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  handleSetLatest = (item, setActiveHomeItems) => event => {
    const index =
      this.props.site &&
      this.props.site.homepage &&
      this.props.site.homepage.find(e => e._id === item._id);
    index.filter.type = event.target.value;
    if (event.target.value === "latest") {
      index.filter.items = null;
    } else {
      // index.filter.items = [];
    }
    setActiveHomeItems(this.props.site);
  };

  urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function(res) {
        return res.arrayBuffer();
      })
      .then(function(buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  getCroppedImg(file) {
    let pixelCrop = this.state.pixelCrop;
    let img = new Image();
    img.src = file;

    let canvas = document.createElement("canvas");
    canvas.width = (img.width * pixelCrop.width) / 100;
    canvas.height = (img.height * pixelCrop.height) / 100;
    let ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      (img.width * pixelCrop.x) / 100,
      (img.height * pixelCrop.y) / 100,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // As Base64 string
    let base64Image = canvas.toDataURL("image/png");
    let cropImgFile = this.urltoFile(
      base64Image,
      this.state.selectedFile.name,
      "text/plain"
    );
    // As a blob
    // const blob = new Promise((resolve, reject) => {
    //   canvas.toBlob(file => {
    //     resolve(file);
    //   }, 'image/jpeg');
    // });
    // this.setState({
    //   test: URL.createObjectURL(cropImgFile)
    // });
    return cropImgFile;
  }

  handleOpenCropDialogue = async (bool, resolve, isCancel) => {
    this.setState({
      openCropDiag: bool,
      currentResolve: resolve
    });
    if (!bool) {
      if (!isCancel) {
        resolve(await this.getCroppedImg(this.state.selectedFilePath));
      } else {
        resolve(this.state.selectedFile);
      }
    }
  };
  handleOpenPostDialogue = bool => {
    this.setState({
      openDiag: bool
    });
    if (bool) {
      if (this.state.currentExpandType === "news" && this.props.posts) {
        let noLongerActive = [];

        this.setPosts(
          this.props.posts.filter(function(pos) {
            noLongerActive.push(pos);
            return pos.isActive;
          })
        );

        if (!this.state.currentExpandItem.filter.items)
          this.state.currentExpandItem.filter.items = [];

        for (let i = 0; i < noLongerActive.length; i++) {
          if (
            !noLongerActive[i].isActive &&
            this.state.currentExpandItem.filter.items.includes(
              noLongerActive[i]
            )
          ) {
            this.state.currentExpandItem.filter.items = this.state.currentExpandItem.filter.items.filter(
              function(item) {
                return item._id !== noLongerActive[i]._id;
              }
            );
          }
        }
      }
      if (
        this.state.currentExpandType === "gallery" &&
        this.props.site.galleries
      ) {
        this.setPosts(this.props.site.galleries);
      }
      if (this.state.currentExpandType === "event" && this.props.site.events) {
        this.setPosts(this.props.site.events);
      }
    }
  };

  handleSave = () => {
    let list = this.props.site.homepage;

    for (let i = 0; i < list.length; i++) {
      if (!list[i].filter.items) list[i].filter.items = [];
      if (list[i].filter.items.length === 0) {
        list[i].filter.items = null;
        list[i].filter.type = "latest";
      }
    }
    this.props.setActiveHomeItems(this.props.site);
    this.handleOpenPostDialogue(false);
  };

  setPosts = posts => {
    const slicePosts = posts.slice(0, this.state.itemPerPage + 0);
    this.setState({
      filteredData: slicePosts
    });
    this.setPageCount(posts);
  };

  setPageCount = listData => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage)
    });
  };

  setActivePost = row => {
    // let index = this.props.site && this.props.site.homepage && this.props.site.homepage.find(e => e._id === this.state.currentExpandItemId);
    let index = this.state.currentExpandItem;
    if (!index.filter.items) {
      index.filter.items = [];
    }
    //set max item allowed for selected tab
    let maxAllowable;
    if (this.state.currentExpandType === "news" && this.props.posts) {
      maxAllowable = 3;
    }
    if (
      this.state.currentExpandType === "gallery" &&
      this.props.site.galleries
    ) {
      maxAllowable = 5;
    }
    if (this.state.currentExpandType === "event" && this.props.site.events) {
      maxAllowable = 5;
    }

    if (!index.filter.items.includes(row)) {
      if (index.filter.items.length >= maxAllowable) {
        toastr.error("Maximum item selected");
      } else index.filter.items = [...index.filter.items, row];
    } else {
      index.filter.items = index.filter.items.filter(function(post) {
        return post._id !== row._id;
      });
    }
    this.setState({ currentExpandItem: index });
  };

  renderNewCovers = () => {
    const { newCover, removeCover } = this.props;
    if (newCover && newCover.length > 0) {
      return newCover.map((cover, i) => {
        if (cover && typeof cover === "object" && cover.size > 0) {
          return (
            <Grid
              item
              key={i}
              md={4}
              sm={6}
              xs={6}
              style={{
                ...coverStyles,
                backgroundImage: `url(${URL.createObjectURL(cover)})`
              }}
            >
              <IconButton
                style={{ width: "100%" }}
                onClick={() => removeCover(cover)}
              >
                <Cancel color={"error"} />
              </IconButton>
            </Grid>
          );
        } else
          return (
            <Grid
              item
              key={i}
              md={4}
              sm={6}
              xs={6}
              style={{ ...coverStyles, backgroundImage: `url(${cover})` }}
            >
              <IconButton
                style={{ width: "100%", borderRadius: "0" }}
                onClick={() => removeCover(cover)}
              >
                <Cancel color={"error"} />
              </IconButton>
            </Grid>
          );
      });
    }
  };

  handleChangeAbout = e => {
    this.props.changeSiteAbout(e.target.value);
  };

  handleSearch = keyword => {
    let currentList;
    let searchResult;
    if (this.state.currentExpandType === "news" && this.props.posts) {
      currentList = this.props.posts.filter(function(pos) {
        return pos.isActive;
      });

      if (currentList) {
        searchResult = currentList.filter(function(pos) {
          return pos.message
            ? pos.message.toLowerCase().includes(keyword.toLowerCase())
            : null;
        });
      }
    }
    if (
      this.state.currentExpandType === "gallery" &&
      this.props.site.galleries
    ) {
      currentList = this.props.site.galleries;
    }
    if (this.state.currentExpandType === "event" && this.props.site.events) {
      currentList = this.props.site.events;
      if (currentList) {
        searchResult = currentList.filter(function(pos) {
          return pos.name.toLowerCase().includes(keyword.toLowerCase());
        });
      }
    }

    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  setListData = listData => {
    this.setState({
      filteredData: listData
    });
  };

  onChangeItem = ({ oldIndex, newIndex }) => {
    const { site, changeHomeItems } = this.props;
    let temp = site.homepage[oldIndex];
    site.homepage[oldIndex] = site.homepage[newIndex];
    site.homepage[newIndex] = temp;
    site.homepage.map((item, index) => (item.order = index + 1));
    changeHomeItems(site);
  };

  onChangePanel = (item, expand) => {
    if (item._id !== this.state.previousExpandItemId) {
      this.setState({
        currentExpandItemId: item._id,
        previousExpandItemId: item._id,
        isExpanding: true,
        currentExpandType: item.original,
        currentExpandItem: item
      });
    } else {
      this.setState({
        currentExpandItemId: item._id,
        isExpanding: expand,
        currentExpandType: item.original
      });
    }
  };

  handlePageClick = data => {
    let currentList;
    if (this.state.currentExpandType === "news" && this.props.posts) {
      currentList = this.props.posts.filter(function(pos) {
        return pos.isActive;
      });
    }
    if (
      this.state.currentExpandType === "gallery" &&
      this.props.site.galleries
    ) {
      currentList = this.props.site.galleries;
    }
    if (this.state.currentExpandType === "event" && this.props.site.events) {
      currentList = this.props.site.events;
    }
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);
    this.setState({ offset: offset }, () => {
      const slicePosts = currentList.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      );
      this.setState({
        filteredData: slicePosts
      });
    });
  };

  moveFocusAtEnd = e => {
    var temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };

  setCurrentFocusInput = refName => {
    this.setState({
      currentFocusInput: refName
    });
  };

  render() {
    const {
      classes,
      site,
      setActiveHomeItems,
      updateHomeItemValue,
      changeHomeItemName
    } = this.props;

    const postDialog = () => (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={this.state.openDiag}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {
            {
              news: (
                <Typography className={classes.title}>
                  Search by message
                </Typography>
              ),
              event: (
                <Typography className={classes.title}>
                  Search by event name
                </Typography>
              )
            }[this.state.currentExpandType]
          }
          {this.state.currentExpandType !== "gallery" && (
            <Paper component="form" className={classes.root}>
              <InputBase
                InputLabelProps={{
                  classes: {
                    focused: classes.focused
                  }
                }}
                maxLength={50}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputTitle
                  }
                }}
                id="searchBox"
                autoFocus={this.state.openDiag ? true : false}
                className={classes.input}
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
          )}
        </DialogTitle>
        <DialogContent style={{ height: "50vh" }}>
          <Grid container alignItems="center">
            {
              {
                news: this.PostsList(),
                gallery: this.GalleryList(),
                event: this.EventList()
              }[this.state.currentExpandType]
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center">
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
          </Grid>
          <Button
            variant="contained"
            style={{
              float: "right",
              backgroundColor: "#f0eded",
              width: 70,
              borderRadius: 5,
              color: "#555d66",
              fontSize: 11
            }}
            onClick={() => this.handleOpenPostDialogue(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              float: "right",
              backgroundColor: "#0074aa",
              width: 70,
              borderRadius: 5,
              color: "white",
              fontSize: 11
            }}
            onClick={() => this.handleSave()}
            color={"primary"}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );

    const postSection = (item, sectName) => (
      <>
        <Divider
          style={{
            height: "1rem",
            width: "100%",
            backgroundColor: "#ffffff00"
          }}
        />

        <Grid item xs={12}>
          <Typography className={classes.title}>Section display</Typography>
        </Grid>

        <Grid item xs={12}>
          <RadioGroup
            value={item.filter.type}
            onChange={this.handleSetLatest(item, setActiveHomeItems)}
            style={{ color: "#555d66", fontFamily: "Segoe UI, sans-serif" }}
          >
            <FormControlLabel
              value={"latest"}
              control={<Radio style={{ color: "#0074aa" }} />}
              label={<p style={{ fontSize: 13 }}>Latest contents</p>}
            />
            <FormControlLabel
              value={"manual"}
              control={<Radio style={{ color: "#0074aa" }} />}
              label={<p style={{ fontSize: 13 }}>Manual</p>}
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} style={{ height: 30 }} />

        <Grid
          item
          container
          style={{ display: item.filter.type === "latest" ? "none" : "block" }}
        >
          <Grid item xs={12}>
            <Typography className={classes.title}>{sectName}</Typography>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              color: "#555d66",
              textAlign: "left",
              fontStyle: "italic",
              fontFamily: "Segoe UI, sans-serif"
            }}
          >
            Select which content from Facebook you want to see on your homepage.
          </Grid>

          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <button
              className={classes.logoButton}
              color={"default"}
              onClick={() => this.handleOpenPostDialogue(true)}
            >
              Select
            </button>
          </Grid>
        </Grid>
      </>
    );

    const SortableItem = sortableElement(
      ({ value, site, item, setActiveHomeItems, changeHomeItemName }) => (
        <ExpansionPanel
          expanded={
            this.state.currentExpandItemId === item._id &&
            this.state.isExpanding
              ? true
              : false
          }
          className={classes.gridItem}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => this.onChangePanel(item, !this.state.isExpanding)}
            aria-controls="panel1a-content"
            style={{ backgroundColor: "white" }}
          >
            <Grid container item alignItems="center" xs={10} sm={12} md={10}>
              <Grid container justify="center" item xs={2} md={2} sm={12}>
                <DragHandle />
              </Grid>
              <Grid item xs={10} md={10} sm={12}>
                <Typography className={classes.title3}>
                  {item.original.charAt(0).toUpperCase()}
                  {item.original.substring(1)}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <Typography className={classes.title2}>Display name</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      focused: classes.focused
                    }
                  }}
                  maxLength={50}
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
                  autoFocus
                  disabled={this.state.openDiag ? true : false}
                  onClick={() => this.setCurrentFocusInput("nameInput")}
                  onChange={e =>
                    handleChangeNavName(
                      item._id,
                      site,
                      e.target.value,
                      changeHomeItemName
                    )
                  }
                />
              </Grid>

              {item.original === "about" && (
                <>
                  <Grid item xs={12} style={{ height: 20 }} />
                  <Grid item xs={12}>
                    <Typography className={classes.title2}>Content</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      InputLabelProps={{
                        classes: {
                          focused: classes.focused
                        }
                      }}
                      maxLength={50}
                      InputProps={{
                        classes: {
                          notchedOutline: classes.notchedOutline,
                          input: classes.inputTitle
                        }
                      }}
                      multiline
                      autoFocus={
                        this.state.currentFocusInput === "aboutInput"
                          ? true
                          : false
                      }
                      onFocus={this.moveFocusAtEnd}
                      onClick={() => this.setCurrentFocusInput("aboutInput")}
                      size="small"
                      style={{ backgroundColor: "white" }}
                      fullWidth
                      rows={5}
                      spellCheck={false}
                      variant={"outlined"}
                      value={this.props.about ? this.props.about : ""}
                      id="aboutInput"
                      onChange={e => this.handleChangeAbout(e)}
                    />
                  </Grid>
                </>
              )}

              {
                {
                  news: postSection(item, "News"),
                  event: postSection(item, "Events"),
                  gallery: postSection(item, "Photos")
                }[item.original]
              }

              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#0074aa" }}
                    checked={!item.isActive}
                    onChange={() =>
                      handleChangeActive(item._id, site, setActiveHomeItems)
                    }
                  />
                }
                label={
                  <p style={{ fontSize: 13, color: "#555d66" }}>
                    Hide this section
                  </p>
                }
              />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    );

    const SortableList = sortableContainer(
      ({
        items,
        site,
        setActiveHomeItems,
        updateHomeItemValue,
        changeHomeItemName
      }) => {
        if (items) {
          return (
            <Grid container alignItems="center">
              {items.map((value, index) => (
                <SortableItem
                  key={index}
                  index={index}
                  value={value.name}
                  item={value}
                  site={site}
                  setActiveHomeItems={setActiveHomeItems}
                  updateHomeItemValue={updateHomeItemValue}
                  changeHomeItemName={changeHomeItemName}
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
        <Grid
          item
          style={{
            color: "#555d66",
            textAlign: "left",
            fontStyle: "italic",
            fontFamily: "Segoe UI, sans-serif"
          }}
        >
          Choose what’s displayed on the homepage of your site. Latest contents
          are automatically shown on your site but you can decide which content
          to display manually.
        </Grid>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.openCropDiag}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {/* <Typography className={classes.title}>Crop dimension: {this.state.crop.width} x {this.state.crop.height} </Typography>
            <Typography className={classes.title}>Recommended dimension: 750 x 400 </Typography> */}
            <Typography className={classes.title}>Crop Image</Typography>
          </DialogTitle>
          <DialogContent style={{ height: "50vh" }}>
            <ReactCrop
              src={this.state.selectedFilePath}
              crop={this.state.pixelCrop}
              onChange={(crop, pixelCrop) =>
                this.setState({ pixelCrop: pixelCrop })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              style={{
                float: "right",
                backgroundColor: "#f0eded",
                width: 70,
                borderRadius: 5,
                color: "#555d66",
                fontSize: 11
              }}
              onClick={() =>
                this.handleOpenCropDialogue(
                  false,
                  this.state.currentResolve,
                  true
                )
              }
              color="secondary"
            >
              Skip
            </Button>
            <Button
              variant="contained"
              style={{
                float: "right",
                backgroundColor: "#0074aa",
                width: 70,
                borderRadius: 5,
                color: "white",
                fontSize: 11
              }}
              onClick={() =>
                this.handleOpenCropDialogue(
                  false,
                  this.state.currentResolve,
                  false
                )
              }
              color={"primary"}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        {postDialog()}
        <Divider
          style={{ height: 40, width: "100%", backgroundColor: "#ffffff00" }}
        />

        <Typography className={classes.title}>Contents</Typography>

        <Divider
          style={{ height: 30, width: "100%", backgroundColor: "#ffffff00" }}
        />

        <SortableList
          items={site.homepage}
          onSortEnd={this.onChangeItem}
          useDragHandle
          site={site}
          setActiveHomeItems={setActiveHomeItems}
          updateHomeItemValue={updateHomeItemValue}
          changeHomeItemName={changeHomeItemName}
        />

        <Divider
          style={{ height: 30, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Banner images</Typography>
        <Grid container className={classes.sideBarBox}>
          {this.renderNewCovers()}
          <Grid
            item
            container
            justify={"center"}
            alignItems="center"
            md={4}
            sm={6}
            xs={6}
            style={{
              ...coverStyles,
              backgroundColor: "#F3ECEC",
              border: "1px dashed #555d66",
              cursor: "pointer",
              color: "#555d66",
              minHeight: 50 //maintain height when removing all images
            }}
            onClick={() => document.getElementById("addCover").click()}
          >
            <Input
              type="file"
              id="addCover"
              onChange={e => this.handleUploadCover(e)}
              style={{ display: "none" }}
            />
            <Add fontSize="small" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  isShow: state.theme.isShow,
  site: state.site.siteEdit,
  newCover: state.site.newCover,
  isChanged: state.site.isChanged,
  posts: state.post.posts,
  about: state.site.siteEdit.about && state.site.siteEdit.about
});

const mapDispatchToProps = dispatch => ({
  setNewLogo: file => dispatch(setNewLogo(file)),
  setNewCover: file => dispatch(setNewCover(file)),
  removeCover: cover => dispatch(removeCover(cover)),
  savePosts: posts => dispatch(savePosts(posts)),
  changeHomeItems: items => dispatch(changeHomeItems(items)),
  changeHomeItemName: site => dispatch(changeHomeItemName(site)),
  setActiveHomeItems: site => dispatch(setActiveNavItems(site)),
  changeSiteAbout: about => dispatch(changeSiteAbout(about))
  // updateHomeItemValue:
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HomepageEditorTab));
