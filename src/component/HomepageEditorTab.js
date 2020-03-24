import {
  Typography,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
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
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Dialog,
  DialogActions,
  CardMedia
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add, Cancel } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import {
  removeCover,
  savePosts,
  setNewCover,
  setNewLogo,
  changeHomeItemName,
  changeHomeItems,
  setActiveNavItems,
  changeSiteAbout
} from "../actions";
import toastr from "./Toastr";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import { green } from "@material-ui/core/colors";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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

const columns = ["Avatar", "Title", "Message", "Created At", "Show"];
const columnsGallery = ["Picture", "Show"];
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
    itemPerPage: 2,
    currentExpandItemId: null,
    previousExpandItemId: null,
    isExpanding: false,
    currentExpandType: "",
    currentExpandItem: null,
  };

  PostsList() {
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
              {this.state.filteredData &&
                this.state.filteredData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(row.attachments && row.attachments.media_type === "photo" && (
                        <Avatar src={row.attachments.images[0]} />
                      )) ||
                        (row.attachments && row.attachments.media_type === "video" && (
                          <Avatar src={row.attachments.video} />
                        )) ||
                        (row.attachments && row.attachments.media_type === "album" && (
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
                        checked={this.state.currentExpandItem.filter.items && this.state.currentExpandItem.filter.items.includes(row) ? true : false}
                        onChange={() => this.setActivePost(row)}
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
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Grid>
      </>
    );
  }



  EventList() {
    return (
      <>
        <TableContainer style={{ maxHeight: "70vh" }}>
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
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {row.description}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.startTime).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.endTime).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      <GreenCheckbox
                        checked={this.state.currentExpandItem.filter.items && this.state.currentExpandItem.filter.items.includes(row) ? true : false}
                        onChange={() => this.setActivePost(row)}
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
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Grid>
      </>
    );
  }

  GalleryList() {

    return (
      <>
        <TableContainer style={{ maxHeight: "70vh" }}>
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
                    <TableCell align="right">
                      <GreenCheckbox
                        checked={this.state.currentExpandItem.filter.items && this.state.currentExpandItem.filter.items.includes(row) ? true : false}
                        onChange={() => this.setActivePost(row)}
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
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Grid>
      </>
    );
  }

  handleSetLatest = (item, setActiveHomeItems) => (event) => {
    const index = this.props.site && this.props.site.homepage && this.props.site.homepage.find(e => e._id === item._id);
    index.filter.type = event.target.value;
    if (event.target.value === "latest") {
      index.filter.items = null;
    }
    else {
      // index.filter.items = [];
    }
    setActiveHomeItems(this.props.site);
  };

  handleOpenPostDialogue = bool => {
    this.setState({
      openDiag: bool
    });
  };

  handleSave = () => {
    // let currentList;
    // if (this.state.currentExpandType === "news" && this.props.posts) {
    //   currentList = this.props.posts;
    // }
    // if (this.state.currentExpandType === "gallery" && this.props.site.galleries) {
    //   currentList = this.props.site.galleries;
    // }
    // if (this.state.currentExpandType === "event" && this.props.site.events) {
    //   currentList = this.props.site.events;
    // }
    this.props.setActiveHomeItems(this.props.site);
    this.handleOpenPostDialogue(false);
  };

  setPosts = (posts) => {
    const slicePosts = posts.slice(
      0,
      this.state.itemPerPage + 0
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

  setActivePost = (row) => {
    // let index = this.props.site && this.props.site.homepage && this.props.site.homepage.find(e => e._id === this.state.currentExpandItemId);
    let index = this.state.currentExpandItem;
    if (!index.filter.items) {
      index.filter.items = [];
    }

    if (!index.filter.items.includes(row)) {
      if (index.filter.items.length >= 3) {
        toastr.error("Maximum item selected");
      }
      else index.filter.items = [...index.filter.items, row];
    }
    else {
      index.filter.items = index.filter.items.filter(function (post) {
        return post._id !== row._id;
      })
    }

    // this.props.setActiveHomeItems(this.props.site);
    console.log(index);
    this.setState({ currentExpandItem: index });

  };

  componentDidMount() {


  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.site == this.props.site) {
  //     return false;
  //   }
  //   return true;
  // }

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

  onChangeItem = ({ oldIndex, newIndex }) => {
    const { site, changeHomeItems } = this.props;
    let temp = site.homepage[oldIndex];
    site.homepage[oldIndex] = site.homepage[newIndex];
    site.homepage[newIndex] = temp;
    site.homepage.map((item, index) => (item.order = index + 1));
    changeHomeItems(site);
  };

  onChangePanel = (item, expand) => {

    if (item.original === "news" && this.props.posts) {
      this.setPosts(this.props.posts);
    }
    if (item.original === "gallery" && this.props.site.galleries) {
      this.setPosts(this.props.site.galleries);
    }
    if (item.original === "event" && this.props.site.events) {
      this.setPosts(this.props.site.events);
    }
    if (item._id !== this.state.previousExpandItemId) {
      this.setState({
        currentExpandItemId: item._id,
        previousExpandItemId: item._id,
        isExpanding: true,
        currentExpandType: item.original,
        currentExpandItem: item,
      })
    }
    else {
      this.setState({
        currentExpandItemId: item._id,
        isExpanding: expand,
        currentExpandType: item.original,
      })
    }
  };

  handlePageClick = data => {
    let currentList;
    if (this.state.currentExpandType === "news" && this.props.posts) {
      currentList = this.props.posts;
    }
    if (this.state.currentExpandType === "gallery" && this.props.site.galleries) {
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
        <Grid container alignItems="center">
          {
            {
              "news":
                this.PostsList(),
              "gallery":
                this.GalleryList(),
              "event":
                this.EventList(),
            }[this.state.currentExpandType]
          }
        </Grid>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={() => this.handleOpenPostDialogue(false)}
            color="secondary"
          >
            Cancel
      </Button>
          <Button
            variant="contained"
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
          style={{ height: "1rem", width: "100%", backgroundColor: "#ffffff00" }}
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
            item xs={12}
            style={{
              color: "#555d66",
              textAlign: "left",
              fontStyle: "italic",
              fontFamily: "Segoe UI, sans-serif"
            }}
          >
            Select which content from Facebook you want to see on your homepage.
        </Grid>

          <Grid item xs={12} justify={"center"} style={{ marginTop: "1rem" }}>
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
      ({
        value,
        site,
        item,
        setActiveHomeItems,
        changeHomeItemName
      }) => (

          <ExpansionPanel expanded={(this.state.currentExpandItemId === item._id && this.state.isExpanding) ? true : false} className={classes.gridItem} >

            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon onClick={() => this.onChangePanel(item, !this.state.isExpanding)} />}
              aria-controls="panel1a-content"
              style={{ backgroundColor: "white" }}
            >
              <Grid
                container
                item
                alignItems="center"
                xs={10}
                sm={12}
                md={10}
              >
                <Grid container justify="center" item xs={2} md={2} sm={12}>
                  <DragHandle />
                </Grid>
                <Grid item xs={10} md={10} sm={12}>
                  <Typography className={classes.title3}>{item.original.charAt(0).toUpperCase()}{item.original.substring(1)}</Typography>
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
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.inputTitle,
                        maxLength: 50
                      }
                    }}
                    autoFocus
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
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline,
                            input: classes.inputTitle,
                            maxLength: 200
                          }
                        }}
                        multiline
                        // autoFocus
                        size="small"
                        style={{ backgroundColor: "white" }}
                        fullWidth
                        rows={5}
                        spellCheck={false}
                        variant={"outlined"}
                        value={this.props.about}
                        onChange={(e) => this.handleChangeAbout(e)}
                      />
                    </Grid>
                  </>
                )}

                {{
                  "news": postSection(item, "News"),
                  "event": postSection(item, "Events"),
                  "gallery": postSection(item, "Pictures"),
                }[item.original]
                }

                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#0074aa" }}
                      checked={!item.isActive}
                      onChange={() => handleChangeActive(item._id, site, setActiveHomeItems)}
                    />
                  }
                  label={<p style={{ fontSize: 13, color: "#555d66" }}>Hide this section</p>}
                />

              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel >
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
  changeSiteAbout: about => dispatch(changeSiteAbout(about)),
  // updateHomeItemValue: 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HomepageEditorTab));
