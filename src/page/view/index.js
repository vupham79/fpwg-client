import React from "react";
import { themes as themesConstant } from "../../constant/constant";
import { connect } from "react-redux";
import {
  updateSiteId,
  setSiteView,
  setEditOff,
  clearSiteView,
  updateSitepath,
  getSiteBySitepath
} from "../../actions";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import WebFont from "webfontloader";
class PreViewSite extends React.Component {
  state = {
    sitepath: "",
    isLoading: true
  };

  async componentDidMount() {
    const {
      updateSitepath,
      setSiteView,
      setEditOff,
      clearSiteView,
      getSiteBySitepath
    } = this.props;
    clearSiteView();
    setEditOff();
    const sitepath = await this.props.location.pathname.split("/")[1];
    this.setState({
      sitepath: sitepath
    });
    await updateSitepath(this.state.sitepath);
    const data = await getSiteBySitepath(this.state.sitepath);
    if (data) {
      console.log(data);
      const fontTitle = {
        fontFamily: data.fontTitle,
        color: data.color
      };
      const fontBody = {
        fontFamily: data.fontBody
      };
      await setSiteView(data, fontTitle, fontBody);
    }
    this.setState({
      isLoading: false
    });
  }

  render() {
    const { siteView } = this.props;
    const { isLoading } = this.state;
    clearSiteView();
    if (!isLoading) {
      if (siteView) {
        if (!siteView.isPublish) {
          return (
            <Grid container justify="center">
              <h1 style={{ color: "red" }}>Site is currently not published</h1>
            </Grid>
          );
        }
        WebFont.load({
          google: {
            families: [siteView.fontTitle, siteView.fontBody]
          }
        });
        return themesConstant.find(e => e.id === siteView.theme.id).component;
      }
      return (
        <Grid container justify="center">
          <h1 style={{ color: "red" }}>404 Not Found</h1>
        </Grid>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = state => ({
  siteView: state.site.siteView
});

const mapDispatchToProps = dispatch => ({
  updateSiteId: id => dispatch(updateSiteId(id)),
  setSiteView: (site, title, body) => dispatch(setSiteView(site, title, body)),
  setEditOff: () => dispatch(setEditOff()),
  clearSiteView: () => dispatch(clearSiteView()),
  updateSitepath: () => dispatch(updateSitepath()),
  getSiteBySitepath: sitepath => dispatch(getSiteBySitepath(sitepath))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreViewSite)
);
