import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { changeTheme, updateNavItemValue } from "../actions";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";
import CategoryPicker from "./CategoryPicker";

const useStyles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 90
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: "bold"
  },
  title2: {
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    fontSize: 12
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  sideBarBox: {
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2e2a",
    padding: "1rem"
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#434d58 !important",
    color: "#434d58 !important"
  },
  focused: {
    borderWidth: "1px",
    borderColor: "#434d58 !important",
    color: "#434d58 !important"
  },
  pickerButton: {
    margin: 0
  }
});

class ThemeEditorTab extends React.Component {
  state = {
    id: this.props.site.theme._id,
    currentCategory: "All",
    filteredData: []
  };

  componentDidMount() {
    this.setState({
      filteredData: this.props.themes
    });
  }

  handleChangeCategory = category => {
    this.setState({
      currentCategory: category
    });
    if (category === "All") {
      this.setState({
        filteredData: this.props.themes
      });
    } else {
      this.setState({
        filteredData: this.props.themes.filter(function(theme) {
          return theme.category === category;
        })
      });
    }
  };

  handleChangeTheme = selectId => {
    const { changeTheme, themes, site, updateNavItemValue } = this.props;
    const theme = themes.find(e => e._id === selectId);
    console.log(theme);
    // site.theme = theme;
    // site.color = theme.mainColor;
    this.setState({
      id: selectId
    });
    changeTheme(theme);

    //go to home tab of new theme
    let searchResult = site.navItems.filter(function(nav) {
      return nav.original === "home";
    });
    if (searchResult) {
      updateNavItemValue(searchResult[0].order - 1);
    }
  };

  render() {
    const { filteredData } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <Grid
          container
          style={{
            color: "#555d66",
            textAlign: "left",
            fontStyle: "italic",
            fontFamily: "Segoe UI, sans-serif",
            fontSize: 14
          }}
        >
          Find a category that suits your business.
        </Grid>

        <Grid container style={{ marginBottom: "3rem", marginTop: "0.5rem" }}>
          <CategoryPicker
            selectedValue={this.state.currentCategory}
            onChange={this.handleChangeCategory}
          />
        </Grid>

        <Grid
          container
          style={{
            color: "#555d66",
            textAlign: "left",
            fontStyle: "italic",
            fontFamily: "Segoe UI, sans-serif",
            marginBottom: "2rem",
            fontSize: 14
          }}
        >
          Pick a theme.
        </Grid>

        <Grid container direction="column">
          {filteredData.map((theme, i) => {
            return (
              <Grid key={i} item sm={12} style={{ marginBottom: "1rem" }}>
                <Card
                  onClick={() => this.handleChangeTheme(theme._id)}
                  variant={"outlined"}
                  style={{
                    border:
                      theme._id === this.props.site.theme._id
                        ? "0.2rem solid #0074aa"
                        : ""
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="150"
                      image={theme.previewImage}
                      title="preview"
                    />
                    {/* <CardContent>
                      <Typography
                        align={"center"}
                        variant="subtitle2"
                        component="h2"
                      >
                        {theme.name}
                      </Typography>
                    </CardContent> */}
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  isShow: state.theme.isShow,
  site: state.site.siteEdit,
  titleEdit: state.site.titleEdit
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site)),
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThemeEditorTab));
