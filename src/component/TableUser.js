import { Divider, Grid, IconButton, InputBase, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { getAllUsers } from "../actions";
import ActivateButton from "./ActivateButton";
import Title from "./Title";

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

class TableUser extends Component {
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

  getUsers = async () => {
    const { accessToken, userId, getAllUsers } = this.props;
    await getAllUsers({ userId, accessToken });
    this.setListData(
      this.props.users.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(this.props.users);
  };

  componentDidMount() {
    this.getUsers();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.users.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  handleSearch = keyword => {
    let searchResult = this.props.users.filter(function (user) {
      return user.displayName.toLowerCase().includes(keyword.toLowerCase());
    });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  render() {
    const { classes, users } = this.props;

    return (
      <React.Fragment>
        <Title>Users</Title>
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
          <Grid item xs={1}>
            <p style={{ fontWeight: "bold" }}>Picture</p>
          </Grid>
          <Grid item xs={3}>
            <p style={{ fontWeight: "bold" }}>Display Name</p>
          </Grid>
          <Grid item xs={3}>
            <p style={{ fontWeight: "bold" }}>Email</p>
          </Grid>
          <Grid item xs={3}>
            <p style={{ fontWeight: "bold" }}>Phone</p>
          </Grid>
          <Grid item xs={2}>
            <p style={{ fontWeight: "bold" }}>Activation</p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
            this.state.filteredData.map((row, index) => (
              <div key={row.id}>
                <Grid container direction="row">
                  <Grid item xs={1}>
                    <img
                      style={{ height: 30, width: 30 }}
                      src={row.picture}
                      alt=""
                    />
                  </Grid>
                  <Grid item xs={3}>
                    {row.displayName}
                  </Grid>
                  <Grid item xs={3}>
                    {row.email}
                  </Grid>
                  <Grid item xs={3}>
                    {row.phone}
                  </Grid>
                  <Grid item xs={2}>
                    <ActivateButton
                      userId={row.id}
                      isActivated={row.isActivated}
                    />
                  </Grid>
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
  users: state.user.users,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: (id, accessToken) => dispatch(getAllUsers(id, accessToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableUser));
