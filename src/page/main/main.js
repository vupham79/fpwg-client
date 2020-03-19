import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import { fade, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setEditOff, setCurrentEditId } from "../../actions";
import Header from "../../component/Header";
import { themes as themesConstant } from "../../constant/constant";
import imgUrl from "../../FBWGLogo.png";
import DesignTab from "./design";
import Link from "../../component/link";

const useStyle = theme => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      marginTop: "9vh",
      bottom: 0,
      top: 0
    }
  },
  sites: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 0,
      top: 0,
      left: 0
    }
  },
  view: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 0,
      top: 0,
      right: 0,
      overflow: "auto"
    }
  },
  toolEdit: {
    height: "10vh",
    position: "sticky"
  },
  img: {
    width: "100%"
  },
  h4: {
    textAlign: "center",
    padding: "2rem 1rem"
  },
  textField: {
    overflow: "hidden",
    // borderRadius: 4,
    backgroundColor: "#fcfcfb",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
      // borderColor: "rgba(81,152,217,.7)"
    },
    "&$focused": {
      backgroundColor: "#fff",
      borderColor: "black !important"
      // boxShadow: `${fade(rgba(81, 152, 217, 0.7), 0.25)} 0 0 0 2px`
    }
  }
});

const siteStyle = makeStyles(theme => ({
  h4: {
    textAlign: "center",
    padding: "1rem"
  },
  body1: {
    textAlign: "center"
  },
  button: {
    padding: "2rem"
  },
  img: {
    width: "100%"
  }
}));

function EmptyListSite() {
  const style = siteStyle();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={3} sm={2} md={1}>
        <img src={imgUrl} alt="" className={style.img} />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4" className={style.h4}>
            You don't have any FBWG sites yet.
          </Typography>
        </Grid>
        <Grid item xs={12} className={style.body1}>
          <Typography variant="body1">Would you like to start one?</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        item
        xs={10}
        sm={6}
        className={style.button}
      >
        <Grid item xs={10} container justify="center">
          <Button variant="contained" color="primary">
            Create New
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
class MainPage extends Component {
  renderViewPage = siteEdit => {
    if (siteEdit) {
      const theme = siteEdit
        ? themesConstant.find(e => e.id === siteEdit.theme.id)
        : null;
      return theme && theme.component;
    }
    return <></>;
  };

  copyToClipboard = e => {
    var textField = document.getElementById("txtSitePath");
    textField.innerText = e.target.value;
    textField.select();
    document.execCommand("copy");
  };

  render() {
    const { sites, classes, siteEdit } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        {sites && sites.length === 0 ? (
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            className={classes.root}
          >
            <EmptyListSite />
          </Grid>
        ) : (
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            className={classes.root}
          >
            <Grid container item xs={12} sm={2} className={classes.sites}>
              <DesignTab />
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={10}
              alignItems="center"
              className={classes.view}
            >
              {siteEdit && this.props.isEdit ? (
                <>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    item
                    xs={12}
                    className={classes.toolEdit}
                  >
                    <Grid item xs={5} sm={7} md={7}>
                      <TextField
                        id="txtSitePath"
                        className={`"mainFont" ${classes.textField}`}
                        inputProps={{
                          style: {
                            readOnly: true,
                            padding: "0.5rem",
                            textAlign: "center",
                            fontFamily: "Segoe UI",
                            fontSize: "14px"
                          }
                        }}
                        fullWidth
                        variant={"outlined"}
                        value={"http://localhost:3000/" + siteEdit.sitePath}
                        InputProps={{
                          classes: classes.textField,
                          endAdornment: (
                            <Button
                              className={"mainFont"}
                              onClick={e => this.copyToClipboard(e)}
                              position="end"
                            >
                              Copy
                            </Button>
                          )
                        }}
                      />
                    </Grid>
                    <Grid container item xs={6} sm={5} md={3} justify="center">
                      <Grid item xs={5} sm={4} md={4}>
                        <Link to="/edit">
                          <Button
                            color="primary"
                            className={"mainFont"}
                            variant={"outlined"}
                            onClick={() =>
                              this.props.setCurrentEditId(siteEdit.id)
                            }
                          >
                            Edit
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={5} sm={4} md={4}>
                        {siteEdit.isPublish ? (
                          <a
                            href={`/${siteEdit.sitePath}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              color="secondary"
                              className={"mainFont"}
                              disabled={!siteEdit.isPublish}
                              variant="contained"
                            >
                              Visit
                            </Button>
                          </a>
                        ) : (
                          <Button
                            className={"mainFont"}
                            disabled={!siteEdit.isPublish}
                            variant={"outlined"}
                          >
                            Visit
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={5} sm={4} md={4}>
                        <Link to="/edit">
                          <Button
                            color="primary"
                            className={"mainFont"}
                            variant={"outlined"}
                            onClick={() =>
                              this.props.setCurrentEditId(siteEdit.id)
                            }
                          >
                            Edit
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {this.renderViewPage(siteEdit)}
                  </Grid>
                </>
              ) : (
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={3} sm={2} md={1}>
                    <img src={imgUrl} alt="" className={classes.img} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" className={classes.h4}>
                      Select the site you want to view.
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  sites: state.site.data,
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  setEditOff: () => dispatch(setEditOff()),
  setCurrentEditId: id => dispatch(setCurrentEditId(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(MainPage));
