import { Divider, Grid, InputAdornment, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { getAllUsers } from "../actions";
import ActivateButton from "./ActivateButton";
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
});

class TableUser extends Component {
  state = {
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5, // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
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

  getUsers = async () => {
    const { getAllUsers, users } = this.props;
    await getAllUsers();
    this.setState({
      filteredData: this.props.users.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      ),
      pageCount: Math.ceil(users.length / this.state.itemPerPage),
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  handlePageClick = (data) => {
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

  handleSearch = (event) => {
    let searchResult = this.props.users.filter(function (user) {
      return user.displayName
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
              Users
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
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1}>
                  <img style={{ width: "3rem" }} src={row.picture} alt="" />
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
  users: state.user.users,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: (id, accessToken) => dispatch(getAllUsers(id, accessToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableUser));
