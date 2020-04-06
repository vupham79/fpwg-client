import {
  Button,
  CardMedia,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import {
  getDataByPageNumber,
  setPostsToSiteView,
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
    paddingTop: "70%",
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
});

const gridContent = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
};

const gridMessage = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "11",
  WebkitBoxOrient: "vertical",
};

class PostTypeComponent extends React.Component {
  state = {
    open: false,
    postOpen:
      this.props.postView && this.props.postView.post
        ? this.props.postView.post
        : null,
    openVideo: false,
    pageView: 1,
    filteredData: [],
    offset: 0,
    itemPerPage: this.props.itemPerPage,
    page: 1,
    viewPost:
      this.props.postView && this.props.postView.view
        ? this.props.postView.view
        : false,
  };

  handleOpen = (post) => {
    this.setState({
      viewPost: true,
      postOpen: post,
    });
  };

  hanldeHomeClick = (post) => {
    // const { siteEdit, updateNavItemValue } = this.props;
    // const news = siteEdit.navItems.filter((item) => {
    //   return item.original === "news";
    // });
    // updateNavItemValue(news[0].order - 1);
  };

  renderPostComponent(index, post, style, dark, type) {
    const { fromHome, isEdit, siteView } = this.props;
    const { classes } = this.props;
    const txtStyle = {
      fontFamily: style.isEdit
        ? style.bodyEdit.fontFamily
        : style.bodyView.fontFamily,
      fontSize: "14px",
    };
    const btnStyle = {
      padding: "0.5rem 1.5rem",
      fontSize: "11px",
      border: `2px solid ${
        style && style.isEdit ? style.titleEdit.color : style.titleView.color
      }`,
    };

    return (
      <Grid
        key={index}
        container
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "0.5rem",
            backgroundColor: "white",
            borderRadius: "0.4rem",
          }}
        >
          <Grid item xs={12} style={{ padding: "1rem 0" }}>
            <Typography
              variant={"body1"}
              style={{ ...txtStyle, fontWeight: "700", fontSize: "16px" }}
            >
              {moment(post.createdAt).format("MMMM DD,YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {type === "photo" && (
              <CardMedia
                className={classes.cardMedia}
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
                  <Typography variant="h3" style={{ color: "white" }}>
                    {post.attachments.images.length} +
                  </Typography>
                </Grid>
              </CardMedia>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ ...txtStyle, padding: "1rem 0", height: "5rem" }}
          >
            <div style={gridContent}>{post.message}</div>
          </Grid>
          <Grid container item xs={12} justify="flex-start">
            {fromHome ? (
              isEdit ? (
                <ButtonComponent
                  label="READ MORE"
                  style={btnStyle}
                  onClick={(e) => this.hanldeHomeClick(post)}
                />
              ) : (
                <Link
                  to={{
                    pathname: `/${siteView.sitePath}/news`,
                    postView: { post: post, view: true },
                  }}
                >
                  <ButtonComponent label="READ MORE" style={btnStyle} />
                </Link>
              )
            ) : (
              <ButtonComponent
                label="READ MORE"
                style={btnStyle}
                onClick={() => this.handleOpen(post)}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  renderPostMessage(index, post, style, dark) {
    const { fromHome } = this.props;
    const txtStyle = {
      fontFamily: style.isEdit
        ? style.bodyEdit.fontFamily
        : style.bodyView.fontFamily,
      fontSize: "14px",
    };
    const btnStyle = {
      padding: "0.5rem 1.5rem",
      fontSize: "11px",
      border: `2px solid ${
        style && style.isEdit ? style.titleEdit.color : style.titleView.color
      }`,
    };
    return (
      <Grid
        key={index}
        container
        item
        xs={12}
        sm={6}
        md={6}
        lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "0.5rem",
            backgroundColor: "white",
            borderRadius: "0.4rem",
          }}
        >
          <Grid item xs={12} style={{ padding: "1rem 0" }}>
            <Typography
              variant={"body1"}
              style={{ ...txtStyle, fontWeight: "700", fontSize: "16px" }}
            >
              {moment(post.createdAt).format("MMMM DD,YYYY")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ ...txtStyle, padding: "1rem 0", height: "43vh" }}
          >
            <div style={gridMessage}>{post.message}</div>
          </Grid>
          <Grid container item xs={12} justify="flex-start">
            {fromHome ? (
              <ButtonComponent
                label="READ MORE"
                style={btnStyle}
                onClick={() => this.handleOpen(post)}
              />
            ) : (
              <ButtonComponent
                label="READ MORE"
                style={btnStyle}
                onClick={() => this.handleOpen(post)}
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
        {posts.map(
          (post, index) =>
            (post.attachments &&
              post.isActive &&
              this.renderPostComponent(
                index,
                post,
                style,
                dark,
                post.attachments.media_type
              )) ||
            (!post.attachments &&
              post.isActive &&
              this.renderPostMessage(index, post, style, dark))
        )}
      </>
    );
  };

  handleBack = () => {
    this.setState({ viewPost: false });
  };

  renderViewNew = (post) => {
    const { posts, bgWhite } = this.props;
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      classes,
    } = this.props;
    const style = {
      isEdit: isEdit,
      titleEdit: titleEdit,
      titleView: titleView,
      bodyEdit: bodyEdit,
      bodyView: bodyView,
    };
    const btnStyle = {
      padding: "0.5rem 1.5rem",
      fontSize: "11px",
      border: `2px solid ${
        style && style.isEdit ? style.titleEdit.color : style.titleView.color
      }`,
    };
    const txtStyle = {
      fontFamily: style.isEdit
        ? style.bodyEdit.fontFamily
        : style.bodyView.fontFamily,
      fontSize: "16px",
      color: bgWhite ? "black" : "white",
    };
    const type = post.attachments && post.attachments.media_type;
    const originalMessage = post.message ? post.message.split("\n") : null;
    return (
      <Grid
        container
        item
        xs={11}
        justify="center"
        style={{ paddingTop: "3rem" }}
      >
        <Grid
          container
          item
          xs={12}
          style={{
            padding: "1rem 0",
            borderBottom: `1px solid ${bgWhite ? "black" : "white"}`,
            fontSize: "20px",
          }}
          alignItems="center"
        >
          <Button
            onClick={() => this.handleBack()}
            startIcon={<KeyboardArrowLeftIcon />}
            style={{ fontWeight: "bold", color: bgWhite ? "black" : "white" }}
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
          style={{ paddingTop: "4rem", borderBottom: "1px solid black" }}
        >
          {post.attachments && (
            <Grid item xs={10}>
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
                />
              )}
              {type === "album" &&
                post.attachments.images.map((img, index) => (
                  <CardMedia
                    key={index}
                    className={classes.cardAlbum}
                    image={img}
                  />
                ))}
            </Grid>
          )}
          <Grid container item xs={10} style={{ padding: "1rem 0" }}>
            <Grid item xs={12}>
              <Typography
                variant={"body1"}
                style={{
                  fontWeight: "700",
                  fontSize: "20px",
                  color: bgWhite ? "black" : "white",
                }}
              >
                {moment(post.createdAt).format("MMMM DD,YYYY")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ ...txtStyle, padding: "1rem 0", lineHeight: "1.5rem" }}
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
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          style={{ paddingTop: "4rem" }}
        >
          <Grid container item xs={12} justify="center">
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                color: bgWhite ? "black" : "white",
              }}
            >
              Lastest
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={3}
            justify="center"
            style={{ paddingTop: "5rem" }}
          >
            {this.renderNews(
              posts.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { isEdit, posts, pageCountView, fromHome, pageCount } = this.props;
    return (
      <Grid container justify="center">
        {this.state.viewPost ? (
          <Grid container item xs={11} justify="center">
            {this.renderViewNew(this.state.postOpen)}
          </Grid>
        ) : (
          <Grid container item xs={10}>
            <Grid
              container
              item
              xs={12}
              spacing={3}
              justify="center"
              style={{ padding: "5rem 0.5rem" }}
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
                            : this.state.itemPerPage + this.state.offset
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
                  <Grid container justify="center">
                    <Pagination
                      style={{
                        backgroundColor: "white",
                        padding: "0.4rem",
                        borderRadius: "0.3rem",
                      }}
                      color="default"
                      shape="rounded"
                      variant="outlined"
                      count={pageCount}
                      page={this.state.page > pageCount ? 1 : this.state.page}
                      onChange={this.handlePageEditClick}
                    />
                  </Grid>
                )
              : pageCountView > 1 &&
                !fromHome && (
                  <Grid container justify="center">
                    <Pagination
                      style={{
                        backgroundColor: "white",
                        padding: "0.4rem",
                        borderRadius: "0.3rem",
                      }}
                      color="default"
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
});

const mapDispatchToProps = (dispatch) => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setPostToSiteView: (posts) => dispatch(setPostsToSiteView(posts)),
  updateNavItemValue: (value) => dispatch(updateNavItemValue(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(PostTypeComponent));
