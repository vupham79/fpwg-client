import {
  CardActionArea,
  CardMedia,
  Dialog,
  Grid,
  withStyles,
} from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import {
  getDataByPageNumber,
  setGalleriesToSiteView,
  updateNavItemValue,
} from "../../actions";
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
  paginationItemRoot: {
    color: "#fff",
  },
});

function SampleNextArrow(props) {
  const { className, style, onClick, dark } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: !dark && "grey",
        borderRadius: "100%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, dark } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: !dark && "grey",
        borderRadius: "100%",
      }}
      onClick={onClick}
    />
  );
}
class GalleryComponent extends React.Component {
  state = {
    img: "",
    open: false,
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitGallery
      : this.props.siteView.limitGallery,
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

  handlePageEditClick = (event, newValue) => {
    let selected = newValue - 1;
    let offset = Math.ceil(selected * this.state.itemPerPage);
    this.setState({ offset: offset, page: newValue });
  };

  renderHomepageGallery = () => {
    const { classes, galleries, dark } = this.props;
    return (
      <>
        {galleries && galleries.length > 3 && (
          <Grid item xs={12}>
            <Slider
              speed={1000}
              autoplaySpeed={2500}
              arrows={true}
              infinite
              slidesToScroll={4}
              slidesToShow={4}
              nextArrow={<SampleNextArrow dark={dark} />}
              prevArrow={<SamplePrevArrow dark={dark} />}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToScroll: 4,
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {galleries.map((item, index) => (
                // <Grid
                //   item
                //   key={index}
                //   xs={12}
                //   sm={4}
                //   md={4}
                //   className={classes.gridItems}
                // >
                // <CardActionArea style={{ height: "100%" }}>
                <CardMedia
                  className={classes.media}
                  image={item && item.url && item.url}
                  onClick={() =>
                    this.handleOpenDialog(item && item.url && item.url)
                  }
                />
                // </CardActionArea>
                // </Grid>
              ))}
            </Slider>
          </Grid>
        )}
        {/* {galleries.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={4}
            md={3}
            className={classes.gridItems}
          >
            <CardActionArea style={{ height: "100%" }}>
              <CardMedia
                className={classes.media}
                image={item && item.url && item.url}
                onClick={() =>
                  this.handleOpenDialog(item && item.url && item.url)
                }
              />
            </CardActionArea>
          </Grid>
        ))} */}
      </>
    );
  };

  renderHomepageGalleryEdit = () => {
    const { classes, galleries, dark } = this.props;
    return (
      <>
        {galleries && galleries.length > 3 && (
          <Grid item xs={12}>
            <Slider
              speed={1000}
              autoplaySpeed={2500}
              arrows={true}
              infinite
              slidesToScroll={4}
              slidesToShow={4}
              nextArrow={<SampleNextArrow dark={dark} />}
              prevArrow={<SamplePrevArrow dark={dark} />}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToScroll: 4,
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {galleries.slice(0, 6).map((item, index) => (
                <CardMedia
                  className={classes.media}
                  image={item && item.url}
                  title="Gallery image"
                  onClick={() => this.handleOpenDialog(item && item.url)}
                />
              ))}
            </Slider>
          </Grid>
        )}
        {/* {galleries.slice(0, 6).map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={4}
            md={3}
            className={classes.gridItems}
          >
            <CardActionArea style={{ height: "100%" }}>
              <CardMedia
                className={classes.media}
                image={item && item.url}
                title="Gallery image"
                onClick={() => this.handleOpenDialog(item && item.url)}
              />
            </CardActionArea>
          </Grid>
        ))} */}
      </>
    );
  };

  render() {
    const {
      classes,
      galleries,
      pageCountView,
      isEdit,
      fromHome,
      pageCount,
      dark,
    } = this.props;
    const { offset, itemPerPage, page } = this.state;
    return (
      <React.Fragment>
        <Grid
          container
          spacing={2}
          justify="center"
          xs={12}
          sm={10}
          style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
        >
          {isEdit
            ? !fromHome
              ? galleries
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
                      xs={12}
                      sm={4}
                      md={3}
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
                  <CardActionArea style={{ height: "100%" }}>
                    <CardMedia
                      className={classes.media}
                      image={item && item._id && item._id.url}
                      onClick={() =>
                        this.handleOpenDialog(item && item._id && item._id.url)
                      }
                    />
                  </CardActionArea>
                </Grid>
              ))
            : this.renderHomepageGallery()}
        </Grid>
        {isEdit
          ? pageCount > 1 &&
            !fromHome && (
              <Grid
                container
                justify="center"
                // style={{ padding: "2rem" }}
              >
                <Pagination
                  style={{
                    backgroundColor: dark ? "#000" : "#fff",
                    padding: "0.4rem",
                    borderRadius: "0.3rem",
                  }}
                  renderItem={(item) =>
                    dark ? (
                      <PaginationItem
                        {...item}
                        selected
                        style={{ color: "white", borderColor: "white" }}
                        classes={{
                          root: classes.paginationItemRoot,
                        }}
                      />
                    ) : (
                      <PaginationItem {...item} />
                    )
                  }
                  color="default"
                  shape="rounded"
                  variant="outlined"
                  count={pageCount}
                  page={page > pageCount ? 1 : page}
                  onChange={this.handlePageEditClick}
                />
              </Grid>
            )
          : pageCountView > 1 &&
            !fromHome && (
              <Grid
                container
                justify="center"
                //  style={{ padding: "2rem" }}
              >
                <Pagination
                  style={{
                    backgroundColor: dark ? "#000" : "#fff",
                    padding: "0.4rem",
                    borderRadius: "0.3rem",
                  }}
                  renderItem={(item) =>
                    dark ? (
                      <PaginationItem
                        {...item}
                        selected
                        style={{ color: "white", borderColor: "white" }}
                        classes={{
                          root: classes.paginationItemRoot,
                        }}
                      />
                    ) : (
                      <PaginationItem {...item} />
                    )
                  }
                  color="default"
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
          PaperProps={{
            elevation: 0,
            style: {
              backgroundColor: "unset",
              overflow: "hidden",
            },
          }}
        >
          <CardMedia
            className={classes.media}
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
  setGalleriesToSiteView: (galleries) =>
    dispatch(setGalleriesToSiteView(galleries)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GalleryComponent));
