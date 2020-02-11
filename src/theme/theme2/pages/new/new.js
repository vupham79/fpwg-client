import React, { Component } from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Card, makeStyles, Container } from "@material-ui/core";
import styles from "./new.module.css";

const cards = [
  {
    imageUrl:
      "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
    date: "Jan 30, 2020",
    name: "Ảnh bìa của Foody"
  },
  {
    imageUrl:
      "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199",
    date: "Jan 30, 2020",
    name: "Foody"
  },
  {
    imageUrl:
      "https://scontent.xx.fbcdn.net/v/t1.0-9/83618810_100161151548673_3898098354910920704_n.png?_nc_cat=107&_nc_ohc=6kYhF-xqWTcAX9w_V8G&_nc_ht=scontent.xx&oh=8c5defa74cd36a44d95c15b8c2a0fbfe&oe=5E8EC9A1",
    date: "Jan 30, 2020",
    name: "Ảnh đại diện"
  },
  {
    imageUrl:
      "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
    date: "Jan 30, 2020",
    name: "Foody"
  }
];

// const imageStyle = {
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   width: "85%",
//   height: "25vh"
// };

const useStyles = makeStyles({
  card: {
    hover: {
      "&:hover": {
        background: "background: rgba(24, 20, 20, 0.5)"
      }
    }
  },
  media: {
    height: "14vh"
  }
});

function MyCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.imageUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {props.date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

class NewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards
    };
  }

  render() {
    return (
      <Container className={styles.news}>
        <Grid container>
          <Grid item sm={12} xs={12} className={styles.title}>
            News
          </Grid>
          <Grid item sm={12} xs={12} container justify={""} spacing={2}>
            {this.state.cards.map((card, index) => (
              <Grid container item sm={3} xs={6} key={index}>
                <MyCard
                  imageUrl={card.imageUrl}
                  date={card.date}
                  name={card.name}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default NewPage;
