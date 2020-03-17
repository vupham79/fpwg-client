import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import EventComponent from "../../../component/eventComponent";
import styles from "./event.module.css";

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

function EmptyEvent({ isEdit, titleEdit, titleView, siteView, siteEdit }) {
  return (
    <>
      <Grid
        item
        sm={3}
        xs={8}
        container
        justify="center"
        className={styles.event_body}
      >
        <Grid item sm={12} container>
          <Grid item sm={3} xs={6}>
            <div className={styles.image_page}>
              <img
                alt=""
                src={isEdit ? siteEdit.logo : siteView.logo}
                style={imgStyles}
              />
            </div>
          </Grid>
          <Grid item sm={9} xs={6} container direction="column">
            <Grid>
              <Typography variant="h6" className={styles.shop_name}>
                {isEdit ? siteEdit.title : siteView.title}
              </Typography>
            </Grid>
            {/* <Grid>
              <Button className={styles.btn_like}>
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className={styles.icon}
                  size-={2}
                ></FontAwesomeIcon>
                <Typography className={styles.like}>Like Page</Typography>
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item container sm={12} className={styles.contain_event}>
          <Grid className={styles.event}>
            <Typography className={styles.event_content}>
              {isEdit ? siteEdit.title : siteView.title} does not have any
              upcoming events.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container sm={3} justify="center">
        <Button className={styles.btn_view}>
          <a href={isEdit ? siteEdit.url : siteView.url}>
            <Typography
              align="center"
              variant="h6"
              className={styles.btn_content}
            >
              View Events On FaceBook
            </Typography>
          </a>
        </Button>
      </Grid>
    </>
  );
}
class EventPage extends React.Component {
  render() {
    const { titleEdit, titleView, isEdit, siteEdit, siteView } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        direction="column"
        className={styles.event_page}
      >
        <Grid item sm={10} xs={10}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
            style={isEdit ? titleEdit : titleView}
          >
            Events
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        {isEdit ? (
          siteEdit && siteEdit.events ? (
            <EventComponent />
          ) : (
            <EmptyEvent
              siteEdit={siteEdit}
              titleEdit={titleEdit}
              siteView={siteView}
              titleView={titleView}
              isEdit={isEdit}
            />
          )
        ) : siteView && siteView.events ? (
          <EventComponent />
        ) : (
          <EmptyEvent
            siteEdit={siteEdit}
            titleEdit={titleEdit}
            siteView={siteView}
            titleView={titleView}
            isEdit={isEdit}
          />
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  siteView: state.site.siteView
});

export default connect(mapStateToProps, null)(EventPage);
