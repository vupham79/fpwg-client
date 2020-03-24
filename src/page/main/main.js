import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { publishSite, setCurrentEditId, unPublishSite } from "../../actions";
import ButtonStyled from "../../component/Button";
import Header from "../../component/Header";
import Link from "../../component/link";
import { themes as themesConstant } from "../../constant/constant";
import imgUrl from "../../FBWGLogo.png";
import DesignTab from "./design";

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
        {/* <Grid item xs={12} className={style.body1}>
          <Typography variant="body1">Would you like to start one?</Typography>
        </Grid> */}
      </Grid>
      {/* <Grid
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
      </Grid> */}
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
    const { sites, classes, siteEdit, publishSite, unPublishSite } = this.props;
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
                    justify="flex-end"
                    item
                    xs={12}
                    className={classes.toolEdit}
                  >
                    <Grid item xs={4} sm={7} md={6}>
                      <TextField
                        id="txtSitePath"
                        className={`mainFont ${classes.textField}`}
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
                    <Grid
                      container
                      item
                      xs={6}
                      sm={5}
                      md={3}
                      spacing={1}
                      justify="flex-end"
                    >
                      <Grid item>
                        <Link to="/edit">
                          <ButtonStyled
                            style={{
                              borderColor: "rgb(0, 96, 136)",
                              color: "rgb(0, 96, 136)",
                              fontWeight: "bold"
                            }}
                            onClick={() =>
                              this.props.setCurrentEditId(siteEdit.id)
                            }
                            label="Edit"
                          />
                        </Link>
                      </Grid>
                      <Grid item>
                        {siteEdit.isPublish ? (
                          <a
                            href={`/${siteEdit.sitePath}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                          >
                            <ButtonStyled
                              style={{
                                borderColor: "rgb(0, 96, 136)",
                                color: "rgb(0, 96, 136)",
                                fontWeight: "bold"
                              }}
                              label="Visit"
                            />
                          </a>
                        ) : (
                          <ButtonStyled
                            style={{ color: "rgb(195, 196, 199)" }}
                            disabled={!siteEdit.isPublish}
                            label="Visit"
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <ButtonStyled
                          style={
                            siteEdit.isPublish
                              ? {
                                  backgroundColor: "#cc2127",
                                  color: "#fff",
                                  fontWeight: "600"
                                }
                              : {
                                  backgroundColor: "#5ea95a",
                                  color: "#fff",
                                  fontWeight: "600"
                                }
                          }
                          onClick={() =>
                            siteEdit.isPublish
                              ? unPublishSite({
                                  siteId: siteEdit.id,
                                  siteName: siteEdit.title
                                })
                              : publishSite({
                                  siteId: siteEdit.id,
                                  siteName: siteEdit.title
                                })
                          }
                          label={`${
                            siteEdit.isPublish
                              ? "Unpublish Site"
                              : "Publish Site"
                          }`}
                        />
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
  setCurrentEditId: id => dispatch(setCurrentEditId(id)),
  publishSite: ({ siteId, siteName }) =>
    dispatch(publishSite({ siteId, siteName })),
  unPublishSite: ({ siteId, siteName }) =>
    dispatch(unPublishSite({ siteId, siteName }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(MainPage));
