import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Dialog,
  Grid,
  makeStyles,
  Typography,
  withStyles
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import React from "react";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMediaAlbum: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  cardMedia: {
    paddingTop: "60%"
  },
  album: {
    padding: "20%",
    background: "rgba(24, 20, 20, 0.5)"
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: theme.spacing(3)
  },
  gridItems: {
    maxHeight: 350
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

function TypeAlbum({ post, openDialog }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
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
              <Typography variant="h4" style={{ color: "white" }}>
                {post.attachments.images.length} +
              </Typography>
            </Grid>
          </CardMedia>

          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography>{post.message && post.message}</Typography>
          </CardContent>
          <CardActions>
            <Button
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

function TypePhoto({ post, openDialog }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={post.attachments.images[0]}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography>{post.message && post.message}</Typography>
          </CardContent>
          <CardActions>
            <Button
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
      postOpen: null
    };
  }

  handleOpen = post => {
    this.setState({
      open: true,
      postOpen: post
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      postOpen: null
    });
  };

  render() {
    const { posts, classes } = this.props;
    const post = this.state.postOpen;
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
              (post.attachments.media_type === "photo" && (
                <TypePhoto
                  key={index}
                  post={post}
                  openDialog={this.handleOpen}
                />
              )) ||
              (post.attachments.media_type === "album" && (
                <TypeAlbum
                  key={index}
                  post={post}
                  openDialog={this.handleOpen}
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
                <Grid>
                  <Typography variant="h5" color="textPrimary">
                    {post && post.title}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body1">
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

export default withStyles(gridStyle)(PostTypeComponent);