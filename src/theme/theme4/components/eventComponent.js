import { Divider, Grid, withStyles } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import {
  getDataByPageNumber,
  setEventsToSiteViewOnePage,
} from "../../../actions";
import styles from "./event.module.css";
const useStyles = (theme) => ({
  paginationItemSelected: {
    backgroundColor: "#fff !important",
    color: "#000 !important",
  },
  showMore: {
    marginTop: "2rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

class EventComponent extends React.Component {
  state = {
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitEvent
      : this.props.siteView.limitEvent,
    page: 1,
    count: this.props.isEdit
      ? this.props.siteEdit.limitEvent
      : this.props.siteView.limitEvent,
  };

  renderUpComingEvent = (homeList, classes) => {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteEdit,
      siteView,
      dark,
    } = this.props;
    return (
      <>
        {homeList &&
          homeList.map((row, index) => {
            return (
              row &&
              !row.isCancelled &&
              moment(row.endTime).isAfter(moment()) && (
                <Grid
                  item
                  container
                  sm={12}
                  // spacing={2}
                  className={styles.contain_event}
                  key={index}
                  style={{
                    padding: "1rem",
                    backgroundColor: dark ? "#000" : "#fff",
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: isEdit
                        ? siteEdit.showDetailSetting.showCoverEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showCoverEvent
                        ? "block"
                        : "none",
                      backgroundImage: `url('${row.cover}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "6rem",
                    }}
                  ></Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={1}
                    style={{ height: "6rem" }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: "center",
                        fontSize: 15,
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={2}
                    style={{
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: "block",
                      fontFamily: isEdit
                        ? titleEdit.fontFamily
                        : titleView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                      fontSize: 14,
                    }}
                  >
                    <Grid item xs={12}>
                      <a
                        href={"https://" + row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: dark && "#fff" }}
                      >
                        {row.name}
                      </a>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ color: dark ? "#fff" : "#3578e5" }}
                    >
                      {moment(row.startTime).format("MMMM DD")}
                      {row.endTime &&
                        !moment(moment(row.endTime).format("MMMM DD")).isSame(
                          moment(row.startTime).format("MMMM DD")
                        ) &&
                        " - " + moment(row.endTime).format("MMMM DD")}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: isEdit
                        ? siteEdit.showDetailSetting.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showDesEvent
                        ? "block"
                        : "none",
                      height: "6rem",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      color: dark ? "#fff" : "#000",
                      fontSize: 14,
                    }}
                  >
                    {row.description}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={3}
                    style={{
                      display: isEdit
                        ? siteEdit.showDetailSetting.showPlaceEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showPlaceEvent
                        ? "block"
                        : "none",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                      color: dark ? "#fff" : "#000",
                      fontSize: 14,
                    }}
                  >
                    <Grid item xs={12}>
                      {row.place && row.place.name}
                    </Grid>

                    <Grid item xs={12}>
                      {row.place && row.place.city}
                    </Grid>
                  </Grid>
                </Grid>
              )
            );
          })}
      </>
    );
  };

  renderPassEvent = (homeList, classes) => {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteEdit,
      siteView,
      dark,
    } = this.props;
    return (
      <>
        {homeList &&
          homeList.map((row, index) => {
            return (
              row &&
              (row.isCancelled ||
                moment(row.endTime).isSameOrBefore(moment()) ||
                !row.endTime) && (
                <Grid
                  item
                  container
                  sm={12}
                  // spacing={2}
                  className={styles.contain_event}
                  key={index}
                  style={{
                    padding: "1rem",
                    backgroundColor: dark ? "#000" : "#fff",
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: isEdit
                        ? siteEdit.showDetailSetting.showCoverEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showCoverEvent
                        ? "block"
                        : "none",
                      backgroundImage: `url('${row.cover}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "6rem",
                    }}
                  ></Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={1}
                    style={{ height: "6rem" }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: "center",
                        fontSize: 15,
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        fontWeight: "bold",
                        color: "#212121",
                        textAlign: "center",
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={2}
                    style={{
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: "block",
                      fontFamily: isEdit
                        ? titleEdit.fontFamily
                        : titleView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                      fontSize: 14,
                    }}
                  >
                    <Grid item xs={12}>
                      <a
                        href={"https://" + row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: dark && "#fff" }}
                      >
                        {row.name}
                      </a>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ color: dark ? "#fff" : "#3578e5" }}
                    >
                      {moment(row.startTime).format("MMMM DD")}
                      {row.endTime &&
                        !moment(moment(row.endTime).format("MMMM DD")).isSame(
                          moment(row.startTime).format("MMMM DD")
                        ) &&
                        " - " + moment(row.endTime).format("MMMM DD")}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={4}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: isEdit
                        ? siteEdit.showDetailSetting.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showDesEvent
                        ? "block"
                        : "none",
                      height: "6rem",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      color: dark ? "#fff" : "#000",
                      fontSize: 14,
                    }}
                  >
                    {row.description}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={3}
                    style={{
                      display: isEdit
                        ? siteEdit.showDetailSetting.showPlaceEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showPlaceEvent
                        ? "block"
                        : "none",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                      color: dark ? "#fff" : "#000",
                      fontSize: 14,
                    }}
                  >
                    <Grid item xs={12}>
                      {row.place && row.place.name}
                    </Grid>

                    <Grid item xs={12}>
                      {row.place && row.place.city}
                    </Grid>
                  </Grid>
                </Grid>
              )
            );
          })}
      </>
    );
  };

  handleShowMore = async () => {
    const {
      isEdit,
      getDataByPageNumber,
      setEventsToSiteViewOnePage,
      siteInfo,
      siteView,
    } = this.props;
    if (isEdit) {
      this.setState({
        itemPerPage:
          parseInt(this.state.itemPerPage) + parseInt(this.state.count),
      });
    } else {
      this.setState({ pageView: this.state.pageView + 1 });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "event",
        pageNumber: this.state.pageView + 1,
      });
      let newEvents = [...siteView.events, ...data.data.events];
      newEvents && setEventsToSiteViewOnePage(newEvents);
    }
  };

  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      homeList,
      fromHome,
      pageCount,
      dark,
      classes,
      pageCountView,
    } = this.props;
    const { itemPerPage, offset, page } = this.state;

    const useStyles = () => ({
      showMore: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
        lineHeight: "1.4em",
        textAlign: "center",
        textDecoration: "underline",
      },
    });
    const showMore = useStyles();
    return (
      <Grid
        item
        xs={12}
        sm={12}
        container
        justify="center"
        // style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            direction="column"
            // className={{
            //   marginTop: "5vh",
            //   marginBottom: "5vh",
            //   backgroundColor: "#1a1919",
            // }}
          >
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              container
              justify="center"
              className={styles.event_body}
              style={dark ? { backgroundColor: "#000" } : {}}
            >
              {!homeList ||
                (homeList && homeList.length === 0 && (
                  <Grid className={styles.event}>
                    <p
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        color: "#212121",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      No event.
                    </p>
                  </Grid>
                ))}

              {fromHome &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    !row.isCancelled &&
                    moment(row.endTime).isAfter(moment())
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Upcoming Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: "#fff" }} />
                    </Grid>
                  </Grid>
                )}

              {!fromHome &&
                homeList &&
                homeList
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 3
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .filter(
                    (row) =>
                      row &&
                      !row.isCancelled &&
                      moment(row.endTime).isAfter(moment())
                  ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Upcoming Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}

              {isEdit
                ? fromHome
                  ? this.renderUpComingEvent(homeList.slice(0, 3), classes)
                  : this.renderUpComingEvent(
                      homeList.slice(
                        page > pageCount ? 0 : offset,
                        page > pageCount
                          ? 3
                          : parseInt(itemPerPage) + parseInt(offset)
                      ),
                      classes
                    )
                : this.renderUpComingEvent(homeList, classes)}

              <Grid item xs={12}>
                <Divider color="#212121" />
              </Grid>

              {fromHome &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    (row.isCancelled ||
                      moment(row.endTime).isSameOrBefore(moment()) ||
                      !row.endTime)
                ).length > 0 && (
                  <Grid container item>
                    {dark && (
                      <Grid item xs={12}>
                        <Divider style={{ backgroundColor: "#fff" }} />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Past Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}

              {!fromHome &&
                homeList &&
                homeList
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 3
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .filter(
                    (row) =>
                      row &&
                      (row.isCancelled ||
                        moment(row.endTime).isSameOrBefore(moment()) ||
                        !row.endTime)
                  ).length > 0 && (
                  <Grid container item>
                    {dark && (
                      <Grid item xs={12}>
                        <Divider style={{ backgroundColor: "#fff" }} />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Past Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}
              {isEdit
                ? fromHome
                  ? this.renderPassEvent(homeList.slice(0, 3), classes)
                  : this.renderPassEvent(
                      homeList.slice(
                        page > pageCount ? 0 : offset,
                        page > pageCount
                          ? 3
                          : parseInt(itemPerPage) + parseInt(offset)
                      ),
                      classes
                    )
                : this.renderPassEvent(homeList, classes)}
            </Grid>
            {isEdit
              ? pageCount > 1 &&
                itemPerPage < homeList.length && (
                  <Grid
                    container
                    item
                    xs={6}
                    justify="center"
                    className={classes.showMore}
                    style={showMore.showMore}
                  >
                    <p onClick={() => this.handleShowMore()}>Show More</p>
                  </Grid>
                )
              : pageCountView !== null &&
                this.state.pageView < pageCountView && (
                  <Grid
                    container
                    item
                    xs={6}
                    justify="center"
                    className={classes.showMore}
                    style={showMore.showMore}
                  >
                    <p onClick={() => this.handleShowMore()}>Show More</p>
                  </Grid>
                )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  pageCountView: state.post.pageCountEventView,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
});

const mapDispatchToProps = (dispatch) => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setEventsToSiteViewOnePage: (event) =>
    dispatch(setEventsToSiteViewOnePage(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EventComponent));
