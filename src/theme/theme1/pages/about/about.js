import { Grid, lighten } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

class Theme1About extends React.Component {
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };

  getCover = (index) => {
    const { isEdit, newCover, siteView } = this.props;
    if (isEdit) {
      if (newCover && newCover[index]) {
        if (
          newCover[index] &&
          typeof newCover[index] === "object" &&
          newCover[index].size > 0
        ) {
          return URL.createObjectURL(newCover[index]);
        } else return newCover[index];
      } else {
        return "/images/theme1-banner3.jpg";
      }
    } else {
      if (siteView.cover && siteView.cover[index]) {
        return siteView.cover[index];
      } else {
        return "/images/theme1-banner3.jpg";
      }
    }
  };

  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      fromHome,
      homeTitle,
      newCover,
    } = this.props;

    const isShowStory = () => {
      if (isEdit) {
        if (siteEdit && siteEdit.showDetailSetting.showStory) {
          if (siteEdit.story && siteEdit.story.title) {
            return true;
          }
        }
      } else if (siteView && siteView.showDetailSetting.showStory) {
        if (siteView.story && siteView.story.title) {
          return true;
        }
      }
      return false;
    };

    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 20,
        textTransform: "uppercase",
      },
      changableTitle2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#fff",
        fontSize: 18,
        paddingBottom: 20,
        textTransform: "uppercase",
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        textAlign: "justify",
        hyphens: "auto",
        fontSize: 16,
      },
      changableBody3: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#616E89",
        textAlign: "justify",
        fontSize: 16,
        hyphens: "auto",
      },
      changableBody4: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#535353",
        textAlign: "center",
        fontSize: 16,
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#535353",
        fontSize: 20,
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: 300,
        color: "#535353",
        textAlign: "center",
        fontSize: 30,
        textDecoration: "underline",
        textDecorationColor: isEdit ? titleEdit.color : titleView.color,
      },
      changableLegend: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "white",
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "40%",
        fontSize: 80,
        textAlign: "center",
      },
      greyDiv: {
        backgroundColor: "#e1ede4",
        padding: 30,
        textAlign: "center",
        color: "#535353",
        fontSize: 20,
      },
    });
    const classes = useStyles();

    return (
      <Grid
        container
        justify={"center"}
        style={{ minHeight: "50vh", marginTop: fromHome ? 70 : 0 }}
      >
        <Grid item xs={12} style={{ marginBottom: 50 }}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>
              {fromHome ? homeTitle.charAt(0) : "A"}
            </span>
            {fromHome ? homeTitle.substring(1) : "BOUT"}
          </p>
        </Grid>

        <Grid
          container
          item
          xs={12}
          justify={"center"}
          style={{
            backgroundColor: isEdit ? titleEdit.color : titleView.color,
            minHeight: 420,
          }}
        >
          <Grid
            item
            xs={10}
            sm={10}
            md={5}
            lg={4}
            style={{
              marginTop: -50,
              display: isEdit
                ? this.props.siteEdit.showDetailSetting.showAboutLogo
                  ? "flex"
                  : "none"
                : this.props.siteView.showDetailSetting.showAboutLogo
                ? "flex"
                : "none",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={this.renderImage()}
              alt=""
              style={{ objectFit: "cover", height: 348 }}
            />
          </Grid>

          <Grid
            item
            xs={10}
            sm={10}
            md={5}
            lg={4}
            style={{
              height: 298,
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              paddingLeft: 35,
              paddingTop: 30,
              display: isEdit
                ? this.props.siteEdit.showDetailSetting.showAboutDescription
                  ? "inline-block"
                  : "none"
                : this.props.siteView.showDetailSetting.showAboutDescription
                ? "inline-block"
                : "none",
            }}
          >
            <p style={classes.changableTitle2}>Introduction</p>
            <p style={classes.changableBody3}>
              {isEdit && siteEdit && siteEdit.about}
              {!isEdit && siteView && siteView.about}
              {isEdit && !siteEdit.about && "Welcome to our website!"}
              {!isEdit && !siteView.about && "Welcome to our website!"}
            </p>
          </Grid>
        </Grid>

        {isShowStory() && (
          <Grid
            container
            item
            xs={12}
            justify={"center"}
            style={{
              backgroundColor: isEdit
                ? lighten(titleEdit.color, 0.08)
                : lighten(titleView.color, 0.08),
              minHeight: 420,
              paddingTop: 50,
            }}
          >
            <Grid
              item
              xs={10}
              sm={10}
              md={5}
              lg={4}
              style={{
                height: 298,
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                paddingLeft: 35,
                paddingTop: 30,
                display: "inline-block",
              }}
            >
              <p style={classes.changableTitle2}>
                {isEdit
                  ? siteEdit && siteEdit.story && siteEdit.story.title
                  : siteView && siteView.story && siteView.story.title}
                {isEdit &&
                  !siteEdit.story &&
                  !siteEdit.story.title &&
                  "Your story title"}
                {!isEdit &&
                  !siteView.story &&
                  !siteView.story.title &&
                  "Your story title"}
              </p>
              <p style={classes.changableBody3}>
                {isEdit
                  ? siteEdit && siteEdit.story && siteEdit.story.composedText
                  : siteView && siteView.story && siteView.story.composedText}
                {isEdit &&
                  !siteEdit.story &&
                  !siteEdit.story.composedText &&
                  "Create story on your Facebook page or inside Content Settings"}
                {!isEdit &&
                  !siteView.story &&
                  !siteView.story.composedText &&
                  "Create story on your Facebook page or inside Content Settings"}
              </p>
            </Grid>

            <Grid
              item
              xs={10}
              sm={10}
              md={5}
              lg={4}
              style={{ display: "inline-block" }}
            >
              <img
                src={this.getCover(1)}
                alt=""
                style={{ objectFit: "cover", width: "100%", height: 348 }}
              />
            </Grid>
          </Grid>
        )}
        {/* <Grid item xs={12} style={{ backgroundColor: "#3E5688", height: 150 }} /> */}
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
  newLogo: state.site.newLogo,
  newCover: state.site.newCover,
});

export default connect(mapStateToProps, null)(Theme1About);
