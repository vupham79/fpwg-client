import React from "react";
import { themes as themesConstant } from "../../constant/constant";
import { connect } from "react-redux";
import { updateSiteId, getSiteById } from "../../actions";

class ViewSite extends React.Component {
  state = {
    currentSiteId: ""
  };
  async componentDidMount() {
    const { updateSiteId, getSite } = this.props;
    const currentSiteId = await this.props.location.pathname.split("/")[1];
    this.setState({
      currentSiteId: currentSiteId
    });

    updateSiteId(this.state.currentSiteId);
    getSite(this.state.currentSiteId);
  }

  render() {
    return themesConstant[1].component;
  }
}

const mapStateToProps = state => ({
  siteId: state.site.currentId
});

const mapDispatchToProps = dispatch => ({
  updateSiteId: id => dispatch(updateSiteId(id)),
  getSite: id => dispatch(getSiteById(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewSite);
