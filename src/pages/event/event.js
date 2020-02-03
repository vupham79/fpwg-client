import React, { Component } from "react";
import { Grid, Typography, Divider, Box, Button } from "@material-ui/core";
import styles from "./event.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const imgUrl = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

export default class EventPage extends Component {
  render() {
    return (
      <Grid container alignItems="center" direction="column" className={styles.event_page}>
        <Grid item sm={10} xs={10}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
          >
            Events
          </Typography>
          <Divider className="divider" variant="center" />
        </Grid>
        <Grid
          item
          sm={3}
          xs={3}
          cotainer
          justify="flex-center"
          className={styles.event_body}
        >
          <Grid item sm={12} container>
            <Grid sm={3}>
              <div className={styles.image_page}>
                <Link>
                  <img src={imgUrl[1]} style={imgStyles} />
                </Link>
              </div>
            </Grid>
            <Grid sm={9} container direction="column">
              <Grid>
                <Link className={styles.link}>
                  <Typography variant="h6" className={styles.shop_name}>
                    Foody
                  </Typography>
                </Link>
              </Grid>
              <Grid>
                <Button className={styles.btn_like}>
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className={styles.icon}
                    size-={2}
                  ></FontAwesomeIcon>
                  <Typography className={styles.like}>Like Page</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container sm={12} className={styles.contain_event}>
            <Grid className={styles.event}>
              <Typography className={styles.event_content}>
                Foody does not have any upcoming events.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid sm={3} justify="center">
            <Button className={styles.btn_view}>
              <Typography
                align="center"
                variant="h6"
                className={styles.btn_content}
              >
                View Events On FaceBook
              </Typography>
            </Button>
        </Grid>
      </Grid>
    );
  }
}
