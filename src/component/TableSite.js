import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { getAllSites } from "../actions";
import "./adminStyleSheet.css";

const useStyles = (theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  published: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#5ea95a",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center",
  },
  unpublished: {
    borderRadius: "5px",
    padding: "0.1rem 0.3rem",
    background: "#cc2127",
    marginTop: "0.2rem",
    color: "#fff",
    textAlign: "center",
  },
});

class TableSite extends Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5,
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

  getSites = async () => {
    const { accessToken, userId, sites, getAllSites } = this.props;
    await getAllSites({ accessToken, userId });
    this.setState({
      filteredData: this.props.sites.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      ),
      pageCount: Math.ceil(sites.length / this.state.itemPerPage),
    });
  };

  componentDidMount() {
    this.getSites();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.sites.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  handleSearch = (event) => {
    let searchResult = this.props.sites.filter(function (site) {
      return site.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container alignItems="center" style={{ padding: "0.5rem 0" }}>
          <Grid container item xs={12} alignItems="center">
            <Grid
              item
              xs={4}
              style={{
                padding: "0 0.3rem ",
                color: "rgb(0, 96, 136)",
                fontSize: "24px",
              }}
            >
              Sites
            </Grid>
            <Grid item xs={8} container justify="flex-end">
              <TextField
                label="Search"
                variant="outlined"
                margin="dense"
                onChange={this.handleSearch}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{ color: "rgb(0, 96, 136)" }}
                    >
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          style={{
            padding: "0.5rem",
            color: "white",
            backgroundColor: "rgb(0, 96, 136)",
          }}
        >
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Owner</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Title</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Theme</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Categories</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Path</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Published</p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          this.state.filteredData.map((row, index) => (
            <React.Fragment key={index}>
              <Grid
                container
                direction="row"
                alignItems="center"
                style={{ padding: "0 0.5rem" }}
              >
                <Grid item xs={2}>
                  {row.displayName}
                </Grid>
                <Grid item xs={2}>
                  {row.title}
                </Grid>
                <Grid item xs={2}>
                  {row.theme && row.theme.name}
                </Grid>
                <Grid item xs={2}>
                  {row.categories && row.categories.map((c) => c.name + ", ")}
                </Grid>
                <Grid item xs={2}>
                  {row.sitePath}
                </Grid>
                <Grid
                  container
                  item
                  xs={2}
                  className={"mainFont"}
                  style={{
                    fontSize: "12px",
                    overflow: "hidden",
                    height: "4rem",
                  }}
                  alignItems="center"
                >
                  <Grid
                    item
                    lg={6}
                    sm={8}
                    xs={8}
                    className={
                      row.isPublish ? classes.published : classes.unpublished
                    }
                  >
                    {row.isPublish ? "Published " : "Unpublished "}
                  </Grid>
                </Grid>
              </Grid>
              {/* <Divider /> */}
            </React.Fragment>
          ))
        )}
        {this.state.pageCount > 1 && (
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
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  sites: state.site.adminData,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  getAllSites: (id, accessToken) => dispatch(getAllSites(id, accessToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableSite));
