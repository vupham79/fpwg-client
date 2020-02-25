import React from "react";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import styles from "./gallery.module.css";
import { connect } from "react-redux";

const imgUrl = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: "10%",
  width: "80%"
};

class GalleryPage extends React.Component {
  render() {
    const { isEdit, titleEdit, bodyEdit, titleView, bodyView } = this.props;

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={styles.gallery_page}
      >
        <Grid item sm={10} xs={10}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
            style={isEdit ? titleEdit : titleView}
          >
            Gallery
          </Typography>
          <Divider variant="middle" />
        </Grid>
        <Grid item sm={5} xs={12}>
          <img src={imgUrl[1]} style={imgStyles} alt="" />
        </Grid>
        <Grid item sm={4} xs={12} className={styles.anh_dai_dien}>
          <Typography
            variant="h5"
            className={styles.child_title}
            style={isEdit ? bodyEdit : bodyView}
          >
            Ảnh đại diện Photos
          </Typography>
          <div className={styles.btn_view}>
            <Button>
              <Typography
                align="center"
                variant="h6"
                className={styles.btn_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                View Photos
              </Typography>
            </Button>
          </div>
        </Grid>
        <Grid item sm={4} xs={12} className={styles.anh_dai_dien}>
          <Typography
            variant="h5"
            className={styles.child_title}
            style={isEdit ? bodyEdit : bodyView}
          >
            Ảnh bìa Photos
          </Typography>
          <div className={styles.btn_view}>
            <Button>
              <Typography
                align="center"
                variant="h6"
                className={styles.btn_content}
                style={isEdit ? bodyEdit : bodyView}
              >
                View Photos
              </Typography>
            </Button>
          </div>
        </Grid>
        <Grid item sm={5} xs={12}>
          <img src={imgUrl[0]} style={imgStyles} alt="" />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  bodyEdit: state.site.bodyEdit,
  titleView: state.site.titleView,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(GalleryPage);
