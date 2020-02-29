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
import { getAllThemesAdmin } from "../actions";
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

class TableTheme extends Component {
  state = {
    filteredData: []
  };

  setListData = searchData => {
    this.setState({
      filteredData: searchData
    });
  };

  getThemes = async () => {
    const { getAllThemesAdmin } = this.props;
    await getAllThemesAdmin();
  };

  componentDidMount() {
    this.getThemes();
    this.setListData(this.props.themes);
  }

  handleSearch = keyword => {
    this.setListData(
      this.props.themes.filter(function(theme) {
        return theme.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      })
    );
  };

  render() {
    const { classes, themes } = this.props;
    return (
      <React.Fragment>
        <Title>Themes</Title>
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
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>Name</p>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>F.Body</p>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>F.Title</p>
                </Grid>
                <Grid item xs={2}>
                  <p style={{ fontWeight: "bold" }}>Main Color</p>
                </Grid>
                <Grid item xs={4}>
                  <p style={{ fontWeight: "bold" }}>Categories</p>
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
                        <Grid item xs={2}>{row.name}<div style={{ height: 20 }} /></Grid>
                        <Grid item xs={2}>{row.fontBody}</Grid>
                        <Grid item xs={2}>{row.fontTitle}</Grid>
                        <Grid item xs={2}>{row.mainColor}</Grid>
                        <Grid item xs={4}>{row.categories.map(c => (c.name + ', '))}</Grid>
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
  themes: state.theme.data,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  getAllThemesAdmin: (id, accessToken) =>
    dispatch(getAllThemesAdmin(id, accessToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableTheme));
