import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Grid,
  makeStyles,
  Typography,
  withStyles
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import React from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "22rem",
    "&:hover": {
      border: style => "1.5px solid" + style.color
    }
  },
  message: {
    overflow: "hidden",
    height: "3rem",
    paddingLeft: "1rem"
  },
  title: {
    overflow: "hidden",
    height: "1.5rem",
    paddingLeft: "1rem"
  },
  cardMediaAlbum: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain"
  },
  cardMedia: {
    height: "10rem",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    overflow: "hidden"
  },
  album: {
    height: "10rem",
    background: "rgba(24, 20, 20, 0.5)"
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  gridItems: {
    maxHeight: 350
  },
  btnReadMore: {
    border: style => "1.5px solid" + style.color,
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
    height: "30vh",
    maxHeight: "100%",
    maxWidth: "100%"
  }
});

function TypeAlbum({ post, openDialog, style }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMediaAlbum}
            image={post.attachments.images[0]}
            title="Image title"
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

          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              style={
                style && style.isEdit
                  ? { fontFamily: style.titleEdit.fontFamily }
                  : { fontFamily: style.titleView.fontFamily }
              }
            >
              {post.title}
            </Typography>
            <Typography
              className={classes.message}
              style={
                style && style.isEdit
                  ? style && style.bodyEdit
                  : style && style.bodyView
              }
            >
              {post.message && post.message}
            </Typography>
          </CardContent>
          <CardActions style={{ paddingLeft: "1rem" }}>
            <Button
              className={classes.btnReadMore}
              variant="outlined"
              color="primary"
              onClick={() => openDialog(post)}
            >
              Read More
            </Button>
            <Button color="primary">
              <a href={post.target}>
                <FacebookIcon color="primary" fontSize="large" />
              </a>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypePhoto({ post, openDialog, style }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={post.attachments.images[0]}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              style={
                style && style.isEdit
                  ? { fontFamily: style.titleEdit.fontFamily }
                  : { fontFamily: style.titleView.fontFamily }
              }
            >
              {post.title}
            </Typography>
            <Typography
              className={classes.message}
              style={
                style && style.isEdit
                  ? style && style.bodyEdit
                  : style && style.bodyView
              }
            >
              {post.message && post.message}
            </Typography>
          </CardContent>
          <CardActions style={{ paddingLeft: "1rem" }}>
            <Button
              className={classes.btnReadMore}
              variant="outlined"
              color="primary"
              onClick={() => openDialog(post)}
            >
              Read More
            </Button>
            <Button color="primary">
              <a href={post.target}>
                <FacebookIcon color="primary" fontSize="large" />
              </a>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

function TypeVideo({ post, openDialog, style }) {
  const classes = useStyles(
    style && style.isEdit ? style.titleEdit : style.titleView
  );
  return (
    <React.Fragment>
      {/* 'https://www.facebook.com/Indiegogo/videos/484114395557572/UzpfSTMzMzY2NzUwNjczMTk0NzoyNzYzMDQxNjQwNDYxMTc2/' */}
      <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <ReactPlayer
            url={post && post.attachments && post.attachments.video}
            controls={true}
            width="100%"
            height="50%"
          />
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              style={
                style && style.isEdit
                  ? { fontFamily: style.titleEdit.fontFamily }
                  : { fontFamily: style.titleView.fontFamily }
              }
            >
              {post.title}
            </Typography>
            <Typography
              className={classes.message}
              style={
                style && style.isEdit
                  ? style && style.bodyEdit
                  : style && style.bodyView
              }
            >
              {post.message && post.message}
            </Typography>
          </CardContent>
          <CardActions style={{ paddingLeft: "1rem" }}>
            <Button
              color="primary"
              className={classes.btnReadMore}
              variant="outlined"
              color="primary"
              onClick={() => openDialog(post)}
            >
              Read More
            </Button>
            <Button color="primary">
              <FacebookIcon color="primary" fontSize="large" />
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

class PostTypeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      postOpen: null,
      openVideo: false
    };
  }

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

  render() {
    const {
      posts,
      classes,
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView
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
          spacing={5}
          justify="center"
          style={{ marginTop: "3rem" }}
        >
          {posts.map(
            (post, index) =>
              (post.attachments.media_type === "photo" && post.isActive && (
                <TypePhoto
                  key={index}
                  post={post}
                  style={style}
                  openDialog={this.handleOpen}
                />
              )) ||
              (post.attachments.media_type === "album" && post.isActive && (
                <TypeAlbum
                  key={index}
                  post={post}
                  style={style}
                  openDialog={this.handleOpen}
                />
              )) ||
              (post.attachments.media_type === "video" && post.isActive && (
                <TypeVideo
                  key={index}
                  post={post}
                  style={style}
                  openDialog={this.handleOpenVideo}
                />
              ))
          )}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="md"
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
                      sm={4}
                      md={4}
                      className={classes.girdItems}
                    >
                      <img src={img} alt="" className={classes.images} />
                    </Grid>
                  ))}
              </Grid>
              <Grid container className={classes.root} justify="center">
                <Grid item xs={12} style={{ flexBasis: "unset" }}>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    style={
                      isEdit
                        ? { fontFamily: style.titleEdit.fontFamily }
                        : { fontFamily: style.titleView.fontFamily }
                    }
                  >
                    {post && post.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ flexBasis: "unset" }}>
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
            maxWidth="md"
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
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    color="textPrimary"
                    style={
                      isEdit
                        ? { fontFamily: style.titleEdit.fontFamily }
                        : { fontFamily: style.titleView.fontFamily }
                    }
                  >
                    {post && post.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView
});

export default connect(
  mapStateToProps,
  null
)(withStyles(gridStyle)(PostTypeComponent));
