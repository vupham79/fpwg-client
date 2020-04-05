import {
  CardActionArea,
  CardMedia,
  Container,
  Dialog,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { connect } from "react-redux";
import {
  getDataByPageNumber,
  setGalleriesToSiteView,
  updateNavItemValue,
} from "../../actions";
import Link from "../../component/link";

const useStyles = (theme) => ({
  gridItems: {
    // maxHeight: 250
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  media: {
    paddingTop: "76.25%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
});

class GalleryComponent extends React.Component {
  state = {
    img: "",
    open: false,
    pageView: 1,
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5,
    page: 1,
  };

  handlePageViewClick = async (event, newValue) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setGalleriesToSiteView,
    } = this.props;
    if (!isEdit) {
      this.setState({ pageView: newValue });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "gallery",
        pageNumber: newValue,
      });
      data && setGalleriesToSiteView(data);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenDialog = (image) => {
    this.setState({ img: image, open: true });
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

  getList = async () => {
    const { galleries } = this.props;
    this.setState({
      filteredData: galleries.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      ),
      pageCount: Math.ceil(galleries.length / this.state.itemPerPage),
    });
  };

  componentDidMount() {
    const { isEdit } = this.props;
    if (isEdit) {
      this.getList();
    }
  }

  handlePageEditClick = (event, newValue) => {
    let selected = newValue - 1;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset, page: newValue }, () => {
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
            <Link to={`/${siteView.sitePath}/gallery`}>
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
                  color: titleView.color,
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
      updateNavItemValue,
    } = this.props;
    return (
      <>
        {galleries.slice(0, 3).map((item, index) => (
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
              const gallery = siteEdit.navItems.filter((item) => {
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
                color: siteEdit.color,
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
              <Grid container justify="center" style={{ padding: "2rem" }}>
                <Pagination
                  style={{
                    backgroundColor: "white",
                    padding: "0.4rem",
                    borderRadius: "0.3rem",
                  }}
                  color="primary"
                  shape="rounded"
                  variant="outlined"
                  count={this.state.pageCount}
                  page={this.state.page}
                  onChange={this.handlePageEditClick}
                />
              </Grid>
            )
            : pageCountView > 1 &&
            !fromHome && (
              <Grid container justify="center" style={{ padding: "2rem" }}>
                <Pagination
                  style={{
                    backgroundColor: "white",
                    padding: "0.4rem",
                    borderRadius: "0.3rem",
                  }}
                  color="primary"
                  shape="rounded"
                  variant="outlined"
                  count={pageCountView}
                  page={this.state.pageView}
                  onChange={this.handlePageViewClick}
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
  setGalleriesToSiteView: (galleries) =>
    dispatch(setGalleriesToSiteView(galleries)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GalleryComponent));
