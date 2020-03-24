import { Container, Dialog, Grid, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import {
  getDataByPageNumber,
  setGalleriesToSiteEdit,
  setGalleriesToSiteView
} from "../../actions";

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
    pageEdit: 1,
    pageView: 1
  };

  handlePageClick = async (event, value) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setGalleriesToSiteEdit,
      setGalleriesToSiteView
    } = this.props;
    if (isEdit) {
      this.setState({ pageEdit: value });
      const data = await getDataByPageNumber({
        siteId: siteInfo,
        page: "gallery",
        pageNumber: value
      });
      data && setGalleriesToSiteEdit(data);
    } else {
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
  render() {
    const {
      classes,
      galleries,
      pageCountEdit,
      pageCountView,
      isEdit
    } = this.props;
    return (
      <React.Fragment>
        <Container className={classes.root}>
          <Grid container spacing={1} justify="center">
            {galleries.map((item, index) => (
              <Grid
                item
                key={index}
                xs={6}
                sm={4}
                md={3}
                className={classes.gridItems}
              >
                <img
                  src={item._id.url}
                  alt="Title"
                  style={imgStyles}
                  onClick={() => this.handleOpenDialog(item._id.url)}
                  aria-labelledby="form-dialog-title"
                />
              </Grid>
            ))}
          </Grid>
          {isEdit
            ? pageCountEdit > 1 && (
                <Grid container justify="center" style={{ marginTop: "5rem" }}>
                  <Pagination
                    color="primary"
                    shape="rounded"
                    count={pageCountEdit}
                    page={this.state.pageEdit}
                    onChange={this.handlePageClick}
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
                    onChange={this.handlePageClick}
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
  pageCountEdit: state.post.pageCountGalleriesEdit,
  pageCountView: state.post.pageCountGalleriesView
});

const mapDispatchToProps = dispatch => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setGalleriesToSiteEdit: galleries =>
    dispatch(setGalleriesToSiteEdit(galleries)),
  setGalleriesToSiteView: galleries =>
    dispatch(setGalleriesToSiteView(galleries))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GalleryComponent));
