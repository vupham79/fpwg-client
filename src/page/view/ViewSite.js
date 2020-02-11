import React from "react";
import { themes } from "../../constant/constant";
import { connect } from "react-redux";
import { updateSiteId } from "../../actions";

class ViewSite extends React.Component {
  componentDidMount() {
    const { updateSiteId } = this.props;
    updateSiteId(this.props.location.pathname.split("/")[1]);
  }

  render() {
    return themes[1].component;
  }
}

const mapStateToProps = state => ({
  siteId: state.site.id
});

const mapDispatchToProps = dispatch => ({
  updateSiteId: id => dispatch(updateSiteId(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewSite);
