import React, { Component } from "react";

export default class LoginButtonFacebook extends Component {
  handleResponse = data => {
    console.log(data);
  };

  handleError = error => {
    this.setState({ error });
  };

  render() {
    var Style = {
      margin: 0,
      paddingBottom: 35
    };
    return (
      <div style={Style}>
        <div
          className="fb-login-button"
          data-width=""
          data-size="medium"
          data-button-type="login_with"
          data-auto-logout-link="true"
          data-use-continue-as="false"
        />
      </div>
    );
  }
}
