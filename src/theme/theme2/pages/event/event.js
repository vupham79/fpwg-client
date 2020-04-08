import { Grid, Typography } from "@material-ui/core";
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
      homeList,
      homeTitle,
    } = this.props;
    return (
      <Grid
        container
        justify="center"
        className={styles.event_page}
        style={{
          marginBottom: fromHome && "0",
          minHeight: !fromHome && "80vh",
        }}
      >
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          item
          sm={12}
          xs={12}
          className={styles.event_title}
          style={{
            height: fromHome && "6rem",
          }}
        >
          <Typography
            className={styles.title}
            variant="h4"
            align="center"
            style={{
              fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
              fontWeight: "bold",
              color: isEdit ? siteEdit.color : siteView.color,
              textAlign: "center",
              fontSize: 28,
            }}
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
          siteEdit && siteEdit.events ? (
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
                (fromHome && homeList ? homeList : siteEdit.events).length /
                  (this.props.isEdit
                    ? this.props.siteEdit.limitEvent
                    : this.props.siteView.limitEvent)
              )}
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
            homeList={fromHome && homeList ? homeList : siteView.events}
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
