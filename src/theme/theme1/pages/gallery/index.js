import React, { Component } from "react";
import GalleryPage from "./gallery";
import { connect } from "react-redux";
class PreGalleryPage extends Component {

  constructor(props) {
    super(props);
    const { themeFontBody, themeFontTitle, themeColor, mapLat, mapLng} = this.props;
  }

  render() {
    return <GalleryPage />;
  }
}
const mapStateToProps = state => ({
  siteId: state.site.id,
  themeFontTitle: state.theme.fontTitle,
  themeColor: state.theme.color,
  themeFontBody: state.theme.fontBody,
  mapLat: 10.82302,
  mapLng: 106.62965
});

export default connect(mapStateToProps, null)(GalleryPage);