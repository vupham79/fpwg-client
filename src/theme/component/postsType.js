import {
  Button,
  CardMedia,
  Grid,
  Typography,
  withStyles,
  Divider,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { Pagination, PaginationItem } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Slider from "react-slick";
import {
  getDataByPageNumber,
  setPostsToSiteView,
  setPostView,
  updateNavItemValue,
} from "../../actions";
import ButtonComponent from "../../component/Button";
import Link from "../../component/link";
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
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingBottom: 0,
    overflow: "hidden",
  },
  gridItems: {
    maxHeight: 350,
  },
  paginationItemRoot: {
    color: "#fff",
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

  // window.fbAsyncInit = function () {
  //   window.FB.init({
  //     appId: '742131839643879',
  //     cookie: true,
  //     xfbml: true,  // parse social plugins on this page
  //     version: 'v2.3'
  //   });
  //   window.FB.XFBML.parse();
  // };
}

class PostTypeComponent extends React.Component {
  state = {
    open: false,
    postOpen: this.props.postView && this.props.postView,
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitNews
      : this.props.siteView.limitNews,
    page: 1,
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
  };

  handleHomeClick = (post) => {
    renderFB();
    const { siteEdit, updateNavItemValue, setPostView, fromHome } = this.props;
    if (fromHome) {
      const news = siteEdit.navItems.filter((item) => {
        return item.original === "news";
      });
      setPostView(post);
      updateNavItemValue(news[0].order - 1);
    } else {
      setPostView(post);
    }
  };

  renderPostComponent(index, post, style, dark, type) {
    const {
      fromHome,
      isEdit,
      siteView,
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
      border: `1px solid ${dark ? "#fff" : "#000"}`,
      backgroundColor: dark ? "#1A1919" : "#fff",
      color: dark ? "#fff" : "#000",
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
                border: "1px solid #fff",
                marginLeft: "1rem",
                marginBottom: "1rem",
                // padding: "1rem",
                borderRadius: "4px",
              }
            : {
                backgroundColor: "#fff",
                border: "1px solid #000",
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
            backgroundColor: dark ? "#1a1919" : "#fff",
            // borderRadius: "0.4rem",
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
                color: dark ? "#fff" : "#000",
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
                    style={{ color: dark ? "#fff" : "#fff" }}
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
              color: dark ? "#fff" : "#000",
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
            {isEdit ? (
              <ButtonComponent
                label="READ MORE"
                style={btnStyle}
                onClick={(e) => this.handleHomeClick(post)}
              />
            ) : fromHome ? (
              <Link
                to={{
                  pathname: `/${siteView.sitePath}/news`,
                  postView: post,
                }}
              >
                <ButtonComponent label="READ MORE" style={btnStyle} />
              </Link>
            ) : (
              <ButtonComponent
                onClick={() => this.handleOpen(post)}
                label="READ MORE"
                style={btnStyle}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderPostMessage(index, post, style, dark, type) {
    const {
      fromHome,
      isEdit,
      siteView,
      bodyEdit,
      bodyView,
      titleEdit,
      titleView,
    } = this.props;
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
      border: `1px solid ${dark ? "#fff" : "#000"}`,
      backgroundColor: dark ? "#1A1919" : "#fff",
      color: dark ? "#fff" : "#000",
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
                border: "1px solid #fff",
                marginLeft: "1rem",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "4px",
              }
            : {
                backgroundColor: "#fff",
                border: "1px solid #000",
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
            {isEdit ? (
              <ButtonComponent
                label="READ MORE"
                style={btnStyle}
                onClick={(e) => this.handleHomeClick(post)}
              />
            ) : fromHome ? (
              <Link
                to={{
                  pathname: `/${siteView.sitePath}/news`,
                  postView: post,
                }}
              >
                <ButtonComponent label="READ MORE" style={btnStyle} />
              </Link>
            ) : (
              <ButtonComponent
                onClick={() => this.handleOpen(post)}
                label="READ MORE"
                style={btnStyle}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  handlePageViewClick = async (event, newValue) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setPostToSiteView,
    } = this.props;
    if (!isEdit) {
      this.setState({ pageView: newValue });
      const data = await getDataByPageNumber({
        sitePath: siteInfo.sitePath,
        page: "news",
        pageNumber: newValue,
      });
      data && setPostToSiteView(data);
    }
  };

  handlePageEditClick = (event, newValue) => {
    let selected = newValue - 1;
    let newOffset = Math.ceil(selected * this.state.itemPerPage);
    this.setState({
      offset: newOffset,
      page: newValue,
    });
  };

  renderNews = (posts) => {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      dark,
    } = this.props;

    const style = {
      isEdit: isEdit,
      titleEdit: titleEdit,
      titleView: titleView,
      bodyEdit: bodyEdit,
      bodyView: bodyView,
    };
    return (
      <>
        {posts &&
          posts.map(
            (post, index) =>
              (post.attachments &&
                post.attachments.media_type &&
                post.isActive &&
                this.renderPostComponent(
                  index,
                  post,
                  style,
                  dark,
                  post.attachments.media_type
                )) ||
              (post.attachments &&
                !post.attachments.media_type &&
                post.isActive &&
                this.renderPostMessage(index, post, style, dark))
          )}
      </>
    );
  };

  handleBack = () => {
    const { setPostView } = this.props;
    this.setState({ postOpen: null });
    setPostView(null);
  };

  renderViewNew = (post) => {
    const { siteEdit, bgWhite, posts } = this.props;
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      classes,
      dark,
    } = this.props;
    const sliderSettings = {
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 700,
      autoplaySpeed: 3000,
      arrows: true,
    };
    const btnStyle = {
      padding: "0.5rem 1.5rem",
      fontSize: "11px",
      border: `2px solid ${isEdit ? titleEdit.color : titleView.color}`,
    };
    const txtStyle = {
      fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
      fontSize: "16px",
      color: bgWhite ? "black" : "white",
    };
    const type = post.attachments && post.attachments.media_type;
    const originalMessage = post.message ? post.message.split("\n") : null;
    const title = post.message && post.message.split(".")[0];
    let titleShow = title && title.slice(0, 70);
    if (title.length > 70) {
      titleShow += "...";
    }
    return (
      <Grid container item xs={11} justify="center" key={post._id}>
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "1rem 0",
            borderBottom: `1px solid ${bgWhite ? "black" : "white"}`,
          }}
          alignItems="center"
        >
          <Button
            onClick={() => this.handleBack()}
            startIcon={<KeyboardArrowLeftIcon />}
            style={{
              fontWeight: "bold",
              color: bgWhite ? "black" : "white",
              fontSize: "15px",
            }}
          >
            Back To News
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
          {/* <Grid
            item
            xs={9}
            style={{
              ...txtStyle,
              paddingBottom: "2rem",
              fontWeight: "bold",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            {titleShow}
          </Grid> */}
          {/* {post.attachments && (
            <Grid item xs={10}>
              {type === "photo" && (
                // <CardMedia
                //   className={classes.cardView}
                //   image={post.attachments.images[0]}
                // />
                <img
                  src={post.attachments.images[0]}
                  style={{ width: "100%" }}
                  alt=""
                />
              )}
              {type === "video" && (
                <ReactPlayer
                  url={post && post.attachments && post.attachments.video}
                  controls={true}
                  style={{ objectFit: "unset" }}
                  width="100%"
                />
              )}
              {type === "album" && (
                <Slider {...sliderSettings}>
                  {post.attachments.images.map((img, index) => (
                    <CardMedia
                      key={index}
                      className={classes.cardAlbum}
                      image={img}
                    />
                  ))}
                </Slider>
              )}
            </Grid>
          )} */}
          {/* <Grid container item xs={10} style={{ padding: "1rem 0" }}>
            <Grid item xs={12}>
              <Typography
                variant={"body1"}
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: bgWhite ? "black" : "white",
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
                padding: "1rem 0",
                lineHeight: "1.5rem",
                overflowWrap: "break-word",
              }}
            >
              {originalMessage &&
                originalMessage.map((val) => {
                  if (val === "") {
                    return (
                      <>
                        <br />
                        <br />
                      </>
                    );
                  }
                  return val;
                })}
            </Grid>
            <Grid
              container
              item
              xs={12}
              justify="flex-start"
              style={{ padding: "2rem 0" }}
            >
              <a
                href={post.target && post.target}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ButtonComponent label="VIEW ON FACEBOOK" style={btnStyle} />
              </a>
            </Grid>
          </Grid> */}

          {/* <div class="fb-comments" data-href={post.target && post.target} data-width="" data-numposts="5"></div> */}
          <div
            class="fb-post"
            data-href={post.target && post.target}
            data-show-text="true"
            style={{
              // maxWidth: "100%",
              width: "100%",
              // marginBottom: "30vh",
              // backgroundColor: "white",
              color: dark ? "#fff" : "#000",
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            Loading...
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          style={{
            borderTop: `1px solid ${bgWhite ? "black" : "white"}`,
          }}
        >
          <Grid
            container
            item
            xs={12}
            justify="center"
            style={{ marginTop: "2.5rem" }}
          >
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                color: bgWhite ? "black" : "white",
                fontWeight: "bold",
              }}
            >
              LASTEST NEWS
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={3}
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
    } = this.props;
    const { page, postOpen } = this.state;
    return (
      <Grid container justify="center" id="fb-root">
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0&appId=742131839643879&autoLogAppEvents=1"
        ></script>
        {!fromHome && (isEdit ? editPostView : postOpen) ? (
          <Grid container item xs={11} justify="center">
            {this.renderViewNew(isEdit ? editPostView : postOpen)}
          </Grid>
        ) : (
          <Grid
            container
            item
            // xs={10}
            spacing={2}
            justify="center"
            xs={12}
            sm={10}
            style={
              {
                //  marginTop: "2.5rem", marginBottom: "2.5rem"
              }
            }
          >
            <Grid
              container
              item
              xs={12}
              spacing={3}
              justify="center"
              style={{ padding: "1rem 0rem" }}
            >
              {isEdit
                ? !fromHome
                  ? this.renderNews(
                      posts
                        .filter(function (pos) {
                          return pos.isActive === true;
                        })
                        .slice(
                          this.state.page > pageCount ? 0 : this.state.offset,
                          this.state.page > pageCount
                            ? 3
                            : parseInt(this.state.itemPerPage) +
                                parseInt(this.state.offset)
                        )
                    )
                  : this.renderNews(
                      posts
                        .filter(function (pos) {
                          return pos.isActive === true;
                        })
                        .slice(0, 3)
                    )
                : this.renderNews(posts)}
            </Grid>

            {isEdit
              ? pageCount > 1 &&
                !fromHome && (
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "2.5rem" }}
                  >
                    <Pagination
                      style={{
                        backgroundColor: dark ? "#000" : "#fff",
                        // padding: "0.4rem",
                        // borderRadius: "0.3rem",
                      }}
                      renderItem={(item) =>
                        dark ? (
                          <PaginationItem
                            {...item}
                            selected
                            style={{ color: "white", borderColor: "white" }}
                            classes={{
                              root: classes.paginationItemRoot,
                            }}
                          />
                        ) : (
                          <PaginationItem {...item} />
                        )
                      }
                      shape="rounded"
                      variant="outlined"
                      count={pageCount}
                      page={page > pageCount ? 1 : page}
                      onChange={this.handlePageEditClick}
                    />
                  </Grid>
                )
              : pageCountView > 1 &&
                !fromHome && (
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "2.5rem" }}
                  >
                    <Pagination
                      style={{
                        backgroundColor: dark ? "#000" : "#fff",
                        // padding: "0.4rem",
                        // borderRadius: "0.3rem",
                      }}
                      renderItem={(item) =>
                        dark ? (
                          <PaginationItem
                            {...item}
                            selected
                            style={{ color: "white", borderColor: "white" }}
                            classes={{
                              root: classes.paginationItemRoot,
                            }}
                          />
                        ) : (
                          <PaginationItem {...item} />
                        )
                      }
                      shape="rounded"
                      variant="outlined"
                      count={pageCountView}
                      page={this.state.pageView}
                      onChange={this.handlePageViewClick}
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
  setPostToSiteView: (posts) => dispatch(setPostsToSiteView(posts)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
  setPostView: (post) => dispatch(setPostView(post)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PostTypeComponent));
