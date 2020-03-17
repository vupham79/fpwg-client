import { Container, Dialog, Grid, withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { closeDialog, openDialog } from "../../actions";
import ReactPaginate from "react-paginate";

const useStyles = theme => ({
  root: {
    margin: theme.spacing(10)
  },
  gridItems: {
    maxHeight: 350
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
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 8,
    img: "",
    open: false
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

  getGalleries = async () => {
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
    this.getGalleries();
  }

  handlePageClick = data => {
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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const handleOpenDialog = image => {
      this.setState({ img: image, open: true });
    };
    const {
      classes,
      open,
      openDialog,
      closeDialog,
      galleries,
      bodyEdit,
      bodyView,
      isEdit
    } = this.props;
    return (
      <React.Fragment>
        <Container className={classes.root}>
          <Grid container spacing={1} justify="center">
            {galleries ? (
              this.state.filteredData.map((item, index) => (
                <Grid
                  item
                  key={index}
                  xs={6}
                  sm={3}
                  md={3}
                  className={classes.gridItems}
                >
                  <img
                    src={item.url}
                    alt="Title"
                    style={imgStyles}
                    onClick={() => handleOpenDialog(item.url)}
                    aria-labelledby="form-dialog-title"
                  />
                </Grid>
              ))
            ) : (
              <p style={{ fontFamily: isEdit ? bodyEdit : bodyView }}>
                Current no image to show .
              </p>
            )}
          </Grid>
          <Grid container justify="center" style={{ marginTop: "5rem" }}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
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
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  isEdit: state.site.isEdit
});

export default connect(
  mapStateToProps,
  null
)(withStyles(useStyles)(GalleryComponent));
