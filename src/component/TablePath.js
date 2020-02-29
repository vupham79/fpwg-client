import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Divider, IconButton, InputBase, Paper } from "@material-ui/core";
import Title from "./Title";
import { connect } from "react-redux";
import { getAllPaths } from "../actions";
import ReactPaginate from "react-paginate";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
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

class TablePath extends Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 2 // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
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

  getPaths = async () => {
    const { getAllPaths } = this.props;
    await getAllPaths();
  };

  componentDidMount() {
    this.getPaths();
    this.setListData(
      this.props.paths.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(this.props.paths);
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.paths.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  handleSearch = keyword => {
    let searchResult = this.props.paths.filter(function(user) {
      return user.pathName.toLowerCase().includes(keyword.toLowerCase());
    });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  render() {
    const { classes, paths } = this.props;
    return (
      <React.Fragment>
        <Title>Paths</Title>
        <Paper component="form" className={classes.root}>
          <InputBase
            id="searchBox"
            className={classes.input}
            placeholder="Search by name..."
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
        <Grid container direction="row">
          <Grid item xs={3}>
            <p style={{ fontWeight: "bold" }}>Path Name</p>
          </Grid>
          <Grid item xs={3}>
            <p style={{ fontWeight: "bold" }}>Site</p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          this.state.filteredData.map((row, index) => (
            <div key={row.id}>
              <Grid container direction="row">
                <Grid item xs={3}>
                  {row.pathName}
                  <div style={{ height: 20 }} />
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <Divider />
            </div>
          ))
        )}
        <div className="commentBox">
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
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  paths: state.path.data,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  getAllPaths: () => dispatch(getAllPaths())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TablePath));
