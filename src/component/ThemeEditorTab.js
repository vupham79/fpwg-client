import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { changeTheme } from "../actions";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";

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
    id: this.props.site.theme.id,
  };

  handleChangeTheme = (selectId) => {
    const { changeTheme, themes, site } = this.props;
    const theme = themes.find(e => e.id === selectId);
    site.theme = theme;
    this.setState({
      id: selectId,
    });
    changeTheme(site);
  };

  render() {
    const {
      themes
    } = this.props;
    const { id } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <Grid
          container
          style={{
            color: "#555d66",
            textAlign: "left",
            fontStyle: "italic",
            fontFamily: "Segoe UI, sans-serif",
            marginTop: "1rem",
            marginBottom: "2rem",
            fontSize: 14
          }}
        >
          Pick a theme for your site.
          </Grid>

        <Grid container direction="column">
          {themes.map((theme, i) => {
            return (
              <Grid key={i} item sm={12} style={{ marginBottom: "1rem" }}>
                <Card
                  onClick={() => this.handleChangeTheme(theme.id)}
                  variant={"outlined"}
                  style={{
                    border: theme.id === id ? "0.2rem solid #0074aa" : ""
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
                    <CardContent>
                      <Typography
                        align={"center"}
                        variant="subtitle2"
                        component="h2"
                      >
                        {theme.name}
                      </Typography>
                    </CardContent>
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
  titleEdit: state.site.titleEdit,
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(ThemeEditorTab));