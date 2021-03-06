import { Grid, makeStyles, Typography } from "@material-ui/core";
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

const btnStyle = makeStyles({
  btn: {
    backgroundColor: "white",
  },
});

function EmptyEvent({ isEdit, titleEdit, titleView, siteView, siteEdit }) {
  const classes = btnStyle();
  return (
    <>
      <Grid
        item
        sm={5}
        md={3}
        xs={8}
        container
        justify="center"
        className={styles.event_body}
        style={{ backgroundColor: "white" }}
      >
        <Grid item sm={12} container>
          <Grid item sm={3} md={2} xs={6}>
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
          <Grid className={classes.root}>
            <Typography className={styles.event_content}>
              {isEdit ? siteEdit.title : siteView.title} does not have any
              upcoming events.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item container sm={3} justify="center">
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
      </Grid> */}
    </>
  );
}
class EventPage extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      titleEdit,
      titleView,
      isEdit,
      siteEdit,
      siteView,
      fromHome,
      homeTitle,
      homeList,
    } = this.props;
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
            style={
              isEdit
                ? {
                    ...titleEdit,
                    color: "#fff",
                    letterSpacing: "0.2rem",
                  }
                : { ...titleView, color: "#fff", letterSpacing: "0.2rem" }
            }
          >
            {fromHome
              ? homeTitle
              : isEdit
              ? siteEdit &&
                siteEdit.navItems.map((item) => {
                  if (item.original === "event") {
                    return item.name;
                  } else return "";
                })
              : siteView &&
                siteView.navItems.map((item) => {
                  if (item.original === "event") {
                    return item.name;
                  } else return "";
                })}
          </Typography>
        </Grid>
        {isEdit ? (
          (homeList && homeList) || (siteEdit && siteEdit.events) ? (
            <EventComponent
              key={
                this.props.isEdit
                  ? this.props.siteEdit.limitEvent
                  : this.props.siteView.limitEvent
              }
              homeList={
                fromHome && homeList
                  ? homeList
                  : isEdit
                  ? siteEdit.events
                  : siteView.events
              }
              siteInfo={siteView && siteView.sitePath}
              fromHome={fromHome}
              pageCount={Math.ceil(
                (fromHome && homeList
                  ? homeList.length
                  : siteEdit
                  ? siteEdit.events
                    ? siteEdit.events.length
                    : 0
                  : siteView.events
                  ? siteView.events.length
                  : 0) /
                  (this.props.isEdit
                    ? this.props.siteEdit.limitEvent
                    : this.props.siteView.limitEvent)
              )}
              dark={true}
              altType={true}
            />
          ) : (
            <EmptyEvent
              siteEdit={siteEdit}
              titleEdit={titleEdit}
              siteView={siteView}
              titleView={titleView}
              isEdit={isEdit}
              altType={true}
            />
          )
        ) : (homeList && homeList) || (siteView && siteView.events) ? (
          <EventComponent
            homeList={fromHome && homeList ? homeList : siteView.events}
            siteInfo={siteView.sitePath}
            fromHome={fromHome}
            dark={true}
            altType={true}
          />
        ) : (
          <EmptyEvent
            siteEdit={siteEdit}
            titleEdit={titleEdit}
            siteView={siteView}
            titleView={titleView}
            isEdit={isEdit}
            altType={true}
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
