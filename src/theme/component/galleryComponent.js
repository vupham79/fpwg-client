import {
  CardActionArea,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import React from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import {
  getDataByPageNumber,
  setGalleriesToSiteView,
  updateNavItemValue
} from "../../actions";
import Link from "../../component/link";

const useStyles = theme => ({
  gridItems: {
    // maxHeight: 250
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  media: {
    paddingTop: "76.25%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }
});

class GalleryComponent extends React.Component {
  state = {
    img: "",
    open: false,
    pageView: 1,
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5
  };

  handlePageViewClick = async data => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setGalleriesToSiteView
    } = this.props;
    let selected = data.selected + 1;
    if (!isEdit) {
      this.setState({ pageView: selected });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "gallery",
        pageNumber: selected
      });
      data && setGalleriesToSiteView(data);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenDialog = image => {
    this.setState({ img: image, open: true });
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

  getList = async () => {
    const { galleries } = this.props;
    this.setState({
      filteredData: galleries.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      ),
      pageCount: Math.ceil(galleries.length / this.state.itemPerPage)
    });
  };

  componentDidMount() {
    const { isEdit } = this.props;
    if (isEdit) {
      this.getList();
    }
  }

  handlePageEditClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.galleries.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  renderHomepageGallery = () => {
    const { classes, galleries, siteView, titleView } = this.props;
    return (
      <>
        {galleries.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={4}
            md={3}
            className={classes.gridItems}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item && item.url && item.url}
                onClick={() =>
                  this.handleOpenDialog(item && item.url && item.url)
                }
              />
            </CardActionArea>
          </Grid>
        ))}
        <Grid item xs={12} sm={4} md={3} className={classes.gridItems}>
          <CardActionArea style={{ position: "relative" }}>
            <CardMedia
              className={classes.media}
              style={{ opacity: "0.1" }}
              image={siteView.logo}
            />
            <Link to="gallery">
              <Typography
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  textDecoration: "underline",
                  fontFamily: titleView.fontFamily,
                  fontWeight: 700,
                  color: titleView.color
                }}
              >
                View Gallery
              </Typography>
            </Link>
          </CardActionArea>
        </Grid>
      </>
    );
  };

  renderHomepageGalleryEdit = () => {
    const {
      classes,
      galleries,
      siteEdit,
      titleEdit,
      updateNavItemValue
    } = this.props;
    return (
      <>
        {galleries.slice(0, 5).map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={4}
            md={3}
            className={classes.gridItems}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item && item.url}
                title="Gallery image"
                onClick={() => this.handleOpenDialog(item && item.url)}
              />
            </CardActionArea>
          </Grid>
        ))}
        <Grid item xs={12} sm={4} md={3} className={classes.gridItems}>
          <CardActionArea
            style={{ position: "relative" }}
            onClick={(e, value) => {
              const gallery = siteEdit.navItems.filter(item => {
                return item.original === "gallery";
              });
              updateNavItemValue(gallery[0].order - 1);
            }}
          >
            <CardMedia
              className={classes.media}
              style={{ opacity: "0.1" }}
              image={siteEdit.logo}
            />
            <Typography
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                textAlign: "center",
                textDecoration: "underline",
                fontFamily: titleEdit.fontFamily,
                fontWeight: 700,
                color: siteEdit.color
              }}
            >
              View Gallery
            </Typography>
          </CardActionArea>
        </Grid>
      </>
    );
  };

  render() {
    const { classes, galleries, pageCountView, isEdit, fromHome } = this.props;
    return (
      <React.Fragment>
        <Container>
          <Grid
            container
            spacing={2}
            justify="center"
            style={{ padding: "4rem" }}
          >
            {isEdit
              ? !fromHome
                ? this.state.filteredData.map((item, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={4}
                      md={3}
                      className={classes.gridItems}
                    >
                      <CardActionArea>
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
                : this.renderHomepageGalleryEdit()
              : !fromHome
              ? galleries.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={4}
                    md={3}
                    className={classes.gridItems}
                  >
                    <CardActionArea>
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
                ))
              : this.renderHomepageGallery()}
          </Grid>
          {isEdit
            ? this.state.pageCount > 1 &&
              !fromHome && (
                <Grid container justify="center">
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageEditClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </Grid>
              )
            : pageCountView > 1 &&
              !fromHome && (
                <Grid container justify="center">
                  {/* <Pagination
                    style={{
                      backgroundColor: "white",
                      border: `1px solid black`,
                      padding: "0.2rem"
                    }}
                    color="primary"
                    shape="rounded"
                    count={pageCountView}
                    page={this.state.pageView}
                    onChange={this.handlePageViewClick}
                  /> */}
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCountView}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageViewClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </Grid>
              )}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            maxWidth="sm"
            fullWidth
          >
            <CardMedia
              className={classes.media}
              image={this.state.img}
              title="Gallery image"
              style={{ backgroundSize: "contain" }}
            />
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  pageCountView: state.post.pageCountGalleriesView,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit
});

const mapDispatchToProps = dispatch => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setGalleriesToSiteView: galleries =>
    dispatch(setGalleriesToSiteView(galleries)),
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GalleryComponent));
