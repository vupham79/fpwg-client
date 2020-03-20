import {
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { withStyles } from "@material-ui/core/styles";
import { Add, Cancel } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import {
  changeColor,
  changeFontBody,
  changeFontTitle,
  changeSiteTitle,
  changeTheme,
  removeCover,
  setColorPallete,
  setNewCover,
  setNewLogo,
  setShowCustomColor,
  savePosts,
  setActivePost
} from "../actions";
import toastr from "./Toastr";
import { green } from "@material-ui/core/colors";

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

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "6rem",
  height: "6rem"
};

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

class HomepageEditorTab extends React.Component {
  state = {
    autoLatest: true, //biến này chắc phải lưu database?
    openDiag: false,
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5
  };

  handleSetLatest = event => {
    this.setState({
      autoLatest: event
    });
  };

  handleOpenDialogue = (bool) => {
    this.setState({
      openDiag: bool
    });
  };

  setStatePost = posts => {
    this.setState({ filteredData: [...posts] });
  };

  handleSave = async posts => {
    await this.props.savePosts(posts);
    this.handleOpenDialogue(false);
  };

  handleUploadCover = async e => {
    e.preventDefault();
    const file = e.target.files[0];
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
      this.props.setNewCover(file);
    } else {
      toastr.error("Please provide a valid image. (JPG, JPEG or PNG)", "Error");
    }
  };

  handleChangeSiteTitle = e => {
    const { site, changeSiteTitle } = this.props;
    site.title = e.target.value;
    changeSiteTitle(site);
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

  setPageCount = listData => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage)
    });
  };

  setActivePost = (post, status) => {
    const { posts, setActivePost } = this.props;
    setActivePost(post, status);
    this.setState({ filteredData: [...posts] });
  };

  componentDidMount() {
    const { posts } = this.props;
    if (posts) {
      this.setPosts();
    }
  }

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
                <Cancel
                  onClick={() => removeCover(cover)}
                  color={"error"}
                  fontSize={""}
                />
              </IconButton>
            </Grid>
          );
      });
    }
  };


  render() {

    const {
      classes,
      site,
      posts
    } = this.props;

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
          Choose what’s displayed on the homepage of your site. Latest contents are automatically shown on your site but you can decide which content to display manually.
          </Grid>

        <Divider
          style={{ height: 20, width: "100%", backgroundColor: "#ffffff00" }}
        />
        <Typography className={classes.title}>Your hompage displays</Typography>
        <RadioGroup value={this.state.autoLatest} onChange={() => this.handleSetLatest(!this.state.autoLatest)} style={{ color: "#555d66", fontFamily: "Segoe UI, sans-serif" }}>
          <FormControlLabel value={true} control={<Radio style={{ color: "#0074aa" }} />} label={<p style={{ fontSize: 13 }}>Your latest posts</p>} />
          <FormControlLabel value={false} control={<Radio style={{ color: "#0074aa" }} />} label={<p style={{ fontSize: 13 }}>Manual</p>} />
        </RadioGroup>
        <Divider
          style={{ height: 30, width: "100%", backgroundColor: "#ffffff00" }}
        />

        <Grid container style={{ display: this.state.autoLatest ? "none" : "block" }}>

          <Typography className={classes.title}>News</Typography>
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
                onClick={() => this.handleOpenDialogue(true)}
              >
                Select
            </button>
            </Grid>

            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={this.state.openDiag}
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
                  onClick={() => this.handleOpenDialogue(false)}
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
  posts: state.post.posts
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site)),
  changeColor: site => dispatch(changeColor(site)),
  changeFontTitle: site => dispatch(changeFontTitle(site)),
  changeFontBody: site => dispatch(changeFontBody(site)),
  setShowCustomColor: isShow => dispatch(setShowCustomColor(isShow)),
  changeSiteTitle: site => dispatch(changeSiteTitle(site)),
  setColorPallete: pallete => dispatch(setColorPallete(pallete)),
  setNewLogo: file => dispatch(setNewLogo(file)),
  setNewCover: file => dispatch(setNewCover(file)),
  removeCover: cover => dispatch(removeCover(cover)),
  savePosts: posts => dispatch(savePosts(posts)),
  setActivePost: (post, status) => dispatch(setActivePost(post, status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HomepageEditorTab));
