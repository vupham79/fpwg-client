import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  IconButton,
  InputBase,
  Paper
} from "@material-ui/core";
import Title from "./Title";
import PublishButtonAdmin from "./PublishButtonAdmin";
import { connect } from "react-redux";
import { getAllSites } from "../actions";
import ReactPaginate from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({
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

class TableSite extends Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 2 // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
  };


  setListData = listData => {
    this.setState({
      filteredData: listData,
    });
  };

  setPageCount = listData => {
    this.setState({
      pageCount: Math.ceil(listData.length / this.state.itemPerPage)
    });
  };

  getSites = async () => {
    const { accessToken, userId, getAllSites } = this.props;
    await getAllSites({ accessToken, userId });
    this.setListData(this.props.sites.slice(this.state.offset, this.state.itemPerPage + this.state.offset));
    this.setPageCount(this.props.sites);
  };

  componentDidMount() {
    this.getSites();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(this.props.sites.slice(this.state.offset, this.state.itemPerPage + this.state.offset));
    });
  };

  handleSearch = (keyword) => {
    let searchResult = this.props.sites.filter(function (site) {
      return site.title.toLowerCase().includes(keyword.toLowerCase())
    })
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult)
  };

  render() {
    const { classes, sites } = this.props;
    return (
      <React.Fragment>
        <Title>Sites</Title>
        <Paper component="form" className={classes.root}>
          <InputBase
            id="searchBox"
            className={classes.input}
            placeholder="Search by title..."
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
          <Grid item xs={2}><p style={{ fontWeight: 'bold' }}>Owner</p></Grid>
          <Grid item xs={2}><p style={{ fontWeight: 'bold' }}>Title</p></Grid>
          <Grid item xs={2}><p style={{ fontWeight: 'bold' }}>Theme</p></Grid>
          <Grid item xs={4}><p style={{ fontWeight: 'bold' }}>Categories</p></Grid>
          <Grid item xs={2}><p style={{ fontWeight: 'bold' }}>Published</p></Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
            this.state.filteredData.map((row, index) => (
              <div key={row.id}>
                <Grid container direction="row">
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>{row.title}</Grid>
                  <Grid item xs={2}>{row.theme.name}</Grid>
                  <Grid item xs={4}>{row.categories.map(c => (c.name + ', '))}</Grid>
                  <Grid item xs={2}>
                    <PublishButtonAdmin
                      siteId={row.id}
                      siteName={row.title}
                      isPublish={row.isPublish}
                    />
                  </Grid>
                </Grid>
                <Divider />
              </div>
            )))}

        <div className="commentBox">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sites: state.site.adminData,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  getAllSites: (id, accessToken) => dispatch(getAllSites(id, accessToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableSite));
