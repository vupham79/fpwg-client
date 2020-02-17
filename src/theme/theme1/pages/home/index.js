import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
class PreHomePage extends Component {

  constructor(props) {
    super(props);

  }
  
  render() {
    const { themeFontBody, themeFontTitle, themeColor, mapLat, mapLng} = this.props;
    return <HomePage themeFontTitle={themeFontTitle} themeFontBody={themeFontBody} themeColor={themeColor} mapLat={mapLat} mapLng={mapLng}/>;
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

export default connect(mapStateToProps, null)(HomePage);