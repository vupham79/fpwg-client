import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TableBody,
  TableHead,
  Table,
  Grid,
  Divider,
  IconButton,
  InputBase,
  Paper
} from "@material-ui/core";
import Title from "./Title";
import { connect } from "react-redux";
import ActivateButton from "./ActivateButton";
import { getAllUsers } from "../actions";
// import PaginationList from 'react-pagination-list';
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

class TableUser extends Component {
  state = {
    filteredData: []
  };

  setListData = searchData => {
    this.setState({
      filteredData: searchData
    });
  };

  getUsers = async () => {
    const { accessToken, userId, getAllUsers } = this.props;
    await getAllUsers({ userId, accessToken });
  };

  componentDidMount() {
    this.getUsers();
    this.setListData(this.props.users);
  }

  handleSearch = keyword => {
    this.setListData(
      this.props.users.filter(function(user) {
        return (
          user.displayName.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        );
      })
    );
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
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          <Table size="small">
            <TableHead>
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
            </TableHead>
            <TableBody>
              {/* <PaginationList
                data={this.state.filteredData}
                pageSize={5}
                renderItem={(row, key) => (
                  <div>
                    <Grid container direction="row" key={row.id}>
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
                )}
              /> */}
            </TableBody>
          </Table>
        )}
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
