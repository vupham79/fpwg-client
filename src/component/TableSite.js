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
import PublishButtonAdmin from "./PublishButtonAdmin";
import { connect } from "react-redux";
import { getAllSites } from "../actions";
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

class TableSite extends Component {
  state = {
    filteredData: []
  };

  setListData = searchData => {
    this.setState({
      filteredData: searchData
    });
  };

  getSites = async () => {
    const { accessToken, userId, getAllSites } = this.props;
    await getAllSites({ accessToken, userId });
  };

  componentDidMount() {
    this.getSites();
    this.setListData(this.props.sites);
  }

  handleSearch = keyword => {
    this.setListData(
      this.props.sites.filter(function(site) {
        return site.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      })
    );
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
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          <Table size="small">
            <TableHead>
              <Grid container direction="row">
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>Owner</p>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>Title</p>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>Theme</p>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontWeight: "bold" }}>Categories</p>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>Published</p>
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
