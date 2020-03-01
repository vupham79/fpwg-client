import { Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./index.module.css";
import { connect } from "react-redux";

const images = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E"
];

const imageStyle = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "25vh"
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { images };
  }

  render() {
    const { titleEdit, titleView, isEdit } = this.props;
    return (
      <Grid container justify="center" className={styles.gallery} spacing={0}>
        <Grid
          item
          sm={12}
          xs={12}
          className={styles.title}
          style={isEdit ? titleEdit : titleView}
        >
          Gallery
        </Grid>
        <Grid item sm={12} xs={12} container justify="center">
          {this.state.images.map((image, index) => (
            <Grid item sm={2} xs={4} key={index}>
              <img alt="" key={index} src={image} style={imageStyle} />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          sm={12}
          xs={12}
          container
          justify="center"
          alignItems="flex-start"
        >
          <Grid item sm={4} xs={8} className={styles.view_gallery}>
            <Button className={styles.view_button}>View Gallery</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  isEdit: state.site.isEdit
});

export default connect(mapStateToProps, null)(Gallery);
