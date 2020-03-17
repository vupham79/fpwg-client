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
import Helmet from "react-helmet";

class PreViewSite extends React.Component {
  state = {
    sitepath: "",
    isLoading: true,
    metas: null
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
      const fontTitle = {
        fontFamily: data.fontTitle,
        color: data.color
      };
      const fontBody = {
        fontFamily: data.fontBody
      };
      const metas =
        data.metas && data.metas.length > 0 ? data.metas.split("\n") : null;
      this.setState({
        metas
      });
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
        return (
          <>
            <Helmet>
              <title>{siteView.title}</title>
              <link
                id="favicon"
                rel="icon"
                href={siteView.favicon ? siteView.favicon : siteView.logo}
                type="image/x-icon"
              />
              {this.state.metas.map((meta, index) => {
                let metaSplit = meta.split("=");
                return (
                  <meta
                    key={index}
                    name={metaSplit[0]}
                    content={metaSplit[1]}
                  />
                );
              })}
            </Helmet>
            {themesConstant.find(e => e.id === siteView.theme.id).component}
          </>
        );
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
