import {
  Button,
  CardMedia,
  Divider,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import moment from "moment";
import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  faChevronCircleDown,
  // faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getDataByPageNumber,
  setPostView,
  updateNavItemValue,
  setPostsToSiteViewOnePage,
} from "../../../actions";
import ButtonComponent from "../../../component/Button";

const useStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  images: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "-webkit-fill-available",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  cardView: {
    height: "30vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  cardMediaAlbum: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  cardMedia: {
    height: "30vh",
    backgroundColor: "red",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  cardAlbum: {
    paddingTop: "60%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  album: {
    height: "30vh",
    background: "rgba(24, 20, 20, 0.5)",
  },
  paginationItemSelected: {
    backgroundColor: "#FFFFFF !important",
    color: "#121212 !important",
  },
  showMore: {
    marginTop: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const gridContent = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "4",
  WebkitBoxOrient: "vertical",
  whiteSpace: "pre-wrap",
};

const gridMessage = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "20",
  WebkitBoxOrient: "vertical",
  // height: "100%",
  whiteSpace: "pre-wrap",
};

function renderFB() {
  let cropImgFile = new Promise(async (resolve, reject) => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    setTimeout(() => {
      if (window.FB) {
        window.FB.XFBML.parse();
        resolve(true);
      }
    }, 1000);
  });
}

class NewsType extends React.Component {
  state = {
    open: false,
    postOpen: this.props.postView && this.props.postView,
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitNews
      : this.props.siteView.limitNews,
    page: 1,
    count: this.props.isEdit
      ? this.props.siteEdit.limitNews
      : this.props.siteView.limitNews,
  };

  componentDidMount() {
    renderFB();
    // const script = document.createElement("script");
    // script.defer = true;
    // script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=742131839643879&autoLogAppEvents=1";
    // script.async = true;
    // script.crossOrigin = "anonymous";
    // document.getElementById("fb-root").appendChild(script);
    // window.FB.XFBML.parse();
  }

  handleOpen = (post) => {
    renderFB();
    this.setState({
      postOpen: post,
    });
    document
      .getElementById("topView")
      .scrollIntoView({ block: "start", behavior: "smooth" });
  };

  handleHomeClick = (post) => {
    renderFB();
    const { siteView, setPostView, isEdit } = this.props;
    if (isEdit) {
      setPostView(post);
    } else {
      setPostView(post);
      this.props.history.push(`/${siteView.sitePath}/news`);
    }
    document.getElementById("topView") &&
      document
        .getElementById("topView")
        .scrollIntoView({ block: "start", behavior: "smooth" });
  };

  renderPostComponent(index, post, style, dark, type, showPostMode) {
    const {
      fromHome,
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
    } = this.props;
    const { classes } = this.props;
    const txtStyle = {
      fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
      fontSize: "14px",
    };
    const titleStyle = {
      fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
      fontSize: "14px",
    };
    const btnStyle = {
      padding: "0.5rem 1.5rem",
      fontSize: "11px",
      border: `1px solid ${dark ? "#FFFFFF" : "#121212"}`,
      backgroundColor: dark ? "#1A1919" : "#FFFFFF",
      color: dark ? "#FFFFFF" : "#121212",
      height: "fit-content",
    };
    let show = true;
    if (type === "photo" && (showPostMode === 2 || showPostMode === 3)) {
      show = false;
    } else if (type === "video" && (showPostMode === 1 || showPostMode === 3)) {
      show = false;
    } else if (type === "album" && (showPostMode === 2 || showPostMode === 3)) {
      show = false;
    }
    if (show) {
      return (
        <Grid
          key={post._id}
          container={!fromHome}
          item={!fromHome}
          xs={!fromHome && 10}
          sm={!fromHome && 5}
          md={!fromHome && 5}
          lg={!fromHome && 3}
          style={
            dark
              ? {
                  backgroundColor: "#1a1919",
                  border: "1px solid #FFFFFF",
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderRadius: "4px",
                }
              : {
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #121212",
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                  padding: "1rem",
                }
          }
        >
          <Grid
            container
            item
            xs={12}
            style={{
              // padding: "0.5rem",
              backgroundColor: dark ? "#1a1919" : "#FFFFFF",
            }}
          >
            <Grid
              item
              xs={12}
              style={
                {
                  // padding: "1rem 0"
                }
              }
            >
              <Typography
                variant={"body1"}
                style={{
                  ...titleStyle,
                  fontWeight: "700",
                  fontSize: "16px",
                  color: dark ? "#FFFFFF" : "#121212",
                }}
              >
                {moment(post.createdTime).format("MMMM DD, YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {type === "photo" && (
                <CardMedia
                  className={classes.cardView}
                  image={post.attachments.images[0]}
                />
              )}
              {type === "video" && (
                <ReactPlayer
                  url={post && post.attachments && post.attachments.video}
                  controls={true}
                  style={{ objectFit: "unset" }}
                  width="100%"
                  height="30vh"
                />
              )}
              {type === "album" && (
                <CardMedia
                  className={classes.cardMediaAlbum}
                  image={post.attachments.images[0]}
                >
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    className={classes.album}
                  >
                    <Typography
                      variant="h3"
                      style={{ color: dark ? "#FFFFFF" : "#FFFFFF" }}
                    >
                      {post.attachments.images.length} +
                    </Typography>
                  </Grid>
                </CardMedia>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                ...txtStyle,
                padding: "1rem 0",
                // height: "5rem",
                color: dark ? "#FFFFFF" : "#121212",
              }}
            >
              <div style={gridContent}>{post.message}</div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justify="flex-start"
              alignItems="flex-end"
            >
              <ButtonComponent
                label="READ MORE"
                style={btnStyle}
                onClick={(e) => this.handleHomeClick(post)}
              />
            </Grid>
          </Grid>
        </Grid>
      );
    } else return <></>;
  }

  renderPostMessage(index, post, style, dark, type) {
    const { isEdit, bodyEdit, bodyView, titleEdit, titleView } = this.props;
    const txtStyle = {
      fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
      fontSize: "14px",
    };
    const titleStyle = {
      fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
      fontSize: "14px",
    };
    const btnStyle = {
      padding: "0.5rem 1.5rem",
      fontSize: "11px",
      border: `1px solid ${dark ? "#FFFFFF" : "#121212"}`,
      backgroundColor: dark ? "#1A1919" : "#FFFFFF",
      color: dark ? "#FFFFFF" : "#121212",
      height: "fit-content",
    };
    return (
      <Grid
        key={post._id}
        container
        item
        xs={10}
        sm={5}
        md={5}
        lg={3}
        style={
          dark
            ? {
                backgroundColor: "#1a1919",
                border: "1px solid #FFFFFF",
                marginLeft: "1rem",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "4px",
              }
            : {
                backgroundColor: "#FFFFFF",
                border: "1px solid #121212",
                marginLeft: "1rem",
                marginBottom: "1rem",
                borderRadius: "4px",
              }
        }
      >
        <Grid
          container
          item
          xs={12}
          style={{
            // padding: "0.5rem",
            backgroundColor: "white",
            borderRadius: "0.4rem",
          }}
        >
          <Grid
            item
            xs={12}
            style={
              {
                // padding: "1rem 0"
              }
            }
          >
            <Typography
              variant={"body1"}
              style={{
                ...titleStyle,
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              {moment(post.createdTime).format("MMMM DD,YYYY")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              ...txtStyle,
              // padding: "0 !important",
              // height: "43vh",
            }}
          >
            <div style={gridMessage}>{post.message}</div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify="flex-start"
            alignItems="flex-end"
          >
            <ButtonComponent
              label="READ MORE"
              style={btnStyle}
              onClick={(e) => this.handleHomeClick(post)}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderNews = (posts) => {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      dark,
      fromHome,
      siteEdit,
      siteView,
    } = this.props;
    const style = {
      isEdit: isEdit,
      titleEdit: titleEdit,
      titleView: titleView,
      bodyEdit: bodyEdit,
      bodyView: bodyView,
    };
    let showPostMode = 0;
    if (isEdit) {
      if (siteEdit && siteEdit.showDetailSetting) {
        showPostMode = siteEdit.showDetailSetting.showPostMode;
      }
    } else if (siteView && siteView.showDetailSetting) {
      showPostMode = siteView.showDetailSetting.showPostMode;
    }
    return (
      <>
        {fromHome && (
          <Grid item xs={12}>
            {posts &&
              posts.map(
                (post, index) =>
                  (post.attachments &&
                    post.attachments.media_type &&
                    post.isActive &&
                    showPostMode !== 3 &&
                    this.renderPostComponent(
                      index,
                      post,
                      style,
                      dark,
                      post.attachments.media_type,
                      showPostMode
                    )) ||
                  (post.attachments &&
                    !post.attachments.media_type &&
                    post.isActive &&
                    showPostMode !== 1 &&
                    showPostMode !== 2 &&
                    this.renderPostMessage(index, post, style, dark))
              )}
          </Grid>
        )}
        {!fromHome &&
          posts &&
          posts.map(
            (post, index) =>
              (post.attachments &&
                post.attachments.media_type &&
                post.isActive &&
                showPostMode !== 3 &&
                this.renderPostComponent(
                  index,
                  post,
                  style,
                  dark,
                  post.attachments.media_type,
                  showPostMode
                )) ||
              (post.attachments &&
                !post.attachments.media_type &&
                post.isActive &&
                showPostMode !== 1 &&
                showPostMode !== 2 &&
                this.renderPostMessage(index, post, style, dark))
          )}
      </>
    );
  };

  handleBack = () => {
    const { isEdit, siteView, setPostView } = this.props;
    if (isEdit) {
      setPostView(null);
    } else {
      this.props.history.push(`/${siteView.sitePath}`);
      setPostView(null);
    }
  };

  renderViewNew = (post) => {
    const {
      siteEdit,
      bgWhite,
      posts,
      titleEdit,
      titleView,
      isEdit,
      dark,
    } = this.props;
    return (
      <Grid
        container
        item
        xs={11}
        justify="center"
        // key={post._id}
        style={{ padding: "3rem 0" }}
        id="topView"
      >
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "1rem 0",
            borderBottom: `3px solid ${
              isEdit ? titleEdit.color : titleView.color
            }`,
          }}
          alignItems="center"
        >
          <Button
            onClick={() => this.handleBack()}
            startIcon={<KeyboardArrowLeftIcon />}
            style={{
              fontWeight: "bold",
              color: isEdit ? titleEdit.color : titleView.color,
              fontSize: "15px",
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={10}
          justify="center"
          style={{
            marginTop: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            className="fb-post"
            data-href={post.target && post.target}
            data-show-text="true"
            style={{
              // maxWidth: "100%",
              width: "100%",
              // marginBottom: "30vh",
              // backgroundColor: "white",
              color: isEdit ? titleEdit.color : titleView.color,
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            Loading...
          </div>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Grid
            container
            item
            xs={12}
            justify="center"
            style={{ marginTop: "2.5rem" }}
          >
            <Grid
              container
              alignItems="center"
              item
              xs={12}
              style={{ padding: "2rem 0" }}
            >
              <Grid item xs={3} sm={4}>
                <Divider
                  style={{
                    backgroundColor: isEdit ? titleEdit.color : titleView.color,
                    height: "3px",
                  }}
                  variant="fullWidth"
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                style={{
                  textAlign: "center",
                  color: isEdit ? titleEdit.color : titleView.color,
                  fontFamily: isEdit
                    ? titleEdit.fontFamily
                    : titleView.fontFamily,
                  fontWeight: "bold",
                  fontSize: 34,
                }}
              >
                LASTEST NEWS
              </Grid>
              <Grid item xs={3} sm={4}>
                <Divider
                  style={{
                    backgroundColor: isEdit ? titleEdit.color : titleView.color,
                    height: "3px",
                  }}
                  variant="fullWidth"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            // spacing={3}
            justify="center"
            style={{ marginTop: "2.5rem" }}
          >
            {this.renderNews(
              isEdit
                ? siteEdit &&
                    siteEdit.posts &&
                    siteEdit.posts
                      .filter(function (pos) {
                        return pos.isActive === true;
                      })
                      .sort((a, b) => b.createdTime - a.createdTime)
                      .slice(0, 3)
                : posts && posts.slice(0, 3)
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  handleShowMore = async () => {
    const {
      isEdit,
      getDataByPageNumber,
      setPostsToSiteViewOnePage,
      siteInfo,
      siteView,
    } = this.props;
    if (isEdit) {
      this.setState({
        itemPerPage:
          parseInt(this.state.itemPerPage) + parseInt(this.state.count),
      });
    } else {
      this.setState({ pageView: this.state.pageView + 1 });
      const data = await getDataByPageNumber({
        sitePath: siteInfo.sitePath,
        page: "news",
        pageNumber: this.state.pageView + 1,
      });
      let newPosts = [...siteView.posts, ...data.data.posts];
      newPosts && setPostsToSiteViewOnePage(newPosts);
    }
  };

  render() {
    const {
      isEdit,
      posts,
      pageCountView,
      fromHome,
      pageCount,
      editPostView,
      dark,
      classes,
      titleEdit,
      titleView,
    } = this.props;
    const { itemPerPage } = this.state;
    const useStyles = () => ({
      showMore: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
        lineHeight: "1.4em",
        textDecoration: "underline",
      },
    });
    const showMore = useStyles();

    return (
      <Grid container justify="center">
        {/* <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=742131839643879&autoLogAppEvents=1"
        ></script> */}
        {!fromHome && editPostView ? (
          <Grid container item xs={11} justify="center">
            {this.renderViewNew(editPostView)}
          </Grid>
        ) : (
          <Grid
            container
            item
            // xs={10}
            // spacing={2}
            justify="center"
            xs={11}
            sm={11}
            style={{
              //  marginTop: "2.5rem", marginBottom: "2.5rem"
              overflow: "visible",
            }}
          >
            <Grid
              container
              item
              xs={12}
              // spacing={3}
              justify="center"
              // style={{ padding: "1rem 0rem" }}
            >
              {isEdit
                ? this.renderNews(
                    posts.slice(
                      this.state.page > pageCount ? 0 : this.state.offset,
                      this.state.page > pageCount
                        ? 3
                        : parseInt(this.state.itemPerPage) +
                            parseInt(this.state.offset)
                    )
                  )
                : this.renderNews(posts)}
            </Grid>

            {isEdit
              ? pageCount > 1 &&
                itemPerPage < posts.length && (
                  <Grid
                    container
                    item
                    xs={6}
                    justify="center"
                    className={classes.showMore}
                    style={showMore.showMore}
                  >
                    <FontAwesomeIcon
                      icon={faChevronCircleDown}
                      color={isEdit ? titleEdit.color : titleView.color}
                      size="2x"
                      onClick={() => this.handleShowMore()}
                    />
                  </Grid>
                )
              : pageCountView &&
                this.state.pageView < pageCountView && (
                  <Grid
                    container
                    item
                    xs={6}
                    justify="center"
                    className={classes.showMore}
                    style={showMore.showMore}
                  >
                    <FontAwesomeIcon
                      icon={faChevronCircleDown}
                      color={isEdit ? titleEdit.color : titleView.color}
                      size="2x"
                      onClick={() => this.handleShowMore()}
                    />
                  </Grid>
                )}
          </Grid>
        )}
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
  pageCountView: state.post.pageCountNewsView,
  siteView: state.site.siteView,
  editPostView: state.post.postView,
});

const mapDispatchToProps = (dispatch) => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setPostsToSiteViewOnePage: (posts) =>
    dispatch(setPostsToSiteViewOnePage(posts)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
  setPostView: (post) => dispatch(setPostView(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withRouter(NewsType)));
