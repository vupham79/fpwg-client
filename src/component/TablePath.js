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
import { getAllPaths } from "../actions";
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

class TablePath extends Component {
  state = {
    filteredData: []
  };

  setListData = searchData => {
    this.setState({
      filteredData: searchData
    });
  };

  getPaths = async () => {
    const { getAllPaths } = this.props;
    await getAllPaths();
  };

  componentDidMount() {
    this.getPaths();
    this.setListData(this.props.paths);
  }

  handleSearch = keyword => {
    this.setListData(
      this.props.paths.filter(function(path) {
        return path.pathName.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      })
    );
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
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          <Table size="small">
            <TableHead>
              <Grid container direction="row">
                <Grid item xs={3}>
                  <p style={{ fontWeight: "bold" }}>Path Name</p>
                </Grid>
                <Grid item xs={3}>
                  <p style={{ fontWeight: "bold" }}>Site</p>
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
                        <Grid item xs={3}>{row.pathName}<div style={{ height: 20 }} /></Grid>
                        <Grid item xs={3}></Grid>
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
