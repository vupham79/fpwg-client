import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Button,
  Dialog,
  TextField
} from "@material-ui/core";
import Title from "./Title";
import { connect } from "react-redux";
import { getAllThemesAdmin, updateTheme } from "../actions";
import ReactPaginate from "react-paginate";
import SearchIcon from "@material-ui/icons/Search";
import "./adminStyleSheet.css";
import { ChromePicker } from "react-color";
import GoogleFontPicker from "@bit/take2.components.google-font-picker";

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
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 1, // chỉnh số item 1 trang ở đây, ko chỉnh chỗ khac
    showDialog: false,
    selectedItem: {
      id: "0",
      mainColor: "#212121",
      name: "",
      fontBody: "",
      fontTitle: ""
    },
    updateData: {
      id: "0",
      mainColor: "#212121",
      name: "",
      fontBody: "",
      fontTitle: ""
    }
  };

  setOpenDialogue = item => {
    this.setState({
      showDialog: true,
      selectedItem: item,
      updateData: {
        ...this.state.updateData,
        mainColor: item.mainColor,
        fontBody: item.fontBody,
        fontTitle: item.fontTitle,
        name: item.name
      }
    });
  };

  setCloseDialogue = () => {
    this.setState({
      showDialog: false
    });
  };

  handleChangeName = e => {
    this.setState({
      updateData: {
        ...this.state.updateData,
        name: e.target.value
      }
    });
  };

  handleChangeColor = color => {
    this.setState({
      updateData: {
        ...this.state.updateData,
        mainColor: color.hex
      }
    });
  };
  handleChangeFontTitle = font => {
    this.setState({
      updateData: {
        ...this.state.updateData,
        fontTitle: font.family
      }
    });
  };
  handleChangeFontBody = font => {
    this.setState({
      updateData: {
        ...this.state.updateData,
        fontBody: font.family
      }
    });
  };

  handleUpdate = body => {
    const { updateData } = this.state;
    this.props.updateTheme(
      updateData.id,
      updateData.name,
      updateData.fontBody,
      updateData.fontTitle,
      updateData.mainColor
    );
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

  getThemes = async () => {
    const { getAllThemesAdmin } = this.props;
    await getAllThemesAdmin();
    this.setListData(
      this.props.themes.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      )
    );
    this.setPageCount(this.props.themes);
  };

  componentDidMount() {
    this.getThemes();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.themes.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  handleSearch = keyword => {
    let searchResult = this.props.themes.filter(function(theme) {
      return theme.name.toLowerCase().includes(keyword.toLowerCase());
    });
    this.setListData(searchResult.slice(0, this.state.itemPerPage));
    this.setPageCount(searchResult);
  };

  render() {
    const { classes } = this.props;
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
        <Grid container direction="row">
          <Grid item xs={1}>
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
          <Grid item xs={1}>
            <p style={{ fontWeight: "bold" }}></p>
          </Grid>
        </Grid>
        {this.state.filteredData.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No result.</p>
        ) : (
          this.state.filteredData.map((row, index) => (
            <div key={row.id}>
              <Grid container direction="row">
                <Grid item xs={1}>
                  {row.name}
                  <div style={{ height: 20 }} />
                </Grid>
                <Grid item xs={2}>
                  {row.fontBody}
                </Grid>
                <Grid item xs={2}>
                  {row.fontTitle}
                </Grid>
                <Grid container item xs={2}>
                  <Grid item xs={1}>
                    <div
                      style={{ backgroundColor: row.mainColor, height: 18 }}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    {row.mainColor}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  {row.categories.map(c => c.name + ", ")}
                </Grid>
                <Grid item xs={1}>
                  <Button
                    color="primary"
                    onClick={() => this.setOpenDialogue(row)}
                  >
                    Edit
                  </Button>
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
        <Dialog
          open={this.state.showDialog}
          onClose={() => this.setCloseDialogue()}
          maxWidth="sm"
          fullWidth
        >
          <Grid
            container
            xs={12}
            justify="center"
            alignContent="center"
            style={{ padding: 10, overflowY: "scroll" }}
          >
            <Grid item xs={12}>
              <p style={{ textAlign: "left", fontWeight: "bold" }}>Name</p>
            </Grid>

            <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                value={this.state.updateData.name}
                onChange={e => this.handleChangeName(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <p style={{ textAlign: "left", fontWeight: "bold" }}>Font Body</p>
            </Grid>

            <Grid item xs={5}>
              <GoogleFontPicker
                searchable
                buttonColor={"default"}
                buttonVariant={"outlined"}
                defaultFont={this.state.updateData.fontBody}
                onFontSelected={this.handleChangeFontBody}
              />
            </Grid>

            <Grid item xs={12}>
              <p style={{ textAlign: "left", fontWeight: "bold" }}>
                Font Title
              </p>
            </Grid>

            <Grid item xs={5}>
              <GoogleFontPicker
                searchable
                buttonColor={"default"}
                buttonVariant={"outlined"}
                defaultFont={this.state.updateData.fontTitle}
                onFontSelected={this.handleChangeFontTitle}
              />
            </Grid>

            <Grid item xs={12}>
              <p style={{ textAlign: "left", fontWeight: "bold" }}>
                Main color
              </p>
            </Grid>

            <Grid item xs={5}>
              <ChromePicker
                color={this.state.updateData.mainColor}
                onChangeComplete={this.handleChangeColor}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            style={{ postion: "fixed" }}
            onClick={() => this.handleUpdate(this.state.updateData)}
          >
            Update
          </Button>
        </Dialog>
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
    dispatch(getAllThemesAdmin(id, accessToken)),
  updateTheme: (id, name, fontBody, fontTitle, mainColor) =>
    dispatch(updateTheme(id, name, fontBody, fontTitle, mainColor))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableTheme));
