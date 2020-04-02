import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  withStyles
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import Truncate from "react-truncate";
import { getDataByPageNumber, setPostsToSiteView } from "../../actions";
import ReactPaginate from "react-paginate";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    width: "30vh",
    display: "flex",
    flexDirection: "column",
    height: "22rem",
    border: style => "0.5px solid" + style.color
    // "&:hover": {
    //   border: style => "1.5px solid" + style.color
    // }
  },
  message: {
    paddingLeft: "0.5rem"
  },
  title: {
    overflow: "hidden",
    paddingLeft: "1rem"
  },
  cardMediaAlbum: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain"
  },
  cardMedia: {
    height: "30vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden"
  },
  album: {
    height: "30vh",
    background: "rgba(24, 20, 20, 0.5)"
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
    paddingBottom: 0,
    overflow: "hidden"
  },
  cardHeader: {
    padding: "0.5rem"
  },
  avatar: {
    width: "2rem",
    height: "2rem"
  },
  gridItems: {
    maxHeight: 350
  },
  btnReadMore: {
    border: style => "0.5px solid" + style.color,
    color: style => style.color,
    "&:hover": {
      border: style => "1.5px solid" + style.color,
      color: "white",
      background: style => style.color
    }
  }
}));

const gridStyle = theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3)
  },

  images: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "-webkit-fill-available",
    maxHeight: "100%",
    maxWidth: "100%"
  }
});

const cardTitle = {
  fontSize: "11px",
  fontFamily: "Segoe UI"
};

function TypeAlbum({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );

  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily,
    fontSize: "11px"
  };
  return (
    <React.Fragment>
      <Grid
        item
        // xs={12}
        // sm={6}
        // md={6}
        // lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          <CardActionArea>
            <CardMedia
              onClick={() => openDialog(post)}
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
          </CardActionArea>
          {post.message && (
            <CardContent className={classes.cardContent}>
              <div style={{ padding: "0.5rem" }}>
                <Truncate
                  style={{ ...txtStyle }}
                  lines={2}
                  ellipsis={<span> ...</span>}
                >
                  {post.message}
                </Truncate>
              </div>
            </CardContent>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypePhoto({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily,
    fontSize: "11px"
  };
  return (
    <React.Fragment>
      <Grid
        item
        // xs={12}
        // sm={6}
        // md={6}
        // lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          <CardActionArea>
            <CardMedia
              onClick={() => openDialog(post)}
              className={classes.cardMedia}
              image={post.attachments.images[0]}
            />
          </CardActionArea>
          {post.message && (
            <CardContent
              className={classes.cardContent}
              style={{ paddingBottom: "0.5rem" }}
            >
              <div style={{ padding: "0.5rem", display: "block" }}>
                <Truncate
                  style={{ ...txtStyle }}
                  lines={2}
                  ellipsis={<span> ...</span>}
                >
                  {post.message}
                </Truncate>
              </div>
            </CardContent>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypeVideo({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily,
    fontSize: "11px"
  };
  return (
    <React.Fragment>
      <Grid
        item
        // xs={12}
        // sm={6}
        // md={6}
        // lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          <CardActionArea>
            <ReactPlayer
              onClick={() => openDialog(post)}
              url={post && post.attachments && post.attachments.video}
              controls={true}
              style={{ objectFit: "unset" }}
              width="100%"
              height="30vh"
            />
          </CardActionArea>
          {post.message && (
            <CardContent className={classes.cardContent}>
              <div style={{ padding: "0.5rem" }}>
                <Truncate
                  style={{ ...txtStyle }}
                  lines={2}
                  ellipsis={<span> ...</span>}
                >
                  {post.message}
                </Truncate>
              </div>
            </CardContent>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypeMessage({ post, openDialog, style, dark, siteInfo }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  const txtStyle = {
    fontFamily: style.isEdit
      ? style.bodyEdit.fontFamily
      : style.bodyView.fontFamily,
    fontSize: "11px"
  };
  return (
    <React.Fragment>
      <Grid
        item
        // xs={12}
        // sm={6}
        // md={6}
        // lg={4}
        style={dark ? { backgroundColor: "#1a1919" } : null}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="recipe"
                src={siteInfo.logo}
                className={classes.avatar}
              />
            }
            action={
              <IconButton aria-label="settings" style={{ borderRadius: 0 }}>
                <a
                  href={post.target}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <FacebookIcon color="primary" fontSize="inherit" />
                </a>
              </IconButton>
            }
            subheaderTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            titleTypographyProps={{
              style: { ...cardTitle, ...txtStyle }
            }}
            title={siteInfo.title}
            subheader={moment(post.createAt).format("MMMM DD,YYYY")}
          />
          {post.message && (
            <Truncate
              style={{
                ...txtStyle,
                padding: "1rem ",
                height: "-webkit-fill-available"
              }}
              lines={10}
              ellipsis={<span> ...</span>}
            >
              {post.message}
            </Truncate>
          )}
        </Card>
      </Grid>
    </React.Fragment>
  );
}

class PostTypeComponent extends React.Component {
  state = {
    open: false,
    postOpen: null,
    openVideo: false,
    pageView: 1,
    filteredData: [],
    pageCount: 1,
    offset: 0,
    itemPerPage: 5
  };

  handlePageViewClick = async (event, value) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setPostToSiteView
    } = this.props;

    if (!isEdit) {
      this.setState({ pageView: value });
      const data = await getDataByPageNumber({
        sitePath: siteInfo.sitePath,
        page: "news",
        pageNumber: value
      });
      data && setPostToSiteView(data);
    }
  };

  handleOpen = post => {
    this.setState({
      open: true,
      postOpen: post
    });
  };

  handleOpenVideo = post => {
    this.setState({
      openVideo: true,
      postOpen: post
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      postOpen: null,
      openVideo: false
    });
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

  getList = async () => {
    const { posts } = this.props;
    this.setState({
      filteredData: posts.slice(
        this.state.offset,
        this.state.itemPerPage + this.state.offset
      ),
      pageCount: Math.ceil(posts.length / this.state.itemPerPage)
    });
  };

  componentDidMount() {
    const { isEdit } = this.props;
    if (isEdit) {
      this.getList();
    }
  }

  handlePageEditClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemPerPage);

    this.setState({ offset: offset }, () => {
      this.setListData(
        this.props.posts.slice(
          this.state.offset,
          this.state.itemPerPage + this.state.offset
        )
      );
    });
  };

  render() {
    const {
      classes,
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteInfo,
      posts,
      pageCountView,
      theme,
      fromHome
    } = this.props;
    const post = this.state.postOpen;
    const style = {
      isEdit: isEdit,
      titleEdit: titleEdit,
      titleView: titleView,
      bodyEdit: bodyEdit,
      bodyView: bodyView
    };
    return (
      <Container>
        <Grid
          container
          spacing={2}
          justify="center"
          style={{ paddingTop: "8rem" }}
        >
          {isEdit && !fromHome
            ? this.state.filteredData.map(
              (post, index) =>
                (post.attachments &&
                  post.attachments.media_type === "photo" &&
                  post.isActive && (
                    <TypePhoto
                      key={index}
                      post={post}
                      style={style}
                      dark={this.props.darkMode}
                      openDialog={this.handleOpen}
                      siteInfo={siteInfo}
                    />
                  )) ||
                (post.attachments &&
                  post.attachments.media_type === "album" &&
                  post.isActive && (
                    <TypeAlbum
                      key={index}
                      post={post}
                      style={style}
                      dark={this.props.darkMode}
                      openDialog={this.handleOpen}
                      siteInfo={siteInfo}
                    />
                  )) ||
                (post.attachments &&
                  post.attachments.media_type === "video" &&
                  post.isActive && (
                    <TypeVideo
                      key={index}
                      post={post}
                      style={style}
                      dark={this.props.darkMode}
                      openDialog={this.handleOpenVideo}
                      siteInfo={siteInfo}
                    />
                  )) ||
                (!post.attachments &&
                  post.isActive && (
                    <TypeMessage
                      key={index}
                      post={post}
                      style={style}
                      dark={this.props.darkMode}
                      openDialog={this.handleOpenVideo}
                      siteInfo={siteInfo}
                    />
                  ))
            )
            : fromHome
              ? posts.filter(function (pos) {
                return pos.isActive;
              }).slice(0, 5)
                .map(
                  (post, index) =>
                    (post.attachments &&
                      post.attachments.media_type === "photo" &&
                      post.isActive && (
                        <TypePhoto
                          key={index}
                          post={post}
                          style={style}
                          dark={this.props.darkMode}
                          openDialog={this.handleOpen}
                          siteInfo={siteInfo}
                        />
                      )) ||
                    (post.attachments &&
                      post.attachments.media_type === "album" &&
                      post.isActive && (
                        <TypeAlbum
                          key={index}
                          post={post}
                          style={style}
                          dark={this.props.darkMode}
                          openDialog={this.handleOpen}
                          siteInfo={siteInfo}
                        />
                      )) ||
                    (post.attachments &&
                      post.attachments.media_type === "video" &&
                      post.isActive &&
                      (theme && theme === "theme3" ? (
                        index < 5 && (
                          <TypeVideo
                            key={index}
                            post={post}
                            style={style}
                            dark={this.props.darkMode}
                            openDialog={this.handleOpenVideo}
                            siteInfo={siteInfo}
                          />
                        )
                      ) : (
                          <TypeVideo
                            key={index}
                            post={post}
                            style={style}
                            dark={this.props.darkMode}
                            openDialog={this.handleOpenVideo}
                            siteInfo={siteInfo}
                          />
                        ))) ||
                    (!post.attachments &&
                      post.isActive && (
                        <TypeMessage
                          key={index}
                          post={post}
                          style={style}
                          dark={this.props.darkMode}
                          openDialog={this.handleOpenVideo}
                          siteInfo={siteInfo}
                        />
                      ))
                )
              : posts.map(
                (post, index) =>
                  (post.attachments &&
                    post.attachments.media_type === "photo" &&
                    post.isActive && (
                      <TypePhoto
                        key={index}
                        post={post}
                        style={style}
                        dark={this.props.darkMode}
                        openDialog={this.handleOpen}
                        siteInfo={siteInfo}
                      />
                    )) ||
                  (post.attachments &&
                    post.attachments.media_type === "album" &&
                    post.isActive && (
                      <TypeAlbum
                        key={index}
                        post={post}
                        style={style}
                        dark={this.props.darkMode}
                        openDialog={this.handleOpen}
                        siteInfo={siteInfo}
                      />
                    )) ||
                  (post.attachments &&
                    post.attachments.media_type === "video" &&
                    post.isActive &&
                    (theme && theme === "theme3" ? (
                      index < 5 && (
                        <TypeVideo
                          key={index}
                          post={post}
                          style={style}
                          dark={this.props.darkMode}
                          openDialog={this.handleOpenVideo}
                          siteInfo={siteInfo}
                        />
                      )
                    ) : (
                        <TypeVideo
                          key={index}
                          post={post}
                          style={style}
                          dark={this.props.darkMode}
                          openDialog={this.handleOpenVideo}
                          siteInfo={siteInfo}
                        />
                      ))) ||
                  (!post.attachments &&
                    post.isActive && (
                      <TypeMessage
                        key={index}
                        post={post}
                        style={style}
                        dark={this.props.darkMode}
                        openDialog={this.handleOpenVideo}
                        siteInfo={siteInfo}
                      />
                    ))
              )}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth={
              this.state.postOpen &&
                this.state.postOpen.attachments.media_type === "album"
                ? "md"
                : "sm"
            }
          >
            <Container className={classes.root}>
              <Grid container spacing={3} justify="center">
                {post &&
                  post.attachments.images &&
                  post.attachments.images.map((img, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={10}
                      md={8}
                      className={classes.girdItems}
                    >
                      <img src={img} alt="" className={classes.images} />
                    </Grid>
                  ))}
              </Grid>
              <Grid container className={classes.root} justify="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    style={isEdit ? bodyEdit : bodyView}
                  >
                    {post && post.message}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Dialog>
          {/* dialogue for video type */}
          <Dialog
            open={this.state.openVideo}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
          >
            <Container className={classes.root}>
              <Grid container spacing={3} justify="center">
                <ReactPlayer
                  url={post && post.attachments && post.attachments.video}
                  controls={true}
                  width="100%"
                  height="50%"
                />
              </Grid>
              <Grid container className={classes.root} justify="center">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography
                    variant="body1"
                    style={isEdit ? bodyEdit : bodyView}
                  >
                    {post && post.message}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Dialog>
        </Grid>
        {isEdit
          ? this.state.pageCount > 1 &&
          !fromHome && (
            <Grid container justify="center" style={{ paddingTop: "2rem" }}>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageEditClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </Grid>
          )
          : pageCountView > 1 &&
          theme !== "theme3" &&
          !fromHome && (
            <Grid container justify="center" style={{ marginTop: "5rem" }}>
              <Pagination
                style={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  padding: "0.2rem"
                }}
                color="primary"
                shape="rounded"
                count={pageCountView}
                page={this.state.pageView}
                onChange={this.handlePageViewClick}
              />
            </Grid>
          )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView,
  pageCountView: state.post.pageCountNewsView
});

const mapDispatchToProps = dispatch => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setPostToSiteView: posts => dispatch(setPostsToSiteView(posts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(gridStyle)(PostTypeComponent));
