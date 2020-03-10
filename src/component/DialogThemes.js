import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";
import { Close as CloseIcon, ArrowDropDown } from "@material-ui/icons";
import { connect } from "react-redux";
import { changeTheme } from "../actions";
const useStyles = theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#434d58"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class DialogThemes extends Component {
  state = {
    open: false,
    id: null,
    name: ""
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleSave = () => {
    this.handleChangeTheme();
    this.handleClose();
  };
  handleChangeTheme = () => {
    const { changeTheme, themes, site } = this.props;
    const theme = themes.find(e => e.id === this.state.id);
    site.theme = theme;
    changeTheme(site);
  };
  handleSelect = (id, name) => {
    this.setState({
      id: id,
      name: name
    });
  };
  render() {
    const { classes, site, themes } = this.props;
    const { open } = this.state;
    return (
      <>
        <Button
          variant="outlined"
          fullWidth
          onClick={this.handleOpen}
          endIcon={<ArrowDropDown />}
        >
          {site && site.theme.name}
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Themes
              </Typography>
              <Typography variant="h6" className={classes.title}>
                {this.state.name}
              </Typography>
              <Button variant={"contained"} onClick={this.handleSave}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container style={{ padding: "1.5rem" }}>
            {themes.map((theme, i) => {
              return (
                <Grid key={i} item style={{ margin: "1.5rem" }} sm={3}>
                  <Card
                    className={classes.root}
                    onClick={() => this.handleSelect(theme.id, theme.name)}
                    variant={"outlined"}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="300"
                        image={theme.previewImage}
                        title="preview"
                      />
                      <CardContent>
                        <Typography
                          align={"center"}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {theme.name}
                        </Typography>
                        <Grid container>
                          <Grid item container justify={"space-around"}>
                            <Grid item>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Font-family:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {theme.fontTitle} - {theme.fontBody}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item container justify={"space-around"}>
                            <Grid item>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                Color:
                              </Typography>
                            </Grid>
                            <Grid item>
                              <div
                                style={{
                                  height: "1rem",
                                  width: "5rem",
                                  backgroundColor: theme.mainColor
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  site: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({
  changeTheme: site => dispatch(changeTheme(site))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(DialogThemes));
