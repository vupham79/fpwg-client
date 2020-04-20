import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  publishSite,
  setCurrentEditId,
  unPublishSite,
  setPostView,
} from "../../actions";
import ButtonStyled from "../../component/Button";
import Header from "../../component/Header";
import Link from "../../component/link";
import { themes as themesConstant } from "../../constant/constant";
import DesignTab from "./design";
require("dotenv").config();

const useStyle = (theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: "11vh",
      bottom: 0,
    },
  },
  sites: {
    backgroundColor: "rgb(222,228,231, 0.1)",
    minHeight: "40vh",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 0,
      top: 0,
      left: 0,
    },
  },
  view: {
    minHeight: "50vh",
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 0,
      top: 0,
      right: 0,
      overflow: "auto",
    },
  },
  toolEdit: {
    height: "10vh",
    position: "sticky",
  },
  img: {
    width: "100%",
  },
  h4: {
    textAlign: "center",
    padding: "2rem 1rem",
  },
  textField: {
    overflow: "hidden",
    // borderRadius: 4,
    backgroundColor: "#fcfcfb",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
      // borderColor: "rgba(81,152,217,.7)"
    },
    "&$focused": {
      backgroundColor: "#fff",
      borderColor: "black !important",
      // boxShadow: `${fade(rgba(81, 152, 217, 0.7), 0.25)} 0 0 0 2px`
    },
  },
});

const siteStyle = makeStyles((theme) => ({
  h4: {
    textAlign: "center",
    padding: "1rem",
  },
  body1: {
    textAlign: "center",
  },
  button: {
    padding: "2rem",
  },
  img: {
    width: "100%",
  },
}));

function EmptyListSite() {
  const style = siteStyle();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={3} sm={2} md={1}>
        <img src={"/images/FPWGlogo.png"} alt="" className={style.img} />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h4" className={style.h4}>
            You don't have any FPWG sites yet.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
class MainPage extends Component {
  renderViewPage = (siteEdit) => {
    if (siteEdit) {
      const theme = siteEdit
        ? themesConstant.find((e) => e.id === siteEdit.theme._id)
        : null;
      return theme && theme.component;
    }
    return <></>;
  };

  copyToClipboard = (e) => {
    var textField = document.getElementById("txtSitePath");
    textField.innerText = e.target.value;
    textField.select();
    document.execCommand("copy");
  };

  render() {
    const {
      sites,
      classes,
      siteEdit,
      publishSite,
      unPublishSite,
      user,
    } = this.props;
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
            style={{
              backgroundImage: `url('/images/dark_background.jpg')`,
              backgroundSize: "cover",
            }}
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
                            fontSize: "14px",
                          },
                        }}
                        fullWidth
                        variant={"outlined"}
                        value={
                          process.env.REACT_APP_HOST
                            ? `${process.env.REACT_APP_HOST}${siteEdit.sitePath}`
                            : `http://localhost:3000/${siteEdit.sitePath}`
                        }
                        InputProps={{
                          endAdornment: (
                            <Button
                              className={"mainFont"}
                              onClick={(e) => this.copyToClipboard(e)}
                              position="end"
                            >
                              Copy
                            </Button>
                          ),
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
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              this.props.setPostView(null);
                              this.props.setCurrentEditId(siteEdit.id);
                            }}
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
                                fontWeight: "bold",
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
                                  fontWeight: "600",
                                }
                              : {
                                  backgroundColor: "#5ea95a",
                                  color: "#fff",
                                  fontWeight: "600",
                                }
                          }
                          onClick={() =>
                            siteEdit.isPublish
                              ? unPublishSite({
                                  siteId: siteEdit.id,
                                  siteName: siteEdit.title,
                                })
                              : publishSite({
                                  siteId: siteEdit.id,
                                  siteName: siteEdit.title,
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
                  <Grid item xs={3} sm={2} md={2}>
                    <img
                      src={"/images/FPWGlogo.png"}
                      alt=""
                      className={classes.img}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      // variant="h5"
                      className={classes.h4}
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: "400",
                      }}
                    >
                      Hello, {user.name} !
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

const mapStateToProps = (state) => ({
  sites: state.site.data,
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  user: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentEditId: (id) => dispatch(setCurrentEditId(id)),
  publishSite: ({ siteId, siteName }) =>
    dispatch(publishSite({ siteId, siteName })),
  unPublishSite: ({ siteId, siteName }) =>
    dispatch(unPublishSite({ siteId, siteName })),
  setPostView: (post) => dispatch(setPostView(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(MainPage));
