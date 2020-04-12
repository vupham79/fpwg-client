import { Grid, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import EventComponent from "../../../component/eventComponent";

class Theme1Event extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      fromHome,
      homeTitle,
      homeList,
      siteEdit,
      siteView,
    } = this.props;

    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: "#E8634E",
        textAlign: "center",
        fontSize: 36,
        lineHeight: "1.4em",
        fontWeight: "600",
      },
    });
    const classes = useStyles();

    return (
      <Grid container justify="center">
        {homeTitle && (
          <Grid
            container
            alignItems="center"
            item
            sm={10}
            xs={12}
            style={{ padding: "2rem 0" }}
          >
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: "rgba(198, 196, 173, 1)",
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
            <Grid item xs={6} sm={4} style={classes.changableTitle}>
              {fromHome
                ? homeTitle
                : isEdit
                ? siteEdit &&
                  siteEdit.navItems &&
                  siteEdit.navItems.find((item) => item.original === "event")
                    .name
                : siteView &&
                  siteView.navItems &&
                  siteView.navItems.find((item) => item.original === "event")
                    .name}
            </Grid>
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: "rgba(198, 196, 173, 1)",
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={10} style={{ padding: "2.5rem 0" }}>
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
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(Theme1Event);
