import React, { Component } from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Card, makeStyles, CssBaseline } from "@material-ui/core";
import styles from "./new.module.css";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

function Album({ posts }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {posts.map((card, index) => (
            <Grid item xs={12} key={index} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.attachments.images[0]}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>{card.message}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

class NewPage extends Component {
  render() {
    const { isEdit, titleEdit, titleView, siteView, posts } = this.props;
    return (
      <Grid container style={{ marginBottom: "5rem" }}>
        <Grid
          item
          sm={12}
          xs={12}
          className={styles.title}
          style={isEdit ? titleEdit : titleView}
        >
          News
        </Grid>
        <Grid item sm={12} xs={12} container spacing={3}>
          {posts ? (
            isEdit ? (
              <Grid container justify="center">
                <Album posts={posts} />
              </Grid>
            ) : (
              siteView.posts && (
                <Grid container justify="center">
                  <Album posts={siteView.posts} />
                </Grid>
              )
            )
          ) : (
            <Grid container justify="center">
              <Typography variant="body1">You don't have any news.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  posts: state.post.posts
});

export default connect(mapStateToProps, null)(NewPage);
