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
  height: "100%",
};

function EmptyEvent({ isEdit, titleEdit, titleView, siteView, siteEdit }) {
  return (
    <>
      <Grid
        item
        sm={6}
        md={3}
        xs={8}
        container
        justify="center"
        className={styles.event_body}
      >
        <Grid
          item
          sm={12}
          container
          alignItems="center"
          style={{ padding: "0.5rem 0.1rem" }}
        >
          <Grid item sm={3} xs={2} md={2}>
            <div className={styles.image_page}>
              <img
                alt=""
                src={isEdit ? siteEdit.logo : siteView.logo}
                style={imgStyles}
              />
            </div>
          </Grid>
          <Grid item sm={9} xs={10}>
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
        <Grid
          item
          container
          sm={12}
          className={styles.contain_event}
          style={{ padding: "1rem" }}
        >
          <Grid className={styles.event} style={{ padding: "3rem" }}>
            <Typography className={styles.event_content}>
              {isEdit ? siteEdit.title : siteView.title} does not have any
              upcoming events.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container sm={6} justify="center">
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
    const {
      titleEdit,
      titleView,
      isEdit,
      siteEdit,
      siteView,
      fromHome,
      homeList,
      homeTitle,
    } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={styles.event_page}
      >
        <Grid item sm={10} xs={10} style={{ marginBottom: "4rem" }}>
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            gutterBottom
            style={{
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
              fontWeight: 500,
              color: isEdit ? titleEdit.color : titleView.color,
              textAlign: "center",
              fontSize: 28,
              paddingBottom: 20,
            }}
          >
            {fromHome ? homeTitle : "Events"}
          </Typography>
          <Divider variant="fullWidth" />
        </Grid>
        {isEdit ? (
          siteEdit && siteEdit.events ? (
            <EventComponent
              homeList={
                fromHome && homeList
                  ? homeList
                  : isEdit
                  ? siteEdit.events
                  : siteView.events
              }
              fromHome={fromHome}
            />
          ) : (
            <EmptyEvent
              siteEdit={siteEdit}
              titleEdit={titleEdit}
              siteView={siteView}
              titleView={titleView}
              isEdit={isEdit}
            />
          )
        ) : (siteView && siteView.events) || (fromHome && homeList) ? (
          <EventComponent
            homeList={
              fromHome && homeList
                ? homeList
                : isEdit
                ? siteEdit.events
                : siteView.events
            }
            siteInfo={siteView.sitePath}
            fromHome={fromHome}
          />
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

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  siteView: state.site.siteView,
});

export default connect(mapStateToProps, null)(EventPage);
