import {
  CardActionArea,
  CardMedia,
  Dialog,
  Grid,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import {
  faChevronCircleDown,
  // faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getDataByPageNumber,
  setGalleriesToSiteViewOnePage,
  updateNavItemValue,
} from "../../../actions";

const useStyles = (theme) => ({
  gridItems: {
    // maxHeight: 250
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  media: {
    paddingTop: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "100%",
  },
  dialogMedia: {
    height: "600px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  // paginationItemRoot: {
  //   color: "#fff",
  // },
  paginationItemSelected: {
    backgroundColor: "#fff !important",
    color: "#000 !important",
  },
  showMore: {
    marginTop: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

class Gallery extends React.Component {
  state = {
    img: "",
    open: false,
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitGallery
      : this.props.siteView.limitGallery,
    page: 1,
    count: this.props.isEdit
      ? this.props.siteEdit.limitGallery
      : this.props.siteView.limitGallery,
    // initialGallery: null,
  };

  handlePageViewClick = async (event, newValue) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setGalleriesToSiteViewOnePage,
    } = this.props;
    if (!isEdit) {
      this.setState({ pageView: newValue });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "gallery",
        pageNumber: newValue,
      });
      data && setGalleriesToSiteViewOnePage(data);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenDialog = (image) => {
    this.setState({ img: image, open: true });
  };

  handleShowMore = async () => {
    this.setState({ itemPerPage: this.state.itemPerPage + this.state.count });
    const {
      isEdit,
      getDataByPageNumber,
      setGalleriesToSiteViewOnePage,
      siteInfo,
      siteView,
    } = this.props;
    if (isEdit) {
      this.setState({
        itemPerPage:
          parseInt(this.state.itemPerPage) + parseInt(this.state.count),
      });
    } else {
      this.setState({ pageView: this.state.pageView + 1 });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "gallery",
        pageNumber: this.state.pageView + 1,
      });
      let newGalleries = [...siteView.galleries, ...data.data];
      newGalleries && setGalleriesToSiteViewOnePage(newGalleries);
    }
  };

  render() {
    const {
      classes,
      galleries,
      isEdit,
      pageCount,
      titleEdit,
      titleView,
      pageCountView,
    } = this.props;
    const { offset, itemPerPage, page } = this.state;
    const useStyles = () => ({
      showMore: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
        lineHeight: "1.4em",
        textAlign: "center",
        textDecoration: "underline",
      },
    });
    const showMore = useStyles();
    return (
      <React.Fragment>
        <Grid container justify="center" xs={12}>
          <Grid container item xs={12} justify="center">
            {isEdit
              ? galleries &&
                galleries
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 5
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .map((item, index) => (
                    <Grid
                      item
                      key={index}
                      xs={10}
                      sm={4}
                      className={classes.gridItems}
                    >
                      <CardActionArea style={{ height: "100%" }}>
                        <CardMedia
                          className={classes.media}
                          image={item && item.url}
                          title="Gallery image"
                          onClick={() =>
                            this.handleOpenDialog(item && item.url)
                          }
                        />
                      </CardActionArea>
                    </Grid>
                  ))
              : galleries
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 5
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .map((item, index) => (
                    <Grid
                      item
                      key={index}
                      xs={10}
                      sm={4}
                      className={classes.gridItems}
                    >
                      <CardActionArea style={{ height: "100%" }}>
                        <CardMedia
                          className={classes.media}
                          image={item && item._id && item._id.url}
                          title="Gallery image"
                          onClick={() =>
                            this.handleOpenDialog(
                              item && item._id && item._id.url
                            )
                          }
                        />
                      </CardActionArea>
                    </Grid>
                  ))}
          </Grid>
          {isEdit
            ? pageCount > 1 &&
              itemPerPage < galleries.length && (
                <Grid
                  container
                  item
                  xs={6}
                  justify="center"
                  className={classes.showMore}
                  style={showMore.showMore}
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleDown}
                    color={isEdit ? titleEdit.color : titleView.color}
                    size="2x"
                    onClick={() => this.handleShowMore()}
                  />
                  {/* <FontAwesomeIcon
                    icon={faChevronCircleUp}
                    color={isEdit ? titleEdit.color : titleView.color}
                    size="1x"
                  /> */}
                </Grid>
              )
            : pageCountView &&
              this.state.pageView < pageCountView && (
                <Grid
                  container
                  item
                  xs={6}
                  justify="center"
                  className={classes.showMore}
                  style={showMore.showMore}
                >
                  <FontAwesomeIcon
                    icon={faChevronCircleDown}
                    color={isEdit ? titleEdit.color : titleView.color}
                    size="2x"
                    onClick={() => this.handleShowMore()}
                  />
                  {/* <FontAwesomeIcon
                    icon={faChevronCircleUp}
                    color={isEdit ? titleEdit.color : titleView.color}
                    size="1x"
                  /> */}
                </Grid>
              )}
        </Grid>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            elevation: 0,
            style: {
              backgroundColor: "unset",
              overflow: "hidden",
            },
          }}
        >
          <CardMedia
            className={classes.dialogMedia}
            image={this.state.img}
            title="Gallery image"
            style={{ backgroundSize: "contain" }}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  pageCountView: state.post.pageCountGalleriesView,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setGalleriesToSiteViewOnePage: (galleries) =>
    dispatch(setGalleriesToSiteViewOnePage(galleries)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Gallery));
