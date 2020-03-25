import { Container, Dialog, Grid, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import { getDataByPageNumber, setGalleriesToSiteView } from "../../actions";
import ReactPaginate from "react-paginate";

const useStyles = theme => ({
  root: {
    margin: theme.spacing(10)
  },
  gridItems: {
    maxHeight: 250
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

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

  handlePageViewClick = async (event, value) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setGalleriesToSiteView
    } = this.props;
    if (!isEdit) {
      this.setState({ pageView: value });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "gallery",
        pageNumber: value
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

  render() {
    const { classes, galleries, pageCountView, isEdit } = this.props;
    return (
      <React.Fragment>
        <Container className={classes.root}>
          <Grid container spacing={1} justify="center">
            {isEdit
              ? this.state.filteredData.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={4}
                    md={3}
                    className={classes.gridItems}
                  >
                    <img
                      src={item.url && item.url}
                      alt="Title"
                      style={imgStyles}
                      onClick={() => this.handleOpenDialog(item.url)}
                      aria-labelledby="form-dialog-title"
                    />
                  </Grid>
                ))
              : galleries.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    xs={6}
                    sm={4}
                    md={3}
                    className={classes.gridItems}
                  >
                    <img
                      src={item._id && item._id.url}
                      alt="Title"
                      style={imgStyles}
                      onClick={() =>
                        this.handleOpenDialog(item._id && item._id.url)
                      }
                      aria-labelledby="form-dialog-title"
                    />
                  </Grid>
                ))}
          </Grid>
          {isEdit
            ? this.state.pageCount > 1 && (
                <Grid container justify="center" style={{ paddingTop: "2rem" }}>
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
            : pageCountView > 1 && (
                <Grid container justify="center" style={{ marginTop: "5rem" }}>
                  <Pagination
                    color="primary"
                    shape="rounded"
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
            <img style={imgStyles} src={this.state.img} alt="" />
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  pageCountView: state.post.pageCountGalleriesView
});

const mapDispatchToProps = dispatch => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setGalleriesToSiteView: galleries =>
    dispatch(setGalleriesToSiteView(galleries))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GalleryComponent));
